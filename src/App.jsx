import { useState, useEffect, useCallback } from 'react';
import './App.css';

import Navbar        from './components/Navbar/Navbar.jsx';
import Hero          from './components/Hero/Hero.jsx';
import About         from './components/About/About.jsx';
import Product       from './components/Product/Product.jsx';
import Advertisement from './components/Advertisement/Advertisement.jsx';
import Feedback      from './components/Feedback/Feedback.jsx';
import Team          from './components/Team/Team.jsx';
import Footer        from './components/Footer/Footer.jsx';
import AuthModal     from './components/AuthModal/AuthModal.jsx';
import Toast         from './components/Toast/Toast.jsx';

import { getSession, clearSession } from './utils/storage.js';

export default function App() {
  const [user, setUser]           = useState(null);
  const [authMode, setAuthMode]   = useState(null); // 'login' | 'signup' | null
  const [toast, setToast]         = useState({ message: '', visible: false });

  // Restore session on mount
  useEffect(() => {
    const session = getSession();
    if (session) setUser(session);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const showToast = useCallback((message) => {
    setToast({ message, visible: true });
  }, []);

  const dismissToast = useCallback(() => {
    setToast((t) => ({ ...t, visible: false }));
  }, []);

  function handleLogin(session) {
    setUser(session);
    setAuthMode(null);
    showToast(`Welcome back, ${session.displayName}!`);
  }

  function handleSignup(session) {
    setUser(session);
    setAuthMode(null);
    showToast(`Account created! Welcome, ${session.displayName}!`);
  }

  function handleLogout() {
    clearSession();
    setUser(null);
    showToast("You've been signed out.");
  }

  function openLogin()  { setAuthMode('login');  }
  function openSignup() { setAuthMode('signup'); }
  function closeAuth()  { setAuthMode(null);     }

  return (
    <>
      <Navbar
        user={user}
        onLogin={openLogin}
        onSignup={openSignup}
        onLogout={handleLogout}
      />

      <main>
        <Hero   onLogin={openLogin} onExplore={() => {
          document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
        }} />
        <About   />
        <Product />
        <Advertisement />
        <Feedback user={user} onLogin={openLogin} />
        <Team    />
      </main>

      <Footer />

      {authMode && (
        <>
          <div className="overlay-backdrop" onClick={closeAuth} />
          <AuthModal
            mode={authMode}
            onClose={closeAuth}
            onLogin={handleLogin}
            onSignup={handleSignup}
            onSwitchMode={(m) => setAuthMode(m)}
          />
        </>
      )}

      <Toast
        message={toast.message}
        visible={toast.visible}
        onDismiss={dismissToast}
      />
    </>
  );
}
