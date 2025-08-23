import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import crisisMiddleware from './middleware/crisis.js';
import chatRouter from './routes/chat.js';
import moodRouter from './routes/mood.js';
import journalRouter from './routes/journal.js';
import resourcesRouter from './routes/resources.js';
import gamificationRouter from './routes/gamification.js';

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json({ limit: '1mb' }));

// Crisis detection at API boundary as a safety net
app.use(crisisMiddleware);

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/chat', chatRouter);
app.use('/api/mood', moodRouter);
app.use('/api/journal', journalRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/gamification', gamificationRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`ClarityAI backend running on http://localhost:${port}`);
});



