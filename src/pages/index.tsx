import { home } from 'virtual:content';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { games, consoleColors } from '../data/games';

type ConsoleFilter = 'ALL' | 'SNES' | 'NES' | 'GENESIS' | 'GBA';

const filterTabs: ConsoleFilter[] = ['ALL', 'SNES', 'NES', 'GENESIS', 'GBA'];

const filterColors: Record<ConsoleFilter, string> = {
  ALL: '#00ffff',
  SNES: '#00ffff',
  NES: '#ff00ff',
  GENESIS: '#00ff41',
  GBA: '#ffaa00',
};

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState<ConsoleFilter>('ALL');

  const filteredGames =
    activeFilter === 'ALL' ? games : games.filter((g) => g.console === activeFilter);

  return (
    <>
      <Helmet>
        <title>RetroPlay — Classic Games in Your Browser</title>
        <meta
          name="description"
          content="Play classic SNES, NES, and Genesis games directly in your browser. Free retro gaming with EmulatorJS."
        />
        <link rel="canonical" href="https://retroplay.example.com/" />
        <meta property="og:title" content="RetroPlay — Classic Games in Your Browser" />
        <meta property="og:description" content="Play classic SNES, NES, and Genesis games directly in your browser. Free retro gaming with EmulatorJS." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://retroplay.example.com/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Global scanline overlay */}
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

      <main>
        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background: '#0a0a0a',
            borderBottom: '2px solid #00ffff',
            boxShadow: '0 4px 40px rgba(0,255,255,0.2)',
            minHeight: '420px',
          }}
        >
          {/* Pixel grid background */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center text-center">
            {/* Animated title */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(20px, 5vw, 48px)',
                color: '#00ffff',
                textShadow: '0 0 20px #00ffff, 0 0 40px rgba(0,255,255,0.5)',
                letterSpacing: '4px',
                lineHeight: 1.4,
                animation: 'neonFlicker 4s ease-in-out infinite',
              }}
            >
              {home.heroTitle}
            </motion.h1>

            {/* Subtitle with blinking cursor */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 'clamp(10px, 2vw, 14px)',
                color: '#ff00ff',
                textShadow: '0 0 10px #ff00ff',
                marginTop: '24px',
                letterSpacing: '2px',
              }}
            >
              {home.heroSubtitle}
              <span
                style={{
                  display: 'inline-block',
                  width: '10px',
                  height: '16px',
                  background: '#ff00ff',
                  marginLeft: '6px',
                  verticalAlign: 'middle',
                  animation: 'blink 1s step-end infinite',
                }}
              />
            </motion.p>

            {/* Neon pixel border decoration */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              style={{
                width: '200px',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
                margin: '32px auto',
              }}
            />

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {home.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="px-4 py-2"
                  style={{
                    border: `1px solid ${stat.color}`,
                    boxShadow: `0 0 10px ${stat.color}40, inset 0 0 10px ${stat.color}10`,
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '9px',
                    color: stat.color,
                    textShadow: `0 0 8px ${stat.color}`,
                    letterSpacing: '1px',
                  }}
                >
                  {stat.label}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── GAME LIBRARY ── */}
        <section className="py-16" style={{ background: '#0a0a0a' }}>
          <div className="container mx-auto px-4">
            {/* Section title */}
            <div className="text-center mb-12">
              <h2
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: 'clamp(14px, 3vw, 24px)',
                  color: '#ffffff',
                  letterSpacing: '4px',
                  textShadow: '0 0 20px rgba(255,255,255,0.3)',
                  marginBottom: '12px',
                }}
              >
                {home.libraryTitle}
              </h2>
              <div
                style={{
                  width: '120px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                  margin: '0 auto',
                  boxShadow: '0 0 10px #00ffff',
                }}
              />
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {filterTabs.map((tab) => {
                const tabAsFilter = tab as ConsoleFilter;
                const isActive = activeFilter === tabAsFilter;
                const color = filterColors[tabAsFilter];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tabAsFilter)}
                    className="px-5 py-2 transition-all duration-200"
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: '9px',
                      letterSpacing: '1px',
                      color: isActive ? '#0a0a0a' : color,
                      background: isActive ? color : 'transparent',
                      border: `2px solid ${color}`,
                      boxShadow: isActive
                        ? `0 0 20px ${color}, 0 0 40px ${color}40`
                        : `0 0 5px ${color}40`,
                      cursor: 'pointer',
                    }}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Game grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredGames.map((game, i) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link to={`/game/${game.id}`} className="block group">
                    <div
                      className="transition-all duration-300"
                      style={{
                        background: '#111',
                        border: '1px solid #333',
                        boxShadow: '0 0 0 transparent',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        const color = consoleColors[game.console] || '#00ffff';
                        (e.currentTarget as HTMLElement).style.border = `1px solid ${color}`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}60, 0 0 40px ${color}20`;
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.border = '1px solid #333';
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 transparent';
                        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                      }}
                    >
                      {/* Cover art */}
                      <div style={{ aspectRatio: '4/3', overflow: 'hidden', position: 'relative' }}>
                        <img
                          src={game.coverImage}
                          alt={game.title}
                          width={400}
                          height={300}
                          loading={i < 4 ? 'eager' : 'lazy'}
                          className="w-full h-full object-cover"
                          style={{ display: 'block' }}
                        />
                        {/* Scanline overlay on image */}
                        <div
                          aria-hidden="true"
                          style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage:
                              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.2) 2px, rgba(0,0,0,0.2) 4px)',
                            pointerEvents: 'none',
                          }}
                        />
                        {/* Console badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            padding: '3px 8px',
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '7px',
                            color: '#0a0a0a',
                            background: consoleColors[game.console] || '#00ffff',
                            boxShadow: `0 0 8px ${consoleColors[game.console] || '#00ffff'}`,
                            letterSpacing: '1px',
                          }}
                        >
                          {game.console}
                        </div>
                      </div>

                      {/* Card info */}
                      <div className="p-3">
                        <h3
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '8px',
                            color: '#e0e0e0',
                            letterSpacing: '1px',
                            lineHeight: 1.6,
                            marginBottom: '6px',
                          }}
                        >
                          {game.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span
                            style={{
                              fontFamily: "'Share Tech Mono', monospace",
                              fontSize: '10px',
                              color: '#555',
                            }}
                          >
                            {game.genre}
                          </span>
                          <span
                            style={{
                              fontFamily: "'Share Tech Mono', monospace",
                              fontSize: '10px',
                              color: '#444',
                            }}
                          >
                            {game.year}
                          </span>
                        </div>
                      </div>

                      {/* Play overlay on hover */}
                      <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                        style={{
                          background: 'rgba(0,0,0,0.6)',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Press Start 2P', monospace",
                            fontSize: '12px',
                            color: '#00ffff',
                            textShadow: '0 0 20px #00ffff',
                            letterSpacing: '2px',
                          }}
                        >
                          ▶ PLAY
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes neonFlicker {
          0%, 95%, 100% { opacity: 1; text-shadow: 0 0 20px #00ffff, 0 0 40px rgba(0,255,255,0.5); }
          96% { opacity: 0.8; text-shadow: 0 0 10px #00ffff; }
          97% { opacity: 1; text-shadow: 0 0 30px #00ffff, 0 0 60px rgba(0,255,255,0.7); }
          98% { opacity: 0.9; text-shadow: 0 0 15px #00ffff; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </>
  );
}
