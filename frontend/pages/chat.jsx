import { useEffect, useState } from 'react';
import { Layout, Navbar } from '../components/layout';
import { Button, Card } from '../components/ui';
import BreathingExercise from '../components/BreathingExercise';
import SoundTherapy from '../components/SoundTherapy';
import Gamification, { AchievementNotification } from '../components/Gamification';
import { apiPost } from '../lib/api';
import { ensureAnonymousAuth } from '../lib/firebaseClient';
import { analyzeSentiment, getResponseStyle } from '../lib/sentiment';

export default function ChatPage() {
  const [messages, setMessages] = useState([{ 
    role: 'assistant', 
    content: 'Hi! I\'m ClarityAI, your empathetic companion. How are you feeling today? 😊',
    mood: 'welcome',
    suggestedActivity: null,
    sentiment: { emotion: 'neutral', responseStyle: 'neutral' }
  }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [breathingActive, setBreathingActive] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [soundFrequency, setSoundFrequency] = useState('alpha');
  const [currentAchievement, setCurrentAchievement] = useState(null);
  
  const gamification = Gamification({ userId: 'anon' });

  useEffect(() => { ensureAnonymousAuth(); }, []);

  async function sendMessage(e) {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Analyze sentiment of user input
    const sentiment = analyzeSentiment(input);
    const responseStyle = getResponseStyle(sentiment);
    
    const userMessage = { 
      role: 'user', 
      content: input,
      sentiment: sentiment
    };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput('');
    setLoading(true);
    
    // Handle crisis detection
    if (sentiment.emotion === 'crisis') {
      setMessages(m => [...m, { 
        role: 'assistant', 
        content: 'I\'m concerned about what you\'re sharing. You\'re not alone, and there are people who want to help. Please reach out to a crisis helpline immediately. In India: AASRA (9820466726) or Vandrevala Foundation (9999666555). Your life has value. 💙',
        mood: 'crisis',
        sentiment: sentiment,
        suggestedActivity: 'crisis_support'
      }]);
      setLoading(false);
      return;
    }
    
    // Auto-trigger wellness activities based on sentiment
    if (sentiment.suggestedActivity === 'breathing') {
      setTimeout(() => setBreathingActive(true), 1000);
    } else if (sentiment.suggestedActivity === 'sound_therapy') {
      setTimeout(() => {
        setSoundFrequency(sentiment.emotion === 'stress' ? 'theta' : 'alpha');
        setSoundActive(true);
      }, 1000);
    }
    
    try {
      const res = await apiPost('/api/chat', { 
        messages: next.slice(-10),
        sentiment: sentiment
      });
      
      if (res.error) {
        setMessages(m => [...m, { 
          role: 'assistant', 
          content: res.reply || 'I\'m having trouble right now. Can you try again?',
          mood: 'error',
          sentiment: { emotion: 'error', responseStyle: 'neutral' }
        }]);
      } else {
        setMessages(m => [...m, { 
          role: 'assistant', 
          content: res.reply,
          mood: res.mood,
          suggestedActivity: res.suggestedActivity,
          sentiment: sentiment
        }]);
      }
    } catch (error) {
      setMessages(m => [...m, { 
        role: 'assistant', 
        content: 'Sorry, I\'m having trouble connecting right now. Please try again.',
        mood: 'error',
        sentiment: { emotion: 'error', responseStyle: 'neutral' }
      }]);
    } finally { 
      setLoading(false);
      // Record chat activity for gamification
      gamification.recordActivity('chat');
    }
  }

  useEffect(() => {
    if (gamification.recentAchievements.length > 0) {
      setCurrentAchievement(gamification.recentAchievements[0]);
    }
  }, [gamification.recentAchievements]);

  function getMoodEmoji(mood) {
    const moodEmojis = {
      'low': '😔',
      'positive': '😊',
      'neutral': '😐',
      'welcome': '👋',
      'error': '⚠️',
      'crisis': '🚨',
      'stress': '😰',
      'sad': '😢',
      'anger': '😠'
    };
    return moodEmojis[mood] || '💭';
  }

  function getSentimentColor(sentiment) {
    if (!sentiment) return 'text-white/80';
    
    const colors = {
      'stress': 'text-orange-400',
      'sad': 'text-blue-400',
      'anger': 'text-red-400',
      'positive': 'text-green-400',
      'crisis': 'text-red-500',
      'neutral': 'text-white/80'
    };
    
    return colors[sentiment.emotion] || 'text-white/80';
  }

  return (
    <Layout>
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-6 space-y-4">
        <h2 className="text-2xl font-semibold">Chat Companion</h2>
        
        <Card className="space-y-3 h-[60vh] overflow-y-auto">
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
                       m.mood === 'neutral' ? 'Feeling Okay' : 
                       m.mood === 'crisis' ? 'Crisis Support' :
                       m.mood === 'stress' ? 'Feeling Stressed' :
                       m.mood === 'sad' ? 'Feeling Sad' :
                       m.mood === 'anger' ? 'Feeling Angry' : 'Listening'}
                    </span>
                  )}
                  {m.role === 'user' && m.sentiment && (
                    <span className={`text-xs px-2 py-1 rounded ${getSentimentColor(m.sentiment)}`}>
                      {m.sentiment.emotion} ({Math.round(m.sentiment.confidence * 100)}%)
                    </span>
                  )}
                </div>
                <div className="whitespace-pre-wrap">{m.content}</div>
                
                {m.suggestedActivity && m.suggestedActivity !== 'crisis_support' && (
                  <div className="mt-2 p-2 bg-brand/20 rounded border-l-2 border-brand">
                    <div className="text-xs font-semibold text-brand-light mb-1">
                      💡 Suggested Activity:
                    </div>
                    <div className="text-sm">
                      {m.suggestedActivity === 'breathing' && 'Try a breathing exercise to help you relax'}
                      {m.suggestedActivity === 'sound_therapy' && 'Listen to calming sounds to reduce stress'}
                      {m.suggestedActivity === 'journaling' && 'Write down your thoughts to process your feelings'}
                      {m.suggestedActivity === 'chat' && 'Continue our conversation - I\'m here to listen'}
                    </div>
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
        </Card>
        
        <form onSubmit={sendMessage} className="flex gap-2">
          <input 
            className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/10 focus:border-brand focus:outline-none" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder="Share your mood or thoughts..." 
          />
          <Button type="submit" disabled={loading}>
            Send
          </Button>
        </form>
        
        <div className="text-xs text-white/50 text-center">
          Try: 😊 feeling good, 😞 tough day, 😰 stressed, or 😐 just okay
        </div>
      </main>

      {/* Wellness Components */}
      <BreathingExercise 
        isActive={breathingActive} 
        onComplete={() => setBreathingActive(false)} 
      />
      <SoundTherapy 
        isActive={soundActive} 
        frequency={soundFrequency}
        onClose={() => setSoundActive(false)}
      />
      
      {/* Achievement Notifications */}
      <AchievementNotification 
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />
    </Layout>
  );
}




