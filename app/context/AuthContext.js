'use client'
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../configs/FireBaseConfig';
import { signInWithPhoneNumber, signOut } from 'firebase/auth';
import Cookies from 'js-cookie';
import {generateToken , decodeToken } from '@/utils/token';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if(token){
      axios.get('/api/auth', {params:{token}})
      .then(response=>{
        setUser(response.data.decodeToken);
      })
      .catch(error=>{
        console.error('error decoding token' , error)
        setUser(null)
      });

    }else {

      setUser(null);
    }

    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
     if(firebaseUser){
      const {uid , phoneNumber} = firebaseUser;
      try {
        const response = await axios.post('/api/users' , {uid, phoneNumber},{
          headers:{
            'Content-Type' : 'application/json',
          },
        })
        const data = response.data;
        setUser(data.user);
        const token = generateToken(data.user);
        Cookies.set('authToken' , token , {expires:1});
  
      } catch (error) {

        if(axios.isAxiosError(error) && error.response && error.response.status == 409){
          // console.log("User already exists");
          const data = error.response.data;
          setUser(data.user);
          const token = generateToken(data.user);
          console.log(token)
          Cookies.set('authToken' , token , {expires : 1})
        }
        console.error('Error fetching user data : ' , error)
      }
     }else{
      setUser(null);
      Cookies.remove('authToken');
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
      Cookies.remove('authToken')
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
