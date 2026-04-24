import { useEffect, useRef } from 'react';
import './Toast.css';

export default function Toast({ message, visible, onDismiss }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (visible) {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(onDismiss, 3500);
    }
    return () => clearTimeout(timerRef.current);
  }, [visible, message, onDismiss]);

  return (
    <div
      className={`toast${visible ? ' toast--visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="toast__icon">✓</span>
      <span className="toast__message">{message}</span>
      <button
        className="toast__close"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        type="button"
      >
        ✕
      </button>
    </div>
  );
}
