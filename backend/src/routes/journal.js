import { Router } from 'express';

const router = Router();

// In-memory store for prototype. TODO: Replace with secure DB storage
const journals = [];

router.post('/entry', async (req, res) => {
  const { userId = 'anon', text } = req.body || {};
  const entry = { id: journals.length + 1, userId, text, ts: Date.now() };
  journals.push(entry);
  
  // TODO: Use AI to reframe negative thoughts → positive reflections via Gemini/Vertex
  const reframe = 'Remember to be kind to yourself. You are doing your best.';
  
  // Award gamification points for journaling
  try {
    const gamificationRes = await fetch(`${process.env.API_BASE_URL || 'http://localhost:8080'}/api/gamification/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        userId, 
        activity: 'journal_entry', 
        points: 20 
      })
    });
    
    if (gamificationRes.ok) {
      const gamificationData = await gamificationRes.json();
      console.log(`Awarded ${gamificationData.stats.points} points to ${userId} for journaling`);
    }
  } catch (error) {
    console.error('Failed to award gamification points:', error);
  }
  
  return res.json({ ok: true, entry, reframe });
});

router.get('/list', async (req, res) => {
  const { userId = 'anon' } = req.query;
  const list = journals.filter(j => j.userId === userId).slice(-50);
  return res.json({ entries: list });
});

export default router;



