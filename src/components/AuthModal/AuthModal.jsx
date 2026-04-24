import { useState, useEffect, useRef } from 'react';
import { findAccount, createAccount, saveSession } from '../../utils/storage.js';
import './AuthModal.css';

function Field({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  autoComplete,
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="auth-field">
      <label className="auth-field__label" htmlFor={id}>
        {label}
      </label>

      <div className="auth-field__wrap">
        <input
          id={id}
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`auth-field__input ${error ? 'auth-field__input--error' : ''}`}
        />

        {isPassword && (
          <button
            type="button"
            className="auth-field__toggle"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {error && (
        <span className="auth-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

/* ─── Login form ─────────────────────────────────────────────────────────────── */
function LoginForm({ onSuccess, onSwitch }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};

    if (!identifier.trim()) e.identifier = 'Email or username is required.';
    if (!password) e.password = 'Password is required.';

    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const account = findAccount(identifier.trim(), password);

      if (!account) {
        setErrors({ general: 'The email, username, or password is incorrect.' });
        setLoading(false);
        return;
      }

      const session = saveSession(account);
      onSuccess(session);
    }, 600);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <Field
        id="login-identifier"
        label="Email or Username"
        value={identifier}
        onChange={setIdentifier}
        error={errors.identifier}
        placeholder="Enter your email or username"
        autoComplete="email"
      />

      <Field
        id="login-password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        placeholder="Enter your password"
        autoComplete="current-password"
      />

      {errors.general && (
        <div className="auth-error-general" role="alert">
          {errors.general}
        </div>
      )}

      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? 'Signing in…' : 'Sign In'}
      </button>

      <p className="auth-switch">
        New to BiteLab?{' '}
        <button type="button" className="auth-switch-btn" onClick={onSwitch}>
          Create an account
        </button>
      </p>
    </form>
  );
}

/* ─── Signup form ─────────────────────────────────────────────────────────────── */
function SignupForm({ onSuccess, onSwitch }) {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validate() {
    const e = {};

    if (!displayName.trim()) e.displayName = 'Full name is required.';
    if (!username.trim()) e.username = 'Username is required.';
    if (!/^[a-z0-9_]{3,}$/i.test(username)) {
      e.username = 'Use letters, numbers, or underscores only.';
    }
    if (!email.trim() || !email.includes('@')) {
      e.email = 'Enter a valid email address.';
    }
    if (password.length < 6) {
      e.password = 'Password must be at least 6 characters.';
    }

    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const result = createAccount({
        username,
        email,
        password,
        displayName,
      });

      if (result.error) {
        setErrors({ general: result.error });
        setLoading(false);
        return;
      }

      const session = saveSession(result.account);
      onSuccess(session);
    }, 600);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <Field
        id="signup-displayname"
        label="Full Name"
        value={displayName}
        onChange={setDisplayName}
        error={errors.displayName}
        placeholder="Enter your full name"
        autoComplete="name"
      />

      <Field
        id="signup-username"
        label="Username"
        value={username}
        onChange={setUsername}
        error={errors.username}
        placeholder="Choose a username"
        autoComplete="username"
      />

      <Field
        id="signup-email"
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        error={errors.email}
        placeholder="Enter your email address"
        autoComplete="email"
      />

      <Field
        id="signup-password"
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        error={errors.password}
        placeholder="Create a secure password"
        autoComplete="new-password"
      />

      {errors.general && (
        <div className="auth-error-general" role="alert">
          {errors.general}
        </div>
      )}

      <button className="auth-submit" type="submit" disabled={loading}>
        {loading ? 'Creating account…' : 'Create Account'}
      </button>

      <p className="auth-switch">
        Already have an account?{' '}
        <button type="button" className="auth-switch-btn" onClick={onSwitch}>
          Sign in
        </button>
      </p>
    </form>
  );
}

/* ─── Modal shell ─────────────────────────────────────────────────────────────── */
export default function AuthModal({ mode, onClose, onLogin, onSignup, onSwitchMode }) {
  const modalRef = useRef(null);
  const isLogin = mode === 'login';

  useEffect(() => {
    const prev = document.activeElement;

    modalRef.current?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [onClose]);

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="auth-modal__backdrop" onMouseDown={handleBackdropClick}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        ref={modalRef}
        tabIndex={-1}
      >
        <button
          className="auth-modal__close"
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          ✕
        </button>

        <aside className="auth-modal__brand" aria-hidden="true">
          <div className="auth-modal__brand-content">
            <img
              src="/images/Logo.png"
              alt=""
              className="auth-modal__brand-logo"
            />

            <div>
              <span className="auth-modal__eyebrow">BiteLab Account</span>
              <h3 className="auth-modal__brand-title">
                Smart snacks, made closer to the people who enjoy them.
              </h3>
              <p className="auth-modal__brand-text">
                Sign in to share feedback, follow product updates, and stay connected
                with BiteLab.
              </p>
            </div>
          </div>
        </aside>

        <div className="auth-modal__content">
          <header className="auth-modal__header">
            <div className="auth-modal__logo">
              <img
                src="/images/Logo.png"
                alt="BiteLab"
                className="auth-modal__logo-img"
              />
            </div>

            <h2 className="auth-modal__title" id="auth-modal-title">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>

            <p className="auth-modal__subtitle">
              {isLogin
                ? 'Sign in to continue to your BiteLab account.'
                : 'Join BiteLab and start sharing your product experience.'}
            </p>
          </header>

          {isLogin ? (
            <LoginForm
              onSuccess={onLogin}
              onSwitch={() => onSwitchMode('signup')}
            />
          ) : (
            <SignupForm
              onSuccess={onSignup}
              onSwitch={() => onSwitchMode('login')}
            />
          )}
        </div>
      </section>
    </div>
  );
}