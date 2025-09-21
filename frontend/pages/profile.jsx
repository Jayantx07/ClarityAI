import { useEffect, useRef, useState } from 'react';
import { Layout, Navbar } from '../components/layout';
import { Button, Card } from '../components/ui';
import Gamification, { AchievementNotification } from '../components/Gamification';
import { ensureAnonymousAuth } from '../lib/firebaseClient';

export default function ProfilePage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentAchievement, setCurrentAchievement] = useState(null);
  const [displayName, setDisplayName] = useState('Explorer');
  const [bio, setBio] = useState("On a journey to clarity and calm ✨");
  const [avatar, setAvatar] = useState('/image/Aira.png');
  const fileRef = useRef(null);

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

  function selectAvatar() {
    fileRef.current?.click();
  }

  function handleAvatarChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setAvatar(url);
  }

  if (loading) {
    return (
      <Layout>
        <Navbar />
        <main className="mx-auto max-w-4xl px-4 py-6">
          <div className="text-center">Loading your profile...</div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#110d2a] via-[#1d1649] to-[#1c9fb4] opacity-90" />
        <div className="absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-fuchsia-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-14">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="relative group">
              <img src={avatar} alt="Avatar" className="h-40 w-40 rounded-2xl ring-2 ring-white/20 object-cover shadow-2xl" />
              <button onClick={selectAvatar} className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold shadow group-hover:scale-105 transition cursor-pointer">Change</button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>
            <div className="flex-1 min-w-0 text-white">
              <input value={displayName} onChange={(e)=>setDisplayName(e.target.value)} className="w-full bg-transparent text-4xl md:text-5xl font-extrabold tracking-tight focus:outline-none" />
              <textarea value={bio} onChange={(e)=>setBio(e.target.value)} rows={2} className="w-full mt-2 bg-white/5 text-white/90 placeholder-white/50 rounded-xl px-4 py-3 border border-white/10 focus:outline-none focus:ring-2 focus:ring-white/20" />
              {stats && (
                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Level {stats.level}</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">{stats.points} pts</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">Streak {stats.streak}d</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="relative mx-auto max-w-6xl px-6 -mt-8 pb-20">
        {stats && (
          <>
            {/* Glass Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5 shadow-xl">
                <div className="text-white/70 text-sm">Day Streak</div>
                <div className="text-3xl font-extrabold text-white mt-1">{stats.streak}</div>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5 shadow-xl">
                <div className="text-white/70 text-sm">Journal Entries</div>
                <div className="text-3xl font-extrabold text-white mt-1">{stats.totalEntries}</div>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5 shadow-xl">
                <div className="text-white/70 text-sm">Mood Logs</div>
                <div className="text-3xl font-extrabold text-white mt-1">{stats.totalMoods}</div>
              </div>
              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-5 shadow-xl">
                <div className="text-white/70 text-sm">Chat Sessions</div>
                <div className="text-3xl font-extrabold text-white mt-1">{stats.totalChats}</div>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-8 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/15 p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="text-white font-semibold">Progress to next level</div>
                <div className="text-white/80 text-sm">{stats.points % 100}/100</div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-400" style={{ width: `${gamification.getProgressToNextLevel()}%` }} />
              </div>
            </div>

            {/* Achievements strip */}
            <div className="mt-10 rounded-2xl bg-white/10 border border-white/15 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">Achievements</h3>
                <div className="text-white/60 text-sm">{gamification.badges.length} earned</div>
              </div>
              {gamification.badges.length > 0 ? (
                <div className="flex items-stretch gap-4 overflow-x-auto pb-2">
                  {gamification.badges.map((badge) => (
                    <div key={badge.id} className="min-w-[220px] rounded-xl bg-white/10 border border-white/10 p-4 flex items-center gap-3">
                      <div className="text-3xl">{badge.icon}</div>
                      <div className="min-w-0">
                        <div className="text-white font-medium truncate">{badge.name}</div>
                        <div className="text-white/60 text-xs line-clamp-2">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-white/60 py-6">No badges yet. Keep using the app to earn them!</div>
              )}
            </div>

            {/* Activity timeline */}
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 rounded-2xl bg-white/10 border border-white/15 p-6">
                <h3 className="text-white font-semibold mb-4">Recent Activity</h3>
                <ul className="space-y-4">
                  {[
                    { icon: '💬', title: 'Chatted with Aira', time: '2h ago' },
                    { icon: '🧠', title: 'Completed breathing exercise', time: '1d ago' },
                    { icon: '📝', title: 'Journaled thoughts', time: '2d ago' },
                    { icon: '🎵', title: 'Played sound therapy', time: '3d ago' },
                  ].map((it, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-lg bg-white/10 grid place-items-center text-lg">{it.icon}</div>
                      <div>
                        <div className="text-white">{it.title}</div>
                        <div className="text-white/60 text-xs">{it.time}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Settings */}
              <div className="rounded-2xl bg-white/10 border border-white/15 p-6">
                <h3 className="text-white font-semibold mb-4">Settings</h3>
                <div className="space-y-4 text-white/90">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Remind me to check-in daily</span>
                    <input type="checkbox" defaultChecked className="accent-black h-4 w-4" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Enable sound therapy</span>
                    <input type="checkbox" className="accent-black h-4 w-4" />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Dark mode</span>
                    <input type="checkbox" defaultChecked className="accent-black h-4 w-4" />
                  </label>
                  <div className="pt-2">
                    <Button size="sm" onClick={()=>window.alert('Preferences saved ✔')}>Save Preferences</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
              <button onClick={()=>window.location.href='/mood'} className="rounded-2xl bg-white text-black font-semibold py-3 shadow cursor-pointer hover:shadow-md">📊 Log Mood</button>
              <button onClick={()=>window.location.href='/journal'} className="rounded-2xl bg-white text-black font-semibold py-3 shadow cursor-pointer hover:shadow-md">📝 Journal</button>
              <button onClick={()=>window.location.href='/chat'} className="rounded-2xl bg-white text-black font-semibold py-3 shadow cursor-pointer hover:shadow-md">💬 Chat</button>
              <button onClick={()=>window.location.href='/resources'} className="rounded-2xl bg-white text-black font-semibold py-3 shadow cursor-pointer hover:shadow-md">📚 Resources</button>
            </div>
          </>
        )}
      </main>

      {/* Achievement Notifications */}
      <AchievementNotification 
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />
    </Layout>
  );
}

