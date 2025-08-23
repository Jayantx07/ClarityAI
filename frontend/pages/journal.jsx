import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { apiGet, apiPost } from '../lib/api';
import { ensureAnonymousAuth } from '../lib/firebaseClient';

export default function JournalPage() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);
  const [reframe, setReframe] = useState('');

  useEffect(() => { ensureAnonymousAuth(); load(); }, []);

  async function load() {
    const data = await apiGet('/api/journal/list?userId=anon');
    setEntries(data.entries || []);
  }

  async function save() {
    if (!text.trim()) return;
    const res = await apiPost('/api/journal/entry', { userId: 'anon', text });
    setText('');
    setReframe(res.reframe || '');
    load();
  }

  return (
    <div>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-semibold">AI Journaling Assistant</h2>
        <div className="card space-y-3">
          <textarea className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 min-h-[120px]" placeholder="Write your thoughts…" value={text} onChange={e => setText(e.target.value)} />
          <div className="text-sm text-white/70">Guided prompt: What emotion are you feeling right now, and what small step could help?</div>
          <button className="btn-primary" onClick={save}>Save Entry</button>
        </div>
        {!!reframe && (
          <div className="card">
            <div className="font-semibold mb-1">AI Reframe</div>
            <div className="text-white/80">{reframe}</div>
          </div>
        )}
        <div className="card">
          <h3 className="font-semibold mb-2">Recent Entries</h3>
          <ul className="space-y-2 text-sm">
            {entries.slice().reverse().map(e => (
              <li key={e.id} className="border-b border-white/10 pb-2">
                <div className="text-white/60 text-xs">{new Date(e.ts).toLocaleString()}</div>
                <div>{e.text}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}




