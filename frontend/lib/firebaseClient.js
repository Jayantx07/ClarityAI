// Firebase client with graceful fallback when config is missing
// Import only when needed to keep bundle small.
// Anonymous auth should be enabled in Firebase console.
// Values must be provided via NEXT_PUBLIC_* env vars.

import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// Check if Firebase config is available
const hasFirebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const firebaseConfig = hasFirebaseConfig ? {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
} : null;

export function getFirebase() {
  if (!hasFirebaseConfig) {
    console.warn('Firebase configuration not found. Please set up your .env.local file.');
    return { app: null, auth: null };
  }

  try {
    const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    return { app, auth };
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message);
    return { app: null, auth: null };
  }
}

export async function ensureAnonymousAuth() {
  const { auth } = getFirebase();
  
  if (!auth) {
    console.warn('Firebase Auth not available. Running in offline mode.');
    return null;
  }

  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        try { 
          await signInAnonymously(auth); 
        } catch (e) {
          console.warn('Anonymous auth failed:', e.message);
        }
      }
      resolve(auth.currentUser);
    });
  });
}




