import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { apiGet } from '../lib/api';

export default function ResourcesPage() {
  const [items, setItems] = useState([]);
  useEffect(() => { load(); }, []);
  async function load() { const data = await apiGet('/api/resources'); setItems(data.items || []); }
  return (
    <div>
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-4">
        <h2 className="text-2xl font-semibold">Resource Library</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {items.map(r => (
            <a key={r.id} href={r.url} className="card block" target="_blank" rel="noreferrer">
              <div className="text-xs uppercase text-white/60">{r.type}</div>
              <div className="font-semibold">{r.title}</div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}




