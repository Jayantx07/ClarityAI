import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Check if Firebase config is available
const hasFirebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

let app = null;
let auth = null;
let db = null;
let analytics = null;

if (hasFirebaseConfig) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  };

  try {
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase Authentication and get a reference to the service
    auth = getAuth(app);
    
    // Initialize Cloud Firestore and get a reference to the service
    db = getFirestore(app);
    
    // Initialize Analytics (only in browser environment)
    if (typeof window !== 'undefined') {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.warn('Firebase initialization failed:', error.message);
  }
} else {
  console.warn('Firebase configuration not found. Please set up your .env.local file with Firebase credentials.');
}

export { auth, db, analytics };
export default app;
