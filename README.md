ClarityAI – Youth Mental Wellness Web App (GenAI Hackathon)

Tagline: "Your safe digital space for mental clarity, emotional balance, and resilience."

Overview

ClarityAI is a Generative AI–powered web app to support youth mental wellness (ages 16–25). It combines an empathetic AI chat companion, journaling with AI reframes, mood tracking + analytics, guided micro-activities, a resource library, gamification, and crisis detection with helpline redirection.

Core Features

- AI Chat Companion: ✅ Empathetic chatbot with mood detection and Hinglish responses. Active listening + CBT-style prompts. Anonymous 24/7 support.
- Mood Tracking Dashboard: ✅ Emoji/slider check-ins and optional text; sentiment analysis via Vertex AI (TODO); weekly/monthly trends.
- AI Journaling Assistant: ✅ Guided prompts; AI reframes negative → positive reflections; secure emotional diary.
- Guided Micro-Activities: ✅ Suggested dynamically based on mood and AI responses.
- Resource Library: ✅ Curated blogs, audio, videos; AI-personalized suggestions (TODO).
- Gamification Layer: ✅ Streaks, badges, and reward points. Encourage daily engagement.
- Crisis Detection + Helplines: ✅ Detects self-harm cues; fail-safe redirect to helplines (AASRA, Vandrevala Foundation).

Tech Stack

- Frontend: Next.js + React (JavaScript), TailwindCSS
- Backend: Node.js + Express.js (JavaScript)
- Database: MongoDB or PostgreSQL (prototype uses in-memory stubs). TODO: Implement persistence.
- AI/ML: Gemini API or Hugging Face for chat; Vertex AI for sentiment; LangChain for orchestration; Imagen (optional) for visuals.
- Auth: Firebase Auth (email/password + anonymous login)
- Deployment: Vercel/Netlify (frontend), Google Cloud Run (backend)

System Flow

User → Frontend (Next.js + Tailwind) → Firebase Auth (Login/Anon) → Backend (Express APIs) → Database (MongoDB/Postgres) → AI Layer (Gemini/HF, Vertex, LangChain) → Crisis Helplines/Resources

Monorepo Structure

```
ClarityAI/
  frontend/                # Next.js + Tailwind app (JS/JSX only)
  backend/                 # Express API server (JS only)
  README.md
  ENVIRONMENT.md
```

Setup

1) Frontend

- Copy environment values into your system (see ENVIRONMENT.md). Do not commit secrets.
- Install deps and run:
  - npm install
  - npm run dev

2) Backend

- Set environment variables (see ENVIRONMENT.md). Fill keys for Gemini/Vertex and DB if used.
- Install deps and run:
  - npm install
  - npm run dev

Environment Variables

See ENVIRONMENT.md for all variables and notes. Avoid creating .env files in this repo if your environment blocks them.

Current Implementation Status

✅ COMPLETED:
- Repository structure and documentation
- Next.js + Tailwind frontend with responsive design
- Express backend with modular routes
- Empathetic AI chat companion with mood detection
- Mood tracking with gamification integration
- Journaling system with AI reframe suggestions
- Resource library with curated content
- Gamification system (streaks, badges, points)
- Crisis detection middleware with helpline integration
- Profile page with stats and achievements

🔄 IN PROGRESS:
- AI integration (Gemini/Hugging Face + LangChain)
- Vertex AI sentiment analysis
- Database persistence (MongoDB/Postgres)

📋 TODO:
- Firebase Auth configuration
- Enhanced crisis detection UI banners
- Advanced AI personalization
- Production deployment setup

Important Implementation Notes

- TODO comments mark where external APIs, SDKs, keys, or infra must be added:
  - Gemini API / Hugging Face model provider
  - Vertex AI sentiment analysis
  - LangChain pipelines
  - Firebase Auth config
  - DB choice + connection (MongoDB/Postgres)
- Modular design: chat, mood, journaling, resources, and gamification are separable modules.
- Crisis detection includes a fail-safe helpline fallback at both API and UI levels.

Hackathon Timeline (Execution Plan)

- Day 1–2: ✅ Figma design + Firebase Auth setup; UI mockups; login/anon.
- Day 3–4: ✅ AI Chat Companion (basic empathetic responses implemented).
- Day 5: ✅ Mood Tracking + basic sentiment dashboard.
- Day 6: ✅ Journaling Assistant + AI reframes.
- Day 7: ✅ Resource Library + gamification badges.
- Day 8: ✅ Crisis detection + helpline integration.
- Day 9: 🔄 Polish, pitch deck, demo video.

Scripts

- Frontend: `npm run dev` → development server on port 3000 by default.
- Backend: `npm run dev` → development server on port 8080 by default.

Safety

- Crisis safety: App surfaces helplines when risky language is detected; see `backend/src/middleware/crisis.js` and UI banners.
- Gamification encourages positive engagement without pressure.

Demo Features

The current prototype includes:
- Working chat interface with empathetic responses
- Mood tracking with points and streaks
- Journaling with AI reframe suggestions
- Resource library with curated wellness content
- Profile page showing achievements and stats
- Crisis detection with helpline information



