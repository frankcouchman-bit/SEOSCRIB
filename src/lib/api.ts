const API_URL = 'https://seoscribe.frank-couchman.workers.dev';

function authHeaders() {
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
  const headers: Record<string,string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function getProfile() {
  try{
    const res = await fetch(`${API_URL}/api/profile`, { headers: authHeaders(), mode: 'cors' });
    if(!res.ok) throw new Error('profile');
    return await res.json();
  } catch { return null; }
}

export async function draftArticle(payload: {
  topic: string;
  website_url?: string;
  target_word_count?: number;
  tone?: string;
  generate_social?: boolean;
}) {
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(), 120000);
  const res = await fetch(`${API_URL}/api/draft`, {
    method: 'POST',
    headers: authHeaders(),
    mode: 'cors',
    signal: controller.signal,
    body: JSON.stringify(payload)
  });
  clearTimeout(timer);
  if(!res.ok){
    const msg = await res.json().catch(()=>({}));
    throw new Error(msg.message || msg.error || 'Generation failed');
  }
  return await res.json();
}

export function googleAuthRedirect() {
  const redirectBack = window.location.origin;
  window.location.href = `${API_URL}/auth/google?redirect=${encodeURIComponent(redirectBack)}`;
}

export async function requestMagic(email: string) {
  const res = await fetch(`${API_URL}/auth/magic-link`, {
    method:'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify({ email, redirect: window.location.origin }),
    mode:'cors'
  });
  if(!res.ok){
    const err = await res.json().catch(()=>({}));
    throw new Error(err.error || 'Failed to send magic link');
  }
  return true;
}

export async function createCheckout() {
  const res = await fetch(`${API_URL}/api/stripe/create-checkout`, {
    method:'POST',
    headers: authHeaders(),
    mode:'cors',
    body: JSON.stringify({
      successUrl: `${window.location.origin}?upgrade=success`,
      cancelUrl: `${window.location.origin}?upgrade=canceled`
    })
  });
  if(!res.ok) throw new Error('Checkout failed');
  const { url } = await res.json();
  window.location.href = url;
}
