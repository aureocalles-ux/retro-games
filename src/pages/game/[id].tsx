import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { games, consoleColors } from '../../data/games';
import { game_player } from 'virtual:content';

export default function GamePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const game = games.find((g) => g.id === id);

  if (!game) {
    return (
      <main
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6"
        style={{ background: '#0a0a0a' }}
      >
        <p
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '14px',
            color: '#ff00ff',
            textShadow: '0 0 10px #ff00ff',
          }}
        >
          {game_player.notFoundMessage}
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '10px',
            color: '#00ffff',
            background: 'transparent',
            border: '1px solid #00ffff',
            padding: '10px 20px',
            cursor: 'pointer',
          }}
        >
          {game_player.backLabel}
        </button>
      </main>
    );
  }

  const consoleColor = consoleColors[game.console] || '#00ffff';

  // Build the emulator iframe URL — served from the same origin so no CSP issues
  const emulatorSrc =
    `/emulator.html?core=${encodeURIComponent(game.core)}&rom=${encodeURIComponent(game.romUrl)}`;

  return (
    <>
      <Helmet>
        <title>{game.title} — RetroPlay</title>
        <meta
          name="description"
          content={`Play ${game.title} (${game.console}, ${game.year}) in your browser. ${game.description}`}
        />
        <link rel="canonical" href={`https://retroplay.example.com/game/${game.id}`} />
        <meta property="og:title" content={`${game.title} — RetroPlay`} />
        <meta
          property="og:description"
          content={`Play ${game.title} (${game.console}, ${game.year}) in your browser.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://retroplay.example.com/game/${game.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Scanline overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
        }}
      />

      <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
        <div className="container mx-auto px-4 py-8">

          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '9px',
                color: '#888',
                letterSpacing: '1px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#00ffff';
                (e.currentTarget as HTMLElement).style.textShadow = '0 0 8px #00ffff';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = '#888';
                (e.currentTarget as HTMLElement).style.textShadow = 'none';
              }}
            >
              ◀ {game_player.backLabel}
            </Link>
          </motion.div>

          {/* Game title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-6 mb-8 flex flex-wrap items-center gap-4"
          >
            <h1
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(12px, 2.5vw, 20px)',
                color: '#ffffff',
                letterSpacing: '2px',
                textShadow: '0 0 20px rgba(255,255,255,0.3)',
              }}
            >
              {game.title}
            </h1>
            <span
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '8px',
                color: '#0a0a0a',
                background: consoleColor,
                padding: '4px 10px',
                boxShadow: `0 0 10px ${consoleColor}`,
                letterSpacing: '1px',
              }}
            >
              {game.console}
            </span>
          </motion.div>

          {/* Emulator iframe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div
              style={{
                position: 'relative',
                padding: '4px',
                background: '#0a0a0a',
                border: `2px solid ${consoleColor}`,
                boxShadow: `0 0 30px ${consoleColor}60, 0 0 60px ${consoleColor}20, inset 0 0 20px rgba(0,0,0,0.8)`,
                width: '100%',
                maxWidth: '860px',
              }}
            >
              {/* CRT corner decorations */}
              {(['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'] as const).map(
                (pos, i) => (
                  <div
                    key={i}
                    aria-hidden="true"
                    className={`absolute ${pos}`}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderTop: i < 2 ? `3px solid ${consoleColor}` : 'none',
                      borderBottom: i >= 2 ? `3px solid ${consoleColor}` : 'none',
                      borderLeft: i % 2 === 0 ? `3px solid ${consoleColor}` : 'none',
                      borderRight: i % 2 === 1 ? `3px solid ${consoleColor}` : 'none',
                    }}
                  />
                )
              )}

              <iframe
                src={emulatorSrc}
                title={`${game.title} emulator`}
                allow="autoplay; fullscreen"
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  border: 'none',
                  display: 'block',
                  background: '#000',
                }}
              />
            </div>
          </motion.div>

          {/* Game info + controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Game info */}
            <div
              style={{
                background: '#111',
                border: '1px solid #333',
                padding: '20px',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '10px',
                  color: consoleColor,
                  textShadow: `0 0 8px ${consoleColor}`,
                  letterSpacing: '2px',
                  marginBottom: '16px',
                }}
              >
                {game_player.gameInfoTitle}
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'TITLE', value: game.title },
                  { label: 'CONSOLE', value: game.console },
                  { label: 'GENRE', value: game.genre },
                  { label: 'YEAR', value: String(game.year) },
                ].map((row) => (
                  <div key={row.label} className="flex gap-4">
                    <span
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '7px',
                        color: '#555',
                        letterSpacing: '1px',
                        minWidth: '70px',
                        paddingTop: '2px',
                      }}
                    >
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '12px',
                        color: '#ccc',
                      }}
                    >
                      {row.value}
                    </span>
                  </div>
                ))}
                <p
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '12px',
                    color: '#888',
                    lineHeight: 1.6,
                    marginTop: '8px',
                    borderTop: '1px solid #222',
                    paddingTop: '12px',
                  }}
                >
                  {game.description}
                </p>
              </div>
            </div>

            {/* Controls guide */}
            <div
              style={{
                background: '#111',
                border: '1px solid #333',
                padding: '20px',
              }}
            >
              <h2
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '10px',
                  color: '#00ff41',
                  textShadow: '0 0 8px #00ff41',
                  letterSpacing: '2px',
                  marginBottom: '16px',
                }}
              >
                {game_player.controlsTitle}
              </h2>
              <div className="flex flex-col gap-3">
                {game_player.controls.map((ctrl) => (
                  <div key={ctrl.id} className="flex items-center gap-4">
                    <span
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: '7px',
                        color: '#00ff41',
                        background: '#0a1a0a',
                        border: '1px solid #00ff4140',
                        padding: '3px 6px',
                        minWidth: '80px',
                        textAlign: 'center',
                        letterSpacing: '1px',
                      }}
                    >
                      {ctrl.key}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: '12px',
                        color: '#888',
                      }}
                    >
                      {ctrl.action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </main>
    </>
  );
}
