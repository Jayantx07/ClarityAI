# 🔥 Firebase Setup Guide for ClarityAI

## Step 1: Get Firebase Config

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click on your **ClarityAI** project
3. Click **⚙️ Settings** → **Project settings**
4. Scroll to **"Your apps"** section
5. Click **"Add app"** → **Web app** (</> icon)
6. Name it "ClarityAI Web"
7. **Copy the config object**

## Step 2: Create Environment File

Create a file called `.env.local` in the `frontend` folder with:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Step 3: Enable Authentication

1. In Firebase Console → **Authentication**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Enable **"Anonymous"** authentication
5. Click **"Save"**

## Step 4: Enable Firestore

1. In Firebase Console → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select a location close to you
5. Click **"Done"**

## Step 5: Restart Development Server

```bash
npm run dev
```

## Example Config

Replace the values in `.env.local` with your actual Firebase config:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC1234567890abcdef
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=clarityai-12345.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=clarityai-12345
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=clarityai-12345.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

## Troubleshooting

- **Error: "auth/invalid-api-key"** → Check your API key in `.env.local`
- **Error: "Firebase not configured"** → Make sure `.env.local` exists and has correct values
- **App works but no data saves** → Check Firestore rules and authentication setup

## Current Status

✅ **App works without Firebase** (offline mode)
✅ **Graceful fallback** when Firebase is not configured
✅ **Local storage** for gamification and mood tracking
✅ **All features functional** without database

Once you add Firebase config, you'll get:
- ✅ **User authentication**
- ✅ **Data persistence**
- ✅ **Real-time sync**
- ✅ **Cloud storage**
