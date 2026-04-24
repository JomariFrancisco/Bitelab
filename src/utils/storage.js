import { SEED_ACCOUNTS, INITIAL_FEEDBACK } from '../data/mockData';

const KEYS = {
  ACCOUNTS: 'bitelab_accounts',
  SESSION: 'bitelab_session',
  FEEDBACK: 'bitelab_feedback',
};

// ─── Accounts ───────────────────────────────────────────────────────────────

function loadAccounts() {
  try {
    const raw = localStorage.getItem(KEYS.ACCOUNTS);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  // Seed on first load
  localStorage.setItem(KEYS.ACCOUNTS, JSON.stringify(SEED_ACCOUNTS));
  return [...SEED_ACCOUNTS];
}

function saveAccounts(accounts) {
  localStorage.setItem(KEYS.ACCOUNTS, JSON.stringify(accounts));
}

export function getAccounts() {
  return loadAccounts();
}

export function findAccount(emailOrUsername, password) {
  const accounts = loadAccounts();
  return accounts.find(
    (a) =>
      (a.email === emailOrUsername || a.username === emailOrUsername) &&
      a.password === password
  ) || null;
}

export function createAccount({ username, email, password, displayName }) {
  const accounts = loadAccounts();
  const exists = accounts.find(
    (a) => a.email === email || a.username === username
  );
  if (exists) {
    if (exists.email === email) return { error: 'Email already in use.' };
    return { error: 'Username already taken.' };
  }
  const newAccount = {
    id: `user_${Date.now()}`,
    username,
    email,
    password,
    displayName: displayName || username,
  };
  accounts.push(newAccount);
  saveAccounts(accounts);
  return { account: newAccount };
}

// ─── Session ─────────────────────────────────────────────────────────────────

export function getSession() {
  try {
    const raw = localStorage.getItem(KEYS.SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

export function saveSession(account) {
  const session = {
    id: account.id,
    username: account.username,
    displayName: account.displayName,
    email: account.email,
  };
  localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
  return session;
}

export function clearSession() {
  localStorage.removeItem(KEYS.SESSION);
}

// ─── Feedback ────────────────────────────────────────────────────────────────

export function loadFeedback() {
  try {
    const raw = localStorage.getItem(KEYS.FEEDBACK);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  localStorage.setItem(KEYS.FEEDBACK, JSON.stringify(INITIAL_FEEDBACK));
  return [...INITIAL_FEEDBACK];
}

export function appendFeedback(entry) {
  const list = loadFeedback();
  const newEntry = {
    ...entry,
    id: `fb_${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
  };
  const updated = [newEntry, ...list];
  localStorage.setItem(KEYS.FEEDBACK, JSON.stringify(updated));
  return updated;
}
