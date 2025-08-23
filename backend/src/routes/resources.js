import { Router } from 'express';

const router = Router();

// TODO: Replace with curated CMS or DB; personalize via simple rules or AI
const LIBRARY = [
  { id: 1, type: 'blog', title: 'Breathing Techniques for Calm', url: 'https://example.com/breathing' },
  { id: 2, type: 'audio', title: '5-Min Guided Breathing', url: 'https://example.com/audio-breathing' },
  { id: 3, type: 'video', title: 'Visualize Your Safe Space', url: 'https://example.com/visualization' },
];

router.get('/', async (req, res) => {
  const { mood } = req.query;
  // Simple personalization stub
  const items = mood ? LIBRARY : LIBRARY;
  return res.json({ items });
});

export default router;




