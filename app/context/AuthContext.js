'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../configs/FireBaseConfig';
import { signInWithPhoneNumber, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
     if(user){
      const {uid , phoneNumber} = user;
      const response = await fetch('/api/users', {
        method : 'POST',
        headers:{
          'Content-Type' : 'application/json',
        },
        body:JSON.stringify({uid , phoneNumber}),
      });
      const data = await response.json();
      setUser(data.user);
     }else{
      setUser(null);
     }
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
