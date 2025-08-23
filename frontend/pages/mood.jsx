import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { apiGet, apiPost } from '../lib/api';
import { ensureAnonymousAuth } from '../lib/firebaseClient';

export default function MoodPage() {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState('');
  const [logs, setLogs] = useState([]);

  useEffect(() => { ensureAnonymousAuth(); fetchTrend(); }, []);

  async function fetchTrend() {
    const data = await apiGet('/api/mood/trend?userId=anon');
    setLogs(data.logs || []);
  }

  async function submitMood() {
    await apiPost('/api/mood/log', { userId: 'anon', mood, note });
    setNote('');
    fetchTrend();
  }

  return (
    <div>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-semibold">Mood Tracker</h2>
        <div className="card space-y-4">
          <div className="flex items-center gap-4">
            <span>😟</span>
            <input type="range" min="1" max="10" value={mood} onChange={e => setMood(Number(e.target.value))} className="w-full" />
            <span>😊</span>
            <span className="text-sm">{mood}/10</span>
          </div>
          <textarea className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10" placeholder="Optional note" value={note} onChange={e => setNote(e.target.value)} />
          <button className="btn-primary" onClick={submitMood}>Save</button>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Recent Check-ins</h3>
          <ul className="space-y-1 text-sm">
            {logs.slice().reverse().map(l => (
              <li key={l.id} className="flex justify-between">
                <span>{new Date(l.ts).toLocaleString()}</span>
                <span>Mood: {l.mood}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}




