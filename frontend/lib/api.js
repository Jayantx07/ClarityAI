const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers: { 'Content-Type': 'application/json' } });
  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

export async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body || {})
  });
  return res.json();
}




