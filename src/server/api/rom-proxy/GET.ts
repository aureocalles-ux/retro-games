import type { Request, Response } from 'express';
import https from 'node:https';
import http from 'node:http';

// Allowed ROM sources — never proxy arbitrary URLs
const ALLOWED_HOSTS = [
  'archive.org',
  'www.archive.org',
  'cdn.emulatorjs.org',
  'www.dropbox.com',
  'dl.dropboxusercontent.com',
];

function isAllowedHost(hostname: string): boolean {
  return (
    ALLOWED_HOSTS.includes(hostname) ||
    hostname.endsWith('.archive.org') ||
    hostname.endsWith('.emulatorjs.org') ||
    hostname.endsWith('.dropbox.com') ||
    hostname.endsWith('.dropboxusercontent.com')
  );
}

function fetchWithRedirects(
  url: string,
  res: Response,
  depth = 0,
): void {
  if (depth > 5) {
    if (!res.headersSent) res.status(502).json({ error: 'Too many redirects' });
    return;
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    if (!res.headersSent) res.status(400).json({ error: 'Invalid URL' });
    return;
  }

  if (!isAllowedHost(parsed.hostname)) {
    if (!res.headersSent) res.status(403).json({ error: 'Host not allowed' });
    return;
  }

  const client = parsed.protocol === 'https:' ? https : http;

  const proxyReq = client.get(url, (proxyRes) => {
    const status = proxyRes.statusCode ?? 200;

    // Follow redirects
    if ((status === 301 || status === 302 || status === 303 || status === 307 || status === 308)
        && proxyRes.headers.location) {
      proxyRes.resume(); // drain
      const next = new URL(proxyRes.headers.location, url).toString();
      fetchWithRedirects(next, res, depth + 1);
      return;
    }

    // Forward content-type and content-length
    const ct = proxyRes.headers['content-type'];
    if (ct) res.setHeader('Content-Type', ct);
    const cl = proxyRes.headers['content-length'];
    if (cl) res.setHeader('Content-Length', cl);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'public, max-age=86400');

    res.status(status);
    proxyRes.pipe(res);
  });

  proxyReq.on('error', (err) => {
    console.error('rom-proxy error', err.message);
    if (!res.headersSent) res.status(502).json({ error: 'Upstream error' });
  });
}

export default function handler(req: Request, res: Response) {
  const raw = req.query.url as string | undefined;
  if (!raw) {
    res.status(400).json({ error: 'Missing url param' });
    return;
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    res.status(400).json({ error: 'Invalid url' });
    return;
  }

  if (!isAllowedHost(parsed.hostname)) {
    res.status(403).json({ error: 'Host not allowed' });
    return;
  }

  fetchWithRedirects(raw, res);
}
