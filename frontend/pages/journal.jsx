import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import PaintingCanvas from '../components/PaintingCanvas';
import { apiGet, apiPost } from '../lib/api';
import { ensureAnonymousAuth } from '../lib/firebaseClient';
import { analyzeSentiment } from '../lib/sentiment';

export default function JournalPage() {
  const [text, setText] = useState('');
  const [entries, setEntries] = useState([]);
  const [reframe, setReframe] = useState('');
  const [paintingActive, setPaintingActive] = useState(false);
  const [currentSentiment, setCurrentSentiment] = useState(null);
  const [prompts] = useState([
    "What emotion are you feeling right now, and what small step could help?",
    "Describe a moment today that brought you joy or peace.",
    "What's one thing you're grateful for, even if it's small?",
    "Write about a challenge you're facing and how you might approach it differently.",
    "What would you tell a friend who was feeling the same way you are?",
    "Describe your ideal peaceful moment - what does it look, sound, and feel like?",
    "What's one thing you learned about yourself recently?",
    "Write about a time you overcame something difficult."
  ]);
  const [currentPrompt, setCurrentPrompt] = useState(0);

  useEffect(() => { ensureAnonymousAuth(); load(); }, []);

  async function load() {
    const data = await apiGet('/api/journal/list?userId=anon');
    setEntries(data.entries || []);
  }

  async function save() {
    if (!text.trim()) return;
    
    // Analyze sentiment of journal entry
    const sentiment = analyzeSentiment(text);
    setCurrentSentiment(sentiment);
    
    const res = await apiPost('/api/journal/entry', { 
      userId: 'anon', 
      text,
      sentiment: sentiment,
      prompt: prompts[currentPrompt]
    });
    setText('');
    setReframe(res.reframe || generateReframe(sentiment, text));
    load();
    
    // Auto-suggest painting for emotional expression
    if (sentiment.emotion === 'sad' || sentiment.emotion === 'anger') {
      setTimeout(() => setPaintingActive(true), 1500);
    }
  }

  const generateReframe = (sentiment, text) => {
    const reframes = {
      stress: "It sounds like you're carrying a lot right now. Remember that it's okay to take things one step at a time. What's one small thing you could do to feel more grounded?",
      sad: "Your feelings are valid and important. Sometimes sadness is our heart's way of processing and healing. What would comfort you right now?",
      anger: "Anger often comes from a place of care - caring about fairness, boundaries, or values. How might you channel this energy constructively?",
      positive: "It's wonderful to hear about your positive experiences! Celebrating these moments helps build resilience for tougher times.",
      neutral: "Thank you for sharing your thoughts. Sometimes just putting words to our experiences helps us understand them better."
    };
    
    return reframes[sentiment.emotion] || "Thank you for taking the time to reflect. Your thoughts and feelings matter.";
  };

  const nextPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % prompts.length);
  };

  return (
    <div>
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-semibold">AI Journaling Assistant</h2>
        
        {/* Writing Area */}
        <div className="card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Express Your Thoughts</h3>
            <button
              onClick={nextPrompt}
              className="text-sm text-brand hover:text-brand-light transition"
            >
              New Prompt →
            </button>
          </div>
          
          <div className="p-3 bg-white/5 rounded-lg border-l-2 border-brand">
            <div className="text-sm text-white/80">
              💭 {prompts[currentPrompt]}
            </div>
          </div>
          
          <textarea 
            className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/10 min-h-[150px] resize-none" 
            placeholder="Write your thoughts freely... there are no rules here." 
            value={text} 
            onChange={e => setText(e.target.value)} 
          />
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/60">
              {text.length} characters
            </div>
            <button 
              className="btn-primary" 
              onClick={save}
              disabled={!text.trim()}
            >
              Save Entry
            </button>
          </div>
        </div>

        {/* AI Reframe */}
        {!!reframe && (
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-lg">🤖</div>
              <div className="font-semibold">AI Reflection</div>
            </div>
            <div className="text-white/80 leading-relaxed">{reframe}</div>
            
            {currentSentiment && (
              <div className="mt-3 p-2 bg-white/5 rounded border-l-2 border-brand">
                <div className="text-xs text-white/60 mb-1">Detected Emotion:</div>
                <div className="text-sm">
                  {currentSentiment.emotion} ({Math.round(currentSentiment.confidence * 100)}% confidence)
                </div>
              </div>
            )}
          </div>
        )}

        {/* Creative Expression Suggestion */}
        {currentSentiment && (currentSentiment.emotion === 'sad' || currentSentiment.emotion === 'anger') && (
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold mb-1">🎨 Try Creative Expression</div>
                <div className="text-sm text-white/80">
                  Sometimes words aren't enough. Express your emotions through color and movement.
                </div>
              </div>
              <button
                onClick={() => setPaintingActive(true)}
                className="btn-primary"
              >
                Open Canvas
              </button>
            </div>
          </div>
        )}

        {/* Recent Entries */}
        <div className="card">
          <h3 className="font-semibold mb-4">Recent Entries</h3>
          <div className="space-y-4">
            {entries.slice().reverse().map(entry => (
              <div key={entry.id} className="p-4 bg-white/5 rounded-lg border-l-2 border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-white/60">
                    {new Date(entry.ts).toLocaleString()}
                  </div>
                  {entry.sentiment && (
                    <div className="text-xs px-2 py-1 bg-white/10 rounded">
                      {entry.sentiment.emotion}
                    </div>
                  )}
                </div>
                <div className="text-white/90 leading-relaxed mb-2">
                  {entry.text}
                </div>
                {entry.prompt && (
                  <div className="text-xs text-white/50 italic">
                    Prompt: {entry.prompt}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Painting Canvas */}
      <PaintingCanvas 
        isActive={paintingActive} 
        onClose={() => setPaintingActive(false)} 
      />
    </div>
  );
}




