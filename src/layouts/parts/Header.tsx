import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'LIBRARY' },
    { href: '/about', label: 'ABOUT' },
  ];

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        background: '#0a0a0a',
        borderColor: '#00ffff',
        boxShadow: '0 0 20px rgba(0,255,255,0.3)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/airo-assets/images/logo/horizontal"
              alt="RetroPlay"
              className="h-auto w-auto object-contain"
              style={{ maxHeight: '40px' }}
            />
          </Link>

          <nav className="hidden md:flex gap-8 items-center" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="transition-all duration-200"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: '10px',
                  color: location.pathname === item.href ? '#00ffff' : '#888888',
                  textShadow: location.pathname === item.href ? '0 0 10px #00ffff' : 'none',
                  letterSpacing: '1px',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#00ffff';
                  (e.target as HTMLElement).style.textShadow = '0 0 10px #00ffff';
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.href) {
                    (e.target as HTMLElement).style.color = '#888888';
                    (e.target as HTMLElement).style.textShadow = 'none';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/"
              className="px-4 py-2 transition-all duration-200"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: '9px',
                color: '#0a0a0a',
                background: '#00ffff',
                boxShadow: '0 0 15px rgba(0,255,255,0.6)',
                letterSpacing: '1px',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#ff00ff';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(255,0,255,0.8)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = '#00ffff';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 15px rgba(0,255,255,0.6)';
              }}
            >
              INSERT COIN
            </Link>
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 transition-colors"
            style={{ color: '#00ffff' }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4" style={{ borderTop: '1px solid #00ffff33' }}>
            <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="py-2 transition-all duration-200"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: '10px',
                    color: location.pathname === item.href ? '#00ffff' : '#888888',
                    textShadow: location.pathname === item.href ? '0 0 10px #00ffff' : 'none',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
