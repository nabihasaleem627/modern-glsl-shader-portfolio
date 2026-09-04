// Navbar.jsx
// Sticky minimal navigation with smooth-scroll links and
// a responsive hamburger menu for mobile viewports.

import { useState, useEffect, useCallback } from 'react';

const NAV_LINKS = [
  { label: 'Home',       id: 'home'       },
  { label: 'About',      id: 'about'      },
  { label: 'Skills',     id: 'skills'     },
  { label: 'Projects',   id: 'projects'   },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact'    },
];

export default function Navbar() {
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [scrolled,     setScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Detect scroll position to add background blur to navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}
      role="banner"
    >
      <nav
        className="navbar-inner"
        aria-label="Primary navigation"
      >
        {/* Logo / name */}
        <button
          className="navbar-logo"
          onClick={() => scrollTo('home')}
          aria-label="Go to top"
        >
          NS<span className="navbar-logo-dot">.</span>
        </button>

        {/* Desktop links */}
        <ul className="navbar-links" role="list">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button
                className={`navbar-link ${activeSection === id ? 'navbar-link-active' : ''}`}
                onClick={() => scrollTo(id)}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger (mobile only) */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger-open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
          <span className="hamburger-bar" />
        </button>
      </nav>

      {/* Mobile menu drawer */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${menuOpen ? 'mobile-menu-open' : ''}`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button
                className={`mobile-nav-link ${activeSection === id ? 'mobile-nav-link-active' : ''}`}
                onClick={() => scrollTo(id)}
                aria-current={activeSection === id ? 'page' : undefined}
                tabIndex={menuOpen ? 0 : -1}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop — closes mobile menu */}
      {menuOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
