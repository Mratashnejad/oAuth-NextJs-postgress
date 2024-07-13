'use client';
import React, { useState, useEffect } from 'react';
import { app } from '../../../configs/FireBaseConfig';
import { useRouter } from 'next/navigation';

//firebase
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';
//axios
import axios from 'axios';
//components :
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from '@/components/ui/use-toast';

// jose for JWT handling
import { jwtVerify, SignJWT } from 'jose';

//token & cookie

import Cookies from 'universal-cookie';


const SECRET_KEY = process.env.NEXT_PUBLIC_SITE_KEY;

if (!SECRET_KEY) {
    throw new Error('Secret Key environment variable not set');
}

const cookies = new Cookies();
export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [canResend, setCanResend] = useState(true);
    const [timer, setTimer] = useState(0);
    const [errorTimer, setErrorTimer] = useState(0);
    const auth = getAuth(app);
    const router = useRouter();

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            'size': 'invisible',
            'callback': (response) => { },
            'expired-callback': () => { },
        }, auth);
    }, [auth]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => Math.max(0, prevTimer - 1));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (errorTimer > 0) {
            setCanResend(false);
            const interval = setInterval(() => {
                setErrorTimer((prevErrorTimer) => Math.max(0, prevErrorTimer - 1));
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [errorTimer]);

    let countdownInterval;

    if (!canResend) {
        countdownInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdownInterval);
                    setCanResend(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1);
    }

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleOTPChange = (value) => {
        setOtp(value);
    };

    const handleSendOtp = async () => {
        if (!canResend) return;

        try {
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            setConfirmationResult(confirmation);
            setOtpSent(true);
            setPhoneNumber('');
            setCanResend(false);
            setTimer(60);

            toast({
                title: 'OTP successfully sent',
                description: 'Please check your mobile phone.',
            });
        } catch (error) {
            console.error(error);
            if (error.code === 'auth/too-many-requests') {
                setErrorTimer(600); //for 10 minutes
                toast({
                    variant: "destructive",
                    title: 'Too many requests',
                    description: 'You have requested OTP too many times. Please try again later.',
                });
            } else {
              console.log(error)
                toast({
                    variant: "destructive",
                    title: 'Error sending OTP',
                    description: 'Failed to send OTP. Please try again.',
                });
            }
        }
    };

    const generateToken = async (user) => {
       const jwt =  await new SignJWT({ uid: user.uid, phoneNumber: user.phoneNumber })
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1d')
            .sign(new TextEncoder().encode(SECRET_KEY));
        
        cookies.set('jwt',jwt,{path:'/'})
        console.log('Genereted token in gereteToken functions : ', jwt)
        return jwt;
    };

    const decodeToken = async (token) => {
        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
            if (typeof payload === 'object' && 'uid' in payload && 'phoneNumber' in payload) {
                return payload; // Type assertion for TypeScript
            }
            return payload; // If payload is of type User
        } catch (error) {
            console.error('Error decoding token', error);
            return null;
        }
    };

    const handleOTPSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;
            const uid = user.uid;
            const phoneNumber = user.phoneNumber;

            const response = await axios.post(
                '/api/users',
                { uid, phoneNumber },
                { headers: { 'Content-Type': 'application/json' } }
            );
            if (response.status === 201 || response.status === 200) {
                const token = await generateToken({ uid, phoneNumber });
                console.log('Generated JWT:', token);
                toast({
                    title: 'Logged in successfully',
                    description: 'You are logged in to the system.',
                });
                setOtp('');
                router.push('/')
              }else if(response.status === 409){
              console.log('USER HAS REGISTERD')
              const token = await generateToken({ uid, phoneNumber });
              console.log('Generated JWT:', token);
              toast({
                title: 'Logged in successfully',
                description: 'You are already registed to our system.',
                
            });
            setOtp('');
            router.push('/');
          }
        } catch (error) {

            if (error.response) {
              setOtp('');
                toast({
                    title: 'Already registered',
                    description: 'You are already registered in the system.',
                });
            } else if(error.code === 'auth/code-expired'){
              setOtp('');
              toast({
                  variant: "destructive",
                  title: 'Error',
                  description: 'your one Time passowrd Has been expired',
              });
          }else {
            console.error(error);
            toast({
              variant: "destructive",
              title: 'Technical Issue ',
              description: 'Some Thing is Wrong',
          });
          }
            
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
      <>
            <div className="relative">
            <div id='recaptcha-container'></div>
                {!otpSent ? (
                    <Input

                        type="tel"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        placeholder="Enter Phone Number with Country Code"
                        className="center mb-2"
                    />
                ) : (
                    <InputOTP
                      className='center'
                        maxLength={6}
                        value={otp}
                        onChange={handleOTPChange}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                )}
                <Button
                    onClick={otpSent ? handleOTPSubmit : handleSendOtp}
                    disabled={!canResend}
                >
                    {otpSent ? 'Submit OTP' : 'Send Code'}
                </Button>
                {/* {errorTimer > 0 && (
                    <p className="text-center text-red-500 mt-2">Please wait {Math.floor(errorTimer / 60)}:{errorTimer % 60 < 10 ? `0${errorTimer % 60}` : errorTimer % 60} before trying again.</p>
                )} */}
            </div>
        </>
    );
}
