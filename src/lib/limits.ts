// Daily limits: 1 article/day/account, 1 use per tool/day/account.
// If not signed in, falls back to a guest bucket keyed to device.
// Resets at local midnight.

const DAY = 24 * 60 * 60 * 1000;

export const ARTICLE_KEY = 'article-gen';
export function toolKey(id: string){ return `tool-${id}`; }

export function todayKey() {
  const now = new Date();
  return now.toISOString().slice(0,10); // YYYY-MM-DD
}

function idScope(email?: string|null) {
  return email ? `acct:${email}` : 'guest';
}

function makeCounterKey(base: string, email?: string|null) {
  return `${base}:${todayKey()}:${idScope(email)}`;
}

export function getCount(base: string, email?: string|null) {
  const k = makeCounterKey(base, email);
  const raw = localStorage.getItem(k);
  return raw ? parseInt(raw, 10) : 0;
}

export function incCount(base: string, email?: string|null) {
  const k = makeCounterKey(base, email);
  const n = getCount(base, email) + 1;
  localStorage.setItem(k, String(n));
  return n;
}

export function leftToday(base: string, limit: number, email?: string|null) {
  return Math.max(0, limit - getCount(base, email));
}

export function msUntilMidnight() {
  const now = new Date();
  const mid = new Date(now); mid.setHours(24,0,0,0);
  return mid.getTime() - now.getTime();
}

export function formattedHMS(ms: number){
  const s = Math.max(0, Math.floor(ms/1000));
  const h = String(Math.floor(s/3600)).padStart(2,'0');
  const m = String(Math.floor((s%3600)/60)).padStart(2,'0');
  const sec = String(s%60).padStart(2,'0');
  return `${h}:${m}:${sec}`;
}
