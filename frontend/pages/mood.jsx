import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthProvider';
import { Layout, Navbar } from '../components/layout';
import { Button, Card } from '../components/ui';
import BreathingExercise from '../components/BreathingExercise';
import { apiGet, apiPost } from '../lib/api';
import { ensureAnonymousAuth } from '../lib/firebaseClient';
// Graphs use Recharts library for trends
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function MoodPage() {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState('');
  const [logs, setLogs] = useState([]);
  const [breathingActive, setBreathingActive] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');

  const { currentUser } = useAuth();

  useEffect(() => { 
    // Prefer signed-in user; fallback to anonymous
    if (!currentUser) ensureAnonymousAuth(); 
    fetchTrend(); 
  }, [currentUser]);

  async function fetchTrend() {
    const uid = currentUser?.uid || 'anon';
    const data = await apiGet(`/api/mood/trend?userId=${uid}`);
    setLogs(data.logs || []);
  }

  async function submitMood() {
    const uid = currentUser?.uid || 'anon';
    await apiPost('/api/mood/log', { 
      userId: uid, 
      mood, 
      note,
      emotion: selectedEmotion,
      timestamp: new Date().toISOString()
    });
    setNote('');
    setSelectedEmotion('');
    fetchTrend();
    
    // Auto-suggest breathing for low moods
    if (mood <= 3) {
      setTimeout(() => setBreathingActive(true), 1000);
    }
  }

  const emotions = [
    { name: 'Happy', emoji: '😊', color: 'bg-green-500' },
    { name: 'Sad', emoji: '😢', color: 'bg-blue-500' },
    { name: 'Anxious', emoji: '😰', color: 'bg-orange-500' },
    { name: 'Angry', emoji: '😠', color: 'bg-red-500' },
    { name: 'Excited', emoji: '🤩', color: 'bg-yellow-500' },
    { name: 'Calm', emoji: '😌', color: 'bg-purple-500' },
    { name: 'Tired', emoji: '😴', color: 'bg-gray-500' },
    { name: 'Confused', emoji: '😕', color: 'bg-indigo-500' }
  ];

  const getMoodColor = (moodValue) => {
    if (moodValue <= 3) return 'text-red-400';
    if (moodValue <= 6) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getMoodEmoji = (moodValue) => {
    if (moodValue <= 2) return '😢';
    if (moodValue <= 4) return '😔';
    if (moodValue <= 6) return '😐';
    if (moodValue <= 8) return '😊';
    return '🤩';
  };

  return (
    <Layout>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-semibold">Mood Analytics</h2>
        
        {/* Current Mood Input */}
        <Card className="space-y-4">
          <h3 className="font-semibold">How are you feeling right now?</h3>
          
          <div className="flex items-center gap-4">
            <span className="text-2xl">😟</span>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={mood} 
              onChange={e => setMood(Number(e.target.value))} 
              className="flex-1" 
            />
            <span className="text-2xl">😊</span>
            <div className="text-center">
              <div className={`text-2xl ${getMoodColor(mood)}`}>
                {getMoodEmoji(mood)}
              </div>
              <div className="text-sm text-white/60">{mood}/10</div>
            </div>
          </div>

          {/* Emotion Selection */}
          <div>
            <label className="block text-sm text-white/80 mb-2">Select primary emotion:</label>
            <div className="grid grid-cols-4 gap-2">
              {emotions.map((emotion) => (
                <button
                  key={emotion.name}
                  onClick={() => setSelectedEmotion(emotion.name)}
                  className={`p-2 rounded-lg border transition ${
                    selectedEmotion === emotion.name
                      ? 'border-brand bg-brand/20'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="text-lg">{emotion.emoji}</div>
                  <div className="text-xs text-white/80">{emotion.name}</div>
                </button>
              ))}
            </div>
          </div>

          <textarea 
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10" 
            placeholder="What's contributing to this mood? (optional)" 
            value={note} 
            onChange={e => setNote(e.target.value)} 
          />
          
          <Button onClick={submitMood}>
            Log Mood
          </Button>
        </Card>

        {/* Analytics Dashboard */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Mood Trend (Recharts) */}
          <Card>
            <h3 className="font-semibold mb-4">7-Day Trend</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={logs.slice(-7).map(l => ({
                  date: new Date(l.ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                  mood: l.mood
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                  <YAxis domain={[1, 10]} tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                  <Tooltip
                    contentStyle={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
                    labelStyle={{ color: 'white' }}
                  />
                  <Line type="monotone" dataKey="mood" stroke="#8E89FF" strokeWidth={3} dot={{ r: 3, fill: '#8E89FF' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Insights */}
          <Card>
            <h3 className="font-semibold mb-4">Insights</h3>
            <div className="space-y-3 text-sm">
              {logs.length > 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-white/80">Average Mood:</span>
                    <span className={getMoodColor(Math.round(logs.reduce((a, b) => a + b.mood, 0) / logs.length))}>
                      {Math.round(logs.reduce((a, b) => a + b.mood, 0) / logs.length)}/10
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Total Entries:</span>
                    <span className="text-white">{logs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/80">Streak:</span>
                    <span className="text-green-400">3 days</span>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        {/* Recent Entries */}
        <Card>
          <h3 className="font-semibold mb-4">Recent Check-ins</h3>
          <div className="space-y-3">
            {logs.slice().reverse().map(log => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`text-2xl ${getMoodColor(log.mood)}`}>
                    {getMoodEmoji(log.mood)}
                  </div>
                  <div>
                    <div className="text-sm text-white/60">
                      {new Date(log.ts).toLocaleString()}
                    </div>
                    {log.note && (
                      <div className="text-sm text-white/80 mt-1">{log.note}</div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-semibold ${getMoodColor(log.mood)}`}>
                    {log.mood}/10
                  </div>
                  {log.emotion && (
                    <div className="text-xs text-white/60">{log.emotion}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </main>

      {/* Breathing Exercise */}
      <BreathingExercise 
        isActive={breathingActive} 
        onComplete={() => setBreathingActive(false)} 
      />
    </Layout>
  );
}




