🌿 ClarityAI – AI-Powered Mental Wellness Companion

Tagline: "Your empathetic, adaptive companion for stress, anxiety, and mood balance."

Overview

ClarityAI is an AI-driven mental wellness platform for students and professionals. It helps manage stress, anxiety, and mood fluctuations through a sentiment-aware chatbot that adapts its tone and recommendations, offering personalized wellness activities like sound therapy, painting, and breathing exercises.

Problem Statement

Mental health support is often expensive, inaccessible, and one-size-fits-all. ClarityAI provides an affordable, intelligent, and engaging solution that dynamically tailors wellness activities to each user's emotional state.

Key Features

- Sentiment-Aware Chatbot: Detects tone (stressed, bored, anxious, positive) and adapts response style (empathetic, motivational, uplifting). Recommends the most relevant activity based on emotional context.
- Intelligent Sound Therapy: Plays adaptive soundscapes using scientifically inspired frequencies (alpha for focus, theta for calm). Can trigger automatically when stress is sensed.
- Guided Breathing Exercises: Visual inhale–exhale sessions for calming anxiety.
- Painting Relief Mode: Digital canvas for creative expression when feeling restless, bored, or emotionally blocked.
- Mood Analytics Dashboard: Tracks daily mood changes and activity engagement over time.
- Resource Library: Curated wellness content with AI-personalized suggestions (planned).
- Crisis Detection + Helplines: Detects self-harm cues and surfaces helplines (AASRA, Vandrevala Foundation).

Tech Stack

- Frontend: Next.js (React) + TailwindCSS
- AI/NLP: Hugging Face Transformers for sentiment; Rasa for conversational flow (planned)
- Sound: Tone.js / Web Audio API
- Animations: GSAP + Lenis for smooth scroll and reveals
- Design: Figma / Framer for UI/UX prototype
- Backend: Node.js + Express (future scope)
- Database: Firebase (Firestore) for persistence
- Auth: Firebase Auth (email/password + anonymous login)
- Deployment: Vercel (frontend), Cloud Run (backend, optional)

How It Works

1) User chats with ClarityAI (e.g., "I'm feeling really anxious about exams").
2) Chatbot detects negative sentiment and responds empathetically: suggests a breathing exercise.
3) App launches guided breathing + calming sounds.
4) User engages in painting or journaling.
5) Mood dashboard tracks progress and patterns over time.

System Flow

User → Frontend (Next.js + Tailwind) → Firebase Auth → Firestore → Optional Backend (Express APIs) → AI Layer (Hugging Face + Rasa) → Crisis Helplines/Resources

Monorepo Structure

```
ClarityAI/
  frontend/                # Next.js + Tailwind app (JS/JSX only)
  backend/                 # Express API server (JS only)
  README.md
  ENVIRONMENT.md
```

Setup

Frontend
- Copy environment values into your system (see ENVIRONMENT.md). Do not commit secrets.
- Install deps and run:
  - npm install
  - npm run dev

Backend (optional for now)
- Set environment variables (see ENVIRONMENT.md).
- Install deps and run:
  - npm install
  - npm run dev

Environment Variables

See ENVIRONMENT.md for all variables and notes. Avoid committing secrets.

Current Implementation Status

✅ COMPLETED:
- Repository structure and documentation
- Next.js + Tailwind frontend with responsive design and Amaterasu-inspired landing animations
- Express backend with modular routes
- Empathetic AI chat companion (UI) with mood features
- Mood tracking with gamification integration
- Journaling UI and resources
- Crisis detection middleware with helpline integration

🔄 IN PROGRESS:
- AI integration (Hugging Face + Rasa)
- Sentiment analysis via Transformers
- Firebase (Firestore) persistence

📋 TODO:
- Firebase Auth + Firestore configuration
- Advanced AI personalization
- Production deployment setup

Safety

- Crisis safety: App surfaces helplines when risky language is detected; see `backend/src/middleware/crisis.js` and UI banners.
- Gamification encourages positive engagement without pressure.

Why ClarityAI Stands Out

- Emotionally adaptive — not a static wellness checklist.
- Bridges AI + creativity + wellness in one experience.
- Designed for real-world accessibility (students, professionals).

Design Inspiration

Landing motion and aesthetic draw inspiration from Amaterasu’s site for smooth, refined storytelling and subtle depth effects.

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



