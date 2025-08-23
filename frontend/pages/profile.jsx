import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import { apiGet, apiPost } from '../lib/api';
import { ensureAnonymousAuth } from '../lib/firebaseClient';

export default function ProfilePage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    ensureAnonymousAuth(); 
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await apiGet('/api/gamification/stats/anon');
      setStats(data.stats);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  }

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
        <h2 className="text-2xl font-semibold">Your Profile</h2>
        
        {stats && (
          <>
            {/* Stats Overview */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="card text-center">
                <div className="text-2xl font-bold text-brand">{stats.points}</div>
                <div className="text-sm text-white/70">Total Points</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-brand">{stats.streak}</div>
                <div className="text-sm text-white/70">Current Streak</div>
              </div>
              <div className="card text-center">
                <div className="text-2xl font-bold text-brand">{stats.maxStreak}</div>
                <div className="text-sm text-white/70">Best Streak</div>
              </div>
            </div>

            {/* Badges */}
            <div className="card">
              <h3 className="font-semibold mb-4">Your Badges</h3>
              {stats.badges.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {stats.badges.map((badge, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded">
                      <span className="text-xl">{getBadgeIcon(badge)}</span>
                      <span className="text-sm">{getBadgeName(badge)}</span>
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

            {/* Activity Summary */}
            <div className="card">
              <h3 className="font-semibold mb-4">Activity Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Activities:</span>
                  <span className="font-semibold">{stats.totalActivities}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Activity:</span>
                  <span className="font-semibold">
                    {stats.lastActivity 
                      ? new Date(stats.lastActivity).toLocaleDateString()
                      : 'Never'
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="flex gap-3">
                <button 
                  onClick={() => window.location.href = '/mood'}
                  className="btn-primary text-sm"
                >
                  Log Mood
                </button>
                <button 
                  onClick={() => window.location.href = '/journal'}
                  className="btn-primary text-sm"
                >
                  Write Journal
                </button>
                <button 
                  onClick={() => window.location.href = '/chat'}
                  className="btn-primary text-sm"
                >
                  Chat
                </button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

