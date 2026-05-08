import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { brand } from '../config/school.js';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/try-demo', label: 'Try the demo' },
  { to: '/for-schools', label: 'For schools' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-navy text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-20 items-center">
          <Link
            to="/"
            className="flex-shrink-0 flex items-center cursor-pointer group"
            onClick={() => setMobileOpen(false)}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gold rounded-lg flex items-center justify-center mr-2 sm:mr-3 transition-transform shadow-sm group-hover:rotate-12">
              <span className="text-navy font-serif font-bold text-lg sm:text-xl italic">S</span>
            </div>
            <span className="text-lg sm:text-xl font-serif font-bold tracking-tight text-white">
              TownConnect<span className="text-gold"> Schools</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link-dark ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/try-demo"
              className="btn-primary ml-4 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest"
            >
              Try the demo
            </Link>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 py-4 animate-fade max-h-[80vh] overflow-y-auto">
            <div className="space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) => `mobile-nav-link-dark ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/try-demo"
                onClick={() => setMobileOpen(false)}
                className="block w-full btn-primary py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-center mt-4"
              >
                Try the demo
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* brand context for screen readers */}
      <span className="sr-only">{brand.name}</span>
    </nav>
  );
}
