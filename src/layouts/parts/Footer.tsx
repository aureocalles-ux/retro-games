import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      className="mt-auto"
      style={{
        background: '#0a0a0a',
        borderTop: '1px solid #00ffff',
        boxShadow: '0 -4px 30px rgba(0,255,255,0.15)',
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <Link to="/">
            <img
              src="/airo-assets/images/logo/horizontal"
              alt="RetroPlay"
              className="h-auto w-auto object-contain"
              style={{ maxHeight: '36px', filter: 'drop-shadow(0 0 8px rgba(0,255,255,0.6))' }}
            />
          </Link>

          {/* Pixel divider */}
          <div
            className="w-full max-w-xs h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #00ffff, transparent)' }}
          />

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2">
            <p
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '9px',
                color: '#00ffff',
                textShadow: '0 0 8px rgba(0,255,255,0.5)',
                letterSpacing: '2px',
              }}
            >
              INSERT COIN © 2026
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '12px',
                  background: '#00ffff',
                  marginLeft: '4px',
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </p>
            <p
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '11px',
                color: '#444',
              }}
            >
              All game titles are property of their respective owners.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex gap-8" aria-label="Footer links">
            {[
              { to: '/', label: 'LIBRARY' },
              { to: '/about', label: 'ABOUT' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '8px',
                  color: '#555',
                  letterSpacing: '1px',
                  transition: 'color 0.2s, text-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#ff00ff';
                  (e.target as HTMLElement).style.textShadow = '0 0 8px #ff00ff';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = '#555';
                  (e.target as HTMLElement).style.textShadow = 'none';
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </footer>
  );
}
