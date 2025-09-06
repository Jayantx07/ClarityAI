import { useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Gamification({ userId = 'anon' }) {
  const [stats, setStats] = useState({
    points: 0,
    streak: 0,
    badges: [],
    level: 1,
    totalEntries: 0,
    totalMoods: 0,
    totalChats: 0
  });

  const [recentAchievements, setRecentAchievements] = useState([]);

  const badges = [
    { id: 'first_entry', name: 'First Steps', description: 'Complete your first journal entry', icon: '📝', points: 10 },
    { id: 'mood_tracker', name: 'Mood Master', description: 'Log 7 consecutive days of mood', icon: '📊', points: 25 },
    { id: 'streak_7', name: 'Week Warrior', description: '7-day activity streak', icon: '🔥', points: 50 },
    { id: 'streak_30', name: 'Monthly Master', description: '30-day activity streak', icon: '⭐', points: 200 },
    { id: 'chat_enthusiast', name: 'Chat Enthusiast', description: 'Have 10 conversations', icon: '💬', points: 30 },
    { id: 'breathing_buddy', name: 'Breathing Buddy', description: 'Complete 5 breathing exercises', icon: '🧘', points: 40 },
    { id: 'creative_soul', name: 'Creative Soul', description: 'Create 3 paintings', icon: '🎨', points: 35 },
    { id: 'wellness_warrior', name: 'Wellness Warrior', description: 'Use all features', icon: '🛡️', points: 100 }
  ];

  useEffect(() => {
    loadStats();
  }, [userId]);

  const loadStats = async () => {
    // In a real app, this would fetch from Firebase
    const savedStats = localStorage.getItem(`clarity-ai-stats-${userId}`);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  };

  const saveStats = (newStats) => {
    setStats(newStats);
    localStorage.setItem(`clarity-ai-stats-${userId}`, JSON.stringify(newStats));
  };

  const addPoints = (points, reason) => {
    const newStats = {
      ...stats,
      points: stats.points + points,
      level: Math.floor((stats.points + points) / 100) + 1
    };
    saveStats(newStats);
    
    // Show achievement notification
    showAchievement(reason, points);
  };

  const checkBadges = (action) => {
    const newBadges = [];
    
    switch (action) {
      case 'journal_entry':
        if (stats.totalEntries === 0 && !stats.badges.includes('first_entry')) {
          newBadges.push('first_entry');
        }
        break;
      case 'mood_log':
        if (stats.totalMoods >= 7 && !stats.badges.includes('mood_tracker')) {
          newBadges.push('mood_tracker');
        }
        break;
      case 'chat':
        if (stats.totalChats >= 10 && !stats.badges.includes('chat_enthusiast')) {
          newBadges.push('chat_enthusiast');
        }
        break;
      case 'breathing':
        if (!stats.badges.includes('breathing_buddy')) {
          newBadges.push('breathing_buddy');
        }
        break;
      case 'painting':
        if (!stats.badges.includes('creative_soul')) {
          newBadges.push('creative_soul');
        }
        break;
    }

    if (newBadges.length > 0) {
      const newStats = {
        ...stats,
        badges: [...stats.badges, ...newBadges]
      };
      saveStats(newStats);
      
      newBadges.forEach(badgeId => {
        const badge = badges.find(b => b.id === badgeId);
        showAchievement(`Badge Unlocked: ${badge.name}`, badge.points);
      });
    }
  };

  const showAchievement = (message, points) => {
    const achievement = {
      id: Date.now(),
      message,
      points,
      timestamp: new Date()
    };
    
    setRecentAchievements(prev => [achievement, ...prev.slice(0, 4)]);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      setRecentAchievements(prev => prev.filter(a => a.id !== achievement.id));
    }, 5000);
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastActivity = localStorage.getItem(`clarity-ai-last-activity-${userId}`);
    
    if (lastActivity !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActivity === yesterday.toDateString()) {
        // Continue streak
        const newStats = { ...stats, streak: stats.streak + 1 };
        saveStats(newStats);
        
        if (stats.streak + 1 === 7 && !stats.badges.includes('streak_7')) {
          checkBadges('streak_7');
        }
        if (stats.streak + 1 === 30 && !stats.badges.includes('streak_30')) {
          checkBadges('streak_30');
        }
      } else {
        // Reset streak
        const newStats = { ...stats, streak: 1 };
        saveStats(newStats);
      }
      
      localStorage.setItem(`clarity-ai-last-activity-${userId}`, today);
    }
  };

  const recordActivity = (type) => {
    updateStreak();
    
    const newStats = {
      ...stats,
      [`total${type.charAt(0).toUpperCase() + type.slice(1)}s`]: stats[`total${type.charAt(0).toUpperCase() + type.slice(1)}s`] + 1
    };
    saveStats(newStats);
    
    // Add points based on activity
    const pointValues = {
      journal_entry: 5,
      mood_log: 3,
      chat: 2,
      breathing: 8,
      painting: 10
    };
    
    addPoints(pointValues[type] || 1, `${type.replace('_', ' ')} completed`);
    checkBadges(type);
  };

  const getProgressToNextLevel = () => {
    const currentLevelPoints = (stats.level - 1) * 100;
    const nextLevelPoints = stats.level * 100;
    const progress = ((stats.points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints)) * 100;
    return Math.min(progress, 100);
  };

  return {
    stats,
    badges: badges.filter(badge => stats.badges.includes(badge.id)),
    availableBadges: badges.filter(badge => !stats.badges.includes(badge.id)),
    recentAchievements,
    recordActivity,
    getProgressToNextLevel
  };
}

export function AchievementNotification({ achievement, onClose }) {
  useEffect(() => {
    if (achievement) {
      gsap.fromTo('.achievement-notification', 
        { x: 300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [achievement]);

  if (!achievement) return null;

  return (
    <div className="achievement-notification fixed top-4 right-4 z-50 bg-gradient-to-r from-brand to-brand-dark text-white p-4 rounded-lg shadow-lg max-w-sm">
      <div className="flex items-center gap-3">
        <div className="text-2xl">🎉</div>
        <div>
          <div className="font-semibold">{achievement.message}</div>
          <div className="text-sm opacity-90">+{achievement.points} points</div>
        </div>
        <button
          onClick={onClose}
          className="ml-auto text-white/60 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
