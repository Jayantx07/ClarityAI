import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { apiPost } from '../lib/api';
import { ensureAnonymousAuth } from '../lib/firebaseClient';

export default function ChatPage() {
  const [messages, setMessages] = useState([{ 
    role: 'assistant', 
    content: 'Hi! I\'m ClarityAI, your empathetic companion. How are you feeling today? 😊',
    mood: 'welcome',
    suggestedActivity: null
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { ensureAnonymousAuth(); }, []);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', content: input };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput('');
    setLoading(true);
    
    try {
      const res = await apiPost('/api/chat', { messages: next.slice(-10) });
      
      if (res.error) {
        setMessages(m => [...m, { 
          role: 'assistant', 
          content: res.reply || 'I\'m having trouble right now. Can you try again?',
          mood: 'error'
        }]);
      } else {
        setMessages(m => [...m, { 
          role: 'assistant', 
          content: res.reply,
          mood: res.mood,
          suggestedActivity: res.suggestedActivity
        }]);
      }
    } catch (error) {
      setMessages(m => [...m, { 
        role: 'assistant', 
        content: 'Sorry, I\'m having trouble connecting right now. Please try again.',
        mood: 'error'
      }]);
    } finally { 
      setLoading(false); 
    }
  }

  function getMoodEmoji(mood) {
    const moodEmojis = {
      'low': '😔',
      'positive': '😊',
      'neutral': '😐',
      'welcome': '👋',
      'error': '⚠️'
    };
    return moodEmojis[mood] || '💭';
  }

  return (
    <div>
      <Nav />
      <main className="mx-auto max-w-3xl px-4 py-6 space-y-4">
        <h2 className="text-2xl font-semibold">Chat Companion</h2>
        
        <div className="card space-y-3 h-[60vh] overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
              <div className={`inline-block px-3 py-2 rounded-lg max-w-[80%] ${
                m.role === 'user' 
                  ? 'bg-brand text-white' 
                  : 'bg-white/10'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  {m.role === 'assistant' && (
                    <span className="text-lg">{getMoodEmoji(m.mood)}</span>
                  )}
                  {m.role === 'assistant' && m.mood && m.mood !== 'welcome' && (
                    <span className="text-xs bg-white/20 px-2 py-1 rounded">
                      {m.mood === 'low' ? 'Feeling Down' : 
                       m.mood === 'positive' ? 'Feeling Good' : 
                       m.mood === 'neutral' ? 'Feeling Okay' : 'Listening'}
                    </span>
                  )}
                </div>
                <div className="whitespace-pre-wrap">{m.content}</div>
                
                {m.suggestedActivity && (
                  <div className="mt-2 p-2 bg-brand/20 rounded border-l-2 border-brand">
                    <div className="text-xs font-semibold text-brand-light mb-1">
                      💡 Suggested Activity:
                    </div>
                    <div className="text-sm">{m.suggestedActivity}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-white/70">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand"></div>
                Thinking...
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={sendMessage} className="flex gap-2">
          <input 
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 focus:border-brand focus:outline-none" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Share your mood or thoughts..." 
          />
          <button className="btn-primary" type="submit" disabled={loading}>
            Send
          </button>
        </form>
        
        <div className="text-xs text-white/50 text-center">
          Try: 😊 feeling good, 😞 tough day, or 😐 just okay
        </div>
      </main>
    </div>
  );
}



