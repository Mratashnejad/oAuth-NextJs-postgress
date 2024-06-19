'use client'
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../../configs/FireBaseConfig';
import { signInWithPhoneNumber, signOut } from 'firebase/auth';
import Cookies from 'js-cookie';
import { generateToken, decodeToken, User } from '@/utils/token'; // Adjust the path as per your project structure
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                const { uid, phoneNumber } = firebaseUser;
                try {
                    const response = await axios.post('/api/users', { uid, phoneNumber }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = response.data;
                    const token = generateToken({ uid, phoneNumber });
                    setUser(data.user);
                    Cookies.set('authToken', token, { expires: 1 }); // Set token in cookie for 1 day
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        if (error.response && error.response.status === 409) {
                            const data = error.response.data;
                            setUser(data.user);
                        } else {
                            console.error('Error fetching user data : ', error);
                        }
                    } else {
                        console.error('Unexpected error:', error);
                    }
                }
            } else {
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
            Cookies.remove('authToken');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const value = {
        user,
        signInWithPhone,
        logOut,
        isAuthenticated: !!user,
        uid: user ? user.uid : null,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
