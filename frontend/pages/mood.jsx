import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import BreathingExercise from '../components/BreathingExercise';
import { apiGet, apiPost } from '../lib/api';
import { ensureAnonymousAuth } from '../lib/firebaseClient';

export default function MoodPage() {
  const [mood, setMood] = useState(5);
  const [note, setNote] = useState('');
  const [logs, setLogs] = useState([]);
  const [breathingActive, setBreathingActive] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState('');

  useEffect(() => { ensureAnonymousAuth(); fetchTrend(); }, []);

  async function fetchTrend() {
    const data = await apiGet('/api/mood/trend?userId=anon');
    setLogs(data.logs || []);
  }

  async function submitMood() {
    await apiPost('/api/mood/log', { 
      userId: 'anon', 
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
    <div>
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-semibold">Mood Analytics</h2>
        
        {/* Current Mood Input */}
        <div className="card space-y-4">
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
          
          <button className="btn-primary" onClick={submitMood}>
            Log Mood
          </button>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Mood Trend */}
          <div className="card">
            <h3 className="font-semibold mb-4">7-Day Trend</h3>
            <div className="space-y-2">
              {logs.slice(-7).map((log, i) => (
                <div key={log.id} className="flex items-center gap-3">
                  <div className="text-sm text-white/60 w-16">
                    {new Date(log.ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex-1 bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        log.mood <= 3 ? 'bg-red-400' : 
                        log.mood <= 6 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      style={{ width: `${(log.mood / 10) * 100}%` }}
                    />
                  </div>
                  <div className={`text-sm ${getMoodColor(log.mood)}`}>
                    {getMoodEmoji(log.mood)} {log.mood}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights */}
          <div className="card">
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
          </div>
        </div>

        {/* Recent Entries */}
        <div className="card">
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
        </div>
      </main>

      {/* Breathing Exercise */}
      <BreathingExercise 
        isActive={breathingActive} 
        onComplete={() => setBreathingActive(false)} 
      />
    </div>
  );
}




