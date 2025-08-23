import { Router } from 'express';

const router = Router();

// In-memory store for prototype. TODO: Replace with MongoDB/Postgres
const userStats = new Map();

// Initialize user stats
function getUserStats(userId) {
  if (!userStats.has(userId)) {
    userStats.set(userId, {
      userId,
      points: 0,
      streak: 0,
      maxStreak: 0,
      badges: [],
      lastActivity: null,
      totalActivities: 0
    });
  }
  return userStats.get(userId);
}

// Award points and update streaks
function awardPoints(userId, activity, points = 10) {
  const stats = getUserStats(userId);
  const now = Date.now();
  const today = new Date(now).toDateString();
  const lastActivity = stats.lastActivity ? new Date(stats.lastActivity).toDateString() : null;
  
  // Check if this is a new day
  if (lastActivity !== today) {
    if (lastActivity && isConsecutiveDay(lastActivity, today)) {
      stats.streak += 1;
    } else {
      stats.streak = 1;
    }
    stats.maxStreak = Math.max(stats.maxStreak, stats.streak);
  }
  
  stats.points += points;
  stats.lastActivity = now;
  stats.totalActivities += 1;
  
  // Check for badges
  checkAndAwardBadges(stats);
  
  return stats;
}

function isConsecutiveDay(lastDate, currentDate) {
  const last = new Date(lastDate);
  const current = new Date(currentDate);
  const diffTime = current - last;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

function checkAndAwardBadges(stats) {
  const newBadges = [];
  
  // Streak badges
  if (stats.streak >= 7 && !stats.badges.includes('week_warrior')) {
    newBadges.push('week_warrior');
  }
  if (stats.streak >= 30 && !stats.badges.includes('month_master')) {
    newBadges.push('month_master');
  }
  
  // Activity badges
  if (stats.totalActivities >= 10 && !stats.badges.includes('first_steps')) {
    newBadges.push('first_steps');
  }
  if (stats.totalActivities >= 50 && !stats.badges.includes('dedicated')) {
    newBadges.push('dedicated');
  }
  
  // Points badges
  if (stats.points >= 100 && !stats.badges.includes('century_club')) {
    newBadges.push('century_club');
  }
  
  stats.badges.push(...newBadges);
  return newBadges;
}

// Routes
router.post('/activity', async (req, res) => {
  const { userId = 'anon', activity, points } = req.body || {};
  
  try {
    const stats = awardPoints(userId, activity, points);
    return res.json({ 
      ok: true, 
      stats,
      message: `Great job! You earned ${points || 10} points. Keep going! 🌟`
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update stats' });
  }
});

router.get('/stats/:userId', async (req, res) => {
  const { userId } = req.params;
  
  try {
    const stats = getUserStats(userId);
    return res.json({ stats });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get stats' });
  }
});

router.get('/leaderboard', async (req, res) => {
  try {
    const allStats = Array.from(userStats.values())
      .sort((a, b) => b.points - a.points)
      .slice(0, 10)
      .map((stats, index) => ({
        rank: index + 1,
        userId: stats.userId,
        points: stats.points,
        streak: stats.streak,
        maxStreak: stats.maxStreak
      }));
    
    return res.json({ leaderboard: allStats });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get leaderboard' });
  }
});

export default router;

