import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../components/AuthProvider';
import Image from 'next/image';
import Link from 'next/link';

// Custom cursor: circular ring with inner black dot
function CursorBlend() {
  const cursorRef = useRef(null);
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    const move = (e) => {
      // Outer is 20x20, center at pointer
      el.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[999] w-5 h-5 rounded-full border-2 border-black/70 bg-transparent flex items-center justify-center"
    >
      <div className="w-1.5 h-1.5 rounded-full bg-black" />
    </div>
  );
}
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
  
  const { currentUser, loginAnonymously } = useAuth();
  const gamification = Gamification({ userId: currentUser?.uid || 'anon' });

  useEffect(() => {
    // Prefer signed-in user; fallback to anonymous auth
    if (!currentUser) {
      ensureAnonymousAuth();
    }
  }, [currentUser]);

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
        sentiment: sentiment,
        userId: currentUser?.uid || 'anon'
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

  // Sidebar + Hero setup
  const { logout } = useAuth();
  const startNewChat = () => {
    setMessages([{ 
      role: 'assistant', 
      content: "Hi! I'm Aira. How are you feeling today? 😊",
      mood: 'welcome',
      suggestedActivity: null,
      sentiment: { emotion: 'neutral', responseStyle: 'neutral' }
    }]);
  };
  const showHero = messages.length === 1 && messages[0].role === 'assistant' && messages[0].mood === 'welcome';
  const airaAvatar = '/image/Aira.png';
  const airaHello = '/image/Aira%20hello.png';

  // Quick actions
  function sendQuickPrompt(text) {
    setInput(text);
    // slight delay to allow setState, then submit
    setTimeout(() => {
      const evt = { preventDefault: () => {} };
      sendMessage(evt);
    }, 0);
  }

  return (
    <Layout>
      <div className="min-h-screen flex bg-gradient-to-b from-pink-50 via-white to-purple-50 cursor-none">
        {/* Sidebar */}
        <aside className="w-14 md:w-16 bg-white/70 backdrop-blur-xl border-r border-black/5 flex flex-col justify-between items-center py-5 z-50 relative">
          {/* Top Logo button (click to home) */}
          <Link href="/" className="group relative">
            <div className="relative w-12 h-12">
              <Image src="/image/Logo%20Black.png" alt="ClarityAI" fill style={{ objectFit: 'contain' }} />
            </div>
            <span className="absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition z-50">Home</span>
          </Link>

          {/* Icon stack */}
          <nav className="flex flex-col items-center gap-4">
            <button onClick={startNewChat} className="group relative w-12 h-12 grid place-items-center rounded-lg bg-white border border-black/10 shadow hover:shadow-md cursor-pointer">
              <Image src="/image/new%20chat.png" alt="New Chat" width={24} height={24} />
              <span className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition z-50">New Chat</span>
            </button>
            <Link href="/" className="group relative w-12 h-12 grid place-items-center rounded-lg bg-white border border-black/10 shadow hover:shadow-md cursor-pointer">
              <Image src="/image/home.png" alt="Home" width={24} height={24} />
              <span className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition z-50">Home</span>
            </Link>
            <button onClick={logout} className="group relative w-12 h-12 grid place-items-center rounded-lg bg-white border border-black/10 shadow hover:shadow-md cursor-pointer">
              <Image src="/image/logout.png" alt="Log out" width={24} height={24} />
              <span className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 rounded bg-black text-white text-xs opacity-0 group-hover:opacity-100 transition z-50">Log out</span>
            </button>
          </nav>

          {/* Aira avatar slightly above bottom */}
          <div className="mb-4">
            <Image src={airaAvatar} alt="Aira" width={44} height={44} className="rounded-full ring-2 ring-black/10" />
          </div>
        </aside>

        {/* Main Chat Area */}
        <div className="flex-1">
          <Navbar />
          <div className="px-4 md:px-8 py-6 md:py-8">
            <div className="relative z-10 bg-white/80 rounded-3xl border border-black/10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden min-h-[72vh]">
              {showHero ? (
                <div className="h-[72vh] grid place-items-center p-6 text-center">
                  <div className="space-y-6 max-w-2xl">
                    <div className="mx-auto w-28 h-28 relative">
                      <Image src={airaHello} alt="Aira says hello" fill style={{ objectFit: 'contain' }} />
                    </div>
                    <h1 className="text-[32px] md:text-[40px] font-extrabold tracking-tight">
                      <span className="bg-gradient-to-b from-black to-black/70 bg-clip-text text-transparent">Hi there, friend</span>
                    </h1>
                    <p className="text-black/70">How can I support you today?</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center px-4">
                      <button onClick={() => sendQuickPrompt('Guide me through a calming breathing exercise')} className="w-full max-w-xs h-24 rounded-2xl bg-white border border-black/10 shadow flex items-center justify-center text-sm font-medium text-black hover:shadow-md transition cursor-pointer">Guided Breathing</button>
                      <button onClick={() => sendQuickPrompt('Give me a gentle journaling prompt for reflection')} className="w-full max-w-xs h-24 rounded-2xl bg-white border border-black/10 shadow flex items-center justify-center text-sm font-medium text-black hover:shadow-md transition cursor-pointer">Journaling</button>
                      <button onClick={() => sendQuickPrompt('Play soothing sound therapy for relaxation')} className="w-full max-w-xs h-24 rounded-2xl bg-white border border-black/10 shadow flex items-center justify-center text-sm font-medium text-black hover:shadow-md transition cursor-pointer">Sound Therapy</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div 
                  ref={chatContainerRef}
                  className="h-[60vh] overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent"
                >
                  {messages.map((m, i) => (
                    <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {m.role === 'assistant' && (
                        <Image src={airaAvatar} alt="Aira" width={36} height={36} className="rounded-full mt-1" />
                      )}
                      <div 
                      className={`max-w-[80%] ${
                          m.role === 'user' ? 'bg-white text-black border border-black/10' : 'bg-white/90 text-black'
                        } rounded-2xl px-6 py-4 shadow-lg ${m.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {m.role === 'assistant' && m.mood && m.mood !== 'welcome' && (
                            <span className="text-xs bg-black/10 px-2 py-1 rounded">
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
                            <span className={`text-xs px-2 py-1 rounded text-black/70`}>
                              {m.sentiment.emotion} ({Math.round(m.sentiment.confidence * 100)}%)
                            </span>
                          )}
                        </div>
                        <div className="whitespace-pre-wrap">{m.content}</div>

                        {m.suggestedActivity && m.suggestedActivity !== 'crisis_support' && (
                          <div className="mt-2 p-2 bg-black/5 rounded border border-black/10">
                            <div className="text-xs font-semibold text-black mb-1">
                              💡 Suggested Activity:
                            </div>
                            <div className="text-sm text-black/80">
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
                      <div className="bg-white/90 text-[#141126] rounded-2xl px-6 py-4 shadow-lg rounded-tl-sm">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-[#141126]/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-[#141126]/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-[#141126]/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Input Container with tabs */}
              <div className="relative border-t border-black/10">
                {/* Tabs */}
                <div className="flex items-center justify-center gap-6 text-sm text-black/60 py-3">
                  <button className="font-semibold text-black cursor-pointer">General</button>
                  <button className="cursor-pointer">Text</button>
                  <button className="cursor-pointer">Media</button>
                  <button className="cursor-pointer">Music</button>
                  <button className="cursor-pointer">Analytics</button>
                </div>
                <form onSubmit={sendMessage} className="flex px-6 pb-6">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Can we travel at the speed of light?"
                    className="w-full bg-white border border-black/10 rounded-full px-6 py-4 text-black placeholder-black/40 caret-black 
                      focus:outline-none focus:ring-2 focus:ring-black/10 text-base font-normal shadow"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="-ml-14 mt-2 mr-2 w-10 h-10 rounded-full flex items-center justify-center
                      bg-white border border-black/10 hover:bg-black/5 transition disabled:opacity-50 cursor-pointer"
                  >
                    <Image src="/image/sent.png" alt="Send" width={16} height={16} />
                  </button>
                </form>
              </div>
            </div>

            {/* Helper Text */}
            <div className="text-xs text-black/60 text-center mt-3">
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
        {/* Custom cursor that blends with background */}
        <CursorBlend />
      </div>
    </Layout>
  );
}
