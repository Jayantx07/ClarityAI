import { useEffect, useState, useRef } from 'react';
import { Layout, Navbar } from '../components/layout';
import { Button } from '../components/ui';
import BreathingExercise from '../components/BreathingExercise';
import SoundTherapy from '../components/SoundTherapy';
import Gamification, { AchievementNotification } from '../components/Gamification';
import { BgVideo } from '../components/ui';
import { apiPost } from '../lib/api';
import { ensureAnonymousAuth } from '../lib/firebaseClient';
import { analyzeSentiment, getResponseStyle } from '../lib/sentiment';

export default function ChatPage() {
  const chatContainerRef = useRef(null);
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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
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
      <BgVideo />
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Chat Interface Container */}
            <div className="relative backdrop-blur-lg bg-white/10 rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Messages Container */}
              <div 
                ref={chatContainerRef}
                className="h-[70vh] overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
              >
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[80%] ${
                        m.role === 'user' ? 'bg-white/20' : 'bg-white/15'
                      } backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg
                      ${m.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}
                      transform transition-all duration-300 hover:scale-[1.02]`}
                    >
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
                        <div className="mt-2 p-2 bg-white/10 rounded border-l-2 border-white/40">
                          <div className="text-xs font-semibold text-white/80 mb-1">
                            💡 Suggested Activity:
                          </div>
                          <div className="text-sm text-white/70">
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
                  <div className="flex justify-start">
                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg rounded-tl-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" 
                          style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" 
                          style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" 
                          style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Container */}
              <div className="relative border-t border-white/20">
                <form onSubmit={sendMessage} className="flex">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full bg-white/10 backdrop-blur-md px-6 py-4 text-white placeholder-white/50 
                      focus:outline-none focus:ring-0 text-lg font-light"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-full
                      bg-white/20 hover:bg-white/30 transition-all duration-300 disabled:opacity-50
                      disabled:hover:bg-white/20 text-white/90"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>

            {/* Helper Text */}
            <div className="text-xs text-white/50 text-center mt-4">
              Try: 😊 feeling good, 😞 tough day, 😰 stressed, or 😐 just okay
            </div>
          </div>
        </div>

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
      </div>
    </Layout>
  );
}




