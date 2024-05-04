'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/app/auth/config';
import { signInWithPhoneNumber, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const signInWithPhone = async (phoneNumber) => {
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber);
      // Handle confirmation result if needed
    } catch (error) {
      console.error('Error signing in with phone number:', error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const value = {
    user,
    signInWithPhone,
    logOut,
    uid: user ? user.uid : null, // Expose user UID if authenticated, otherwise null
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
