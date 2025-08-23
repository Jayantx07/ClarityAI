import { Router } from 'express';

const router = Router();

// In-memory store for prototype. TODO: Replace with MongoDB/Postgres
const moodLogs = [];

router.post('/log', async (req, res) => {
  const { userId = 'anon', mood, note } = req.body || {};
  const entry = { id: moodLogs.length + 1, userId, mood, note, ts: Date.now() };
  moodLogs.push(entry);
  
  // TODO: Call Vertex AI for sentiment on note, store score with entry
  
  // Award gamification points for mood logging
  try {
    const gamificationRes = await fetch(`${process.env.API_BASE_URL || 'http://localhost:8080'}/api/gamification/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId, 
        activity: 'mood_log', 
        points: 15 
      })
    });
    
    if (gamificationRes.ok) {
      const gamificationData = await gamificationRes.json();
      console.log(`Awarded ${gamificationData.stats.points} points to ${userId} for mood logging`);
    }
  } catch (error) {
    console.error('Failed to award gamification points:', error);
  }
  
  return res.json({ ok: true, entry });
});

router.get('/trend', async (req, res) => {
  const { userId = 'anon' } = req.query;
  const logs = moodLogs.filter(l => l.userId === userId);
  // TODO: Aggregate by week/month and include Vertex sentiment trends
  return res.json({ logs });
});

export default router;



