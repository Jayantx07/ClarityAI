import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInAnonymously,
  signOut,
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../lib/firebase';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    if (!auth) {
      console.warn('Firebase Auth not available');
      return Promise.reject(new Error('Firebase Auth not configured'));
    }
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    if (!auth) {
      console.warn('Firebase Auth not available');
      return Promise.reject(new Error('Firebase Auth not configured'));
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginAnonymously = () => {
    if (!auth) {
      console.warn('Firebase Auth not available');
      return Promise.reject(new Error('Firebase Auth not configured'));
    }
    return signInAnonymously(auth);
  };

  const logout = () => {
    if (!auth) {
      console.warn('Firebase Auth not available');
      return Promise.reject(new Error('Firebase Auth not configured'));
    }
    return signOut(auth);
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    loginAnonymously,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
