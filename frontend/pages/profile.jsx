import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Gamification, { AchievementNotification } from '../components/Gamification';
import { apiGet, apiPost } from '../lib/api';
import { ensureAnonymousAuth } from '../lib/firebaseClient';

export default function ProfilePage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  
  const gamification = Gamification({ userId: 'anon' });

  useEffect(() => { 
    ensureAnonymousAuth(); 
    loadStats();
  }, []);

  async function loadStats() {
    try {
      // Use gamification stats instead of API
      setStats(gamification.stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (gamification.recentAchievements.length > 0) {
      setCurrentAchievement(gamification.recentAchievements[0]);
    }
  }, [gamification.recentAchievements]);

  function getBadgeIcon(badge) {
    const badgeIcons = {
      'week_warrior': '🔥',
      'month_master': '👑',
      'first_steps': '🚀',
      'dedicated': '💎',
      'century_club': '🏆'
    };
    return badgeIcons[badge] || '⭐';
  }

  function getBadgeName(badge) {
    const badgeNames = {
      'week_warrior': 'Week Warrior',
      'month_master': 'Month Master',
      'first_steps': 'First Steps',
      'dedicated': 'Dedicated',
      'century_club': 'Century Club'
    };
    return badgeNames[badge] || badge;
  }

  if (loading) {
    return (
      <div>
        <Nav />
        <main className="mx-auto max-w-4xl px-4 py-6">
          <div className="text-center">Loading your profile...</div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      <main className="mx-auto max-w-4xl px-4 py-6 space-y-6">
        <h2 className="text-2xl font-semibold">Your Wellness Journey</h2>
        
        {stats && (
          <>
            {/* Level Progress */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">Level {stats.level}</h3>
                  <div className="text-sm text-white/70">Wellness Explorer</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-brand">{stats.points}</div>
                  <div className="text-sm text-white/70">Total Points</div>
                </div>
              </div>
              
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-brand to-brand-light h-2 rounded-full transition-all duration-500"
                  style={{ width: `${gamification.getProgressToNextLevel()}%` }}
                />
              </div>
              <div className="text-xs text-white/60 mt-1">
                {stats.points % 100}/100 points to next level
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-brand">{stats.streak}</div>
                <div className="text-sm text-white/70">Day Streak</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-brand">{stats.totalEntries}</div>
                <div className="text-sm text-white/70">Journal Entries</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-brand">{stats.totalMoods}</div>
                <div className="text-sm text-white/70">Mood Logs</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-brand">{stats.totalChats}</div>
                <div className="text-sm text-white/70">Chat Sessions</div>
              </div>
            </div>

            {/* Badges */}
            <div className="card">
              <h3 className="font-semibold mb-4">Achievements</h3>
              {gamification.badges.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gamification.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-brand/20">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{badge.name}</div>
                        <div className="text-xs text-white/60">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white/50 py-8">
                  <div className="text-4xl mb-2">🏆</div>
                  <div>No badges yet. Keep using the app to earn them!</div>
                </div>
              )}
            </div>

            {/* Available Badges */}
            {gamification.availableBadges.length > 0 && (
              <div className="card">
                <h3 className="font-semibold mb-4">Available Badges</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gamification.availableBadges.slice(0, 6).map((badge) => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 opacity-60">
                      <span className="text-2xl grayscale">{badge.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{badge.name}</div>
                        <div className="text-xs text-white/60">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold mb-4">Continue Your Journey</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button 
                  onClick={() => window.location.href = '/mood'}
                  className="btn-primary text-sm"
                >
                  📊 Log Mood
                </button>
                <button 
                  onClick={() => window.location.href = '/journal'}
                  className="btn-primary text-sm"
                >
                  📝 Journal
                </button>
                <button 
                  onClick={() => window.location.href = '/chat'}
                  className="btn-primary text-sm"
                >
                  💬 Chat
                </button>
                <button 
                  onClick={() => window.location.href = '/resources'}
                  className="btn-primary text-sm"
                >
                  📚 Resources
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Achievement Notifications */}
      <AchievementNotification 
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />
    </div>
  );
}

