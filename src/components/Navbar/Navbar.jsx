import { useState, useEffect, useRef } from 'react';
import { NAV_LINKS } from '../../data/mockData.js';
import './Navbar.css';

export default function Navbar({ user, onLogin, onSignup, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  function handleNavClick(href) {
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} ref={menuRef}>
      <div className="navbar__inner container">
        <div className="navbar__left-spacer" aria-hidden="true" />

        <ul className="navbar__links">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '');
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${activeSection === id ? 'navbar__link--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="navbar__auth">
          {user ? (
            <>
              <span className="navbar__greeting">
                Hi, <strong>{user.displayName.split(' ')[0]}</strong>
              </span>
              <button className="btn-outline btn-sm" onClick={onLogout}>
                Log out
              </button>
            </>
          ) : (
            <button className="btn-ghost btn-sm" onClick={onLogin}>
              Log in
            </button>
          )}
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace('#', '');
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={activeSection === id ? 'navbar__mobile-link--active' : ''}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="navbar__mobile-auth">
          {user ? (
            <>
              <span className="navbar__mobile-greeting">
                Logged in as <strong>{user.displayName}</strong>
              </span>
              <button
                className="btn-outline btn-sm"
                onClick={() => {
                  onLogout();
                  setMenuOpen(false);
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <button
              className="btn-ghost btn-sm"
              onClick={() => {
                onLogin();
                setMenuOpen(false);
              }}
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}