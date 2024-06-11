'use client';
import { app } from '../../../configs/FireBaseConfig';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {InputOTP,InputOTPGroup,InputOTPSeparator,InputOTPSlot} from "@/components/ui/input-otp"
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [value , setValue] = useState(true);
  const [timer, setTimer] = useState(0);
  const [errorTimer , setErrorTimer] = useState(0);
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      'size': 'invisible',
      'callback': (response) => { },
      'expired-callback': () => { },
    }, auth);
  },[auth]);


    useEffect(()=>{
      const interval = setInterval(()=>{
        setTimer((prevTimer) => Math.max(0 , prevTimer - 1));
      }, 1000);
      return () => clearInterval(interval);
    },[]);


    useEffect(()=>{
      if(errorTimer > 0){
        setCanResend(false);
        const interval = setInterval(()=>{
          setErrorTimer((prevErrorTimer)=> Math.max(0,prevErrorTimer - 1));
        },1000)
        return() => clearInterval(interval);
      }else{
        setCanResend(true);
      }

    },[errorTimer]);



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
      }, 1000);
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
        setErrorTimer(2); //for 10 minuts should be equal to 600
        toast({
          variant: "destructive",
          title: 'Too many requests',
          description: 'You have requested OTP too many times. Please try again later.',
        });
      } else {
        toast({
          variant: "destructive",
          title: 'Error sending OTP',
          description: 'Failed to send OTP. Please try again.',
        });
      }
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

      if (response.status === 201) {
        toast({
          title: 'Logged in successfully',
          description: 'You are logged in to the system.',
        });
        router.push('/dashboard');
      } else if (response.status === 409) {
        toast({
          title: 'Already registered',
          description: 'You are already registered in the system.',
        });
        router.push('/');
      } else {
        console.log('Failed to create user in MongoDB');
      }
      setOtp('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg relative">
        <div id="recaptcha-container" className="mb-4"></div>
        {!otpSent ? (
          <Input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter Phone Number with Country Code"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 text-sm placeholder-gray-400"
          />
        ) : (
          <InputOTP
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
          className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white p-2 rounded-lg w-full text-sm font-semibold`}
          disabled={!canResend}
          
        >
          {otpSent ? 'Submit OTP' : 'Send Code'}
        </Button>
        {errorTimer > 0 &&(
          <p className="text-center text-red-500 mt-2">Please wait {Math.floor(errorTimer / 60)}:{errorTimer % 60 < 10 ? `0${errorTimer % 60}` : errorTimer % 60} before trying again.</p>
        )}
      </div>
    </div>
  );
}
