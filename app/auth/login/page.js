'use client'
import React , { useState , useEffect} from 'react';
import {getAuth , RecaptchaVerifier , signInWithPhoneNumber } from 'firebase/auth'
import {app} from '../config'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';



export default function Login(){
    const [phoneNumber , setPhoneNumber] = useState('')
    const [otp , setOtp] = useState('')
    const [confirmationResult , setConfirmationResult] = useState(null)
    const [otpSent , setOtpSent] = useState(false)

    const auth = getAuth(app);
    const router = useRouter();

    useEffect(()=>{
        window.recaptchaVerifier = new RecaptchaVerifier(auth,"recaptcha-container", {
            'size':'normal',
            'callback':(response)=>{},
            'expired-callback': ()=>{},
        });

    },[auth]);

    const handlePhoneNumberChange = (e)=>{
        setPhoneNumber(e.target.value);
    };

    const handleOTPChange = (e)=>{
        setOtp(e.target.value);
    }

    const handleSendOtp = async()=>{
        try{
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g,'')}`;
            const confirmation = await signInWithPhoneNumber(auth,formattedPhoneNumber,window.recaptchaVerifier)
            setConfirmationResult(confirmation);
            setOtpSent(true);
            setPhoneNumber('');
            alert('OTP has been sent');

        }catch(error){
            console.error(error)
        }
    };

    const handleOTPSubmit = async()=>{
        try{
            await confirmationResult.confirm(otp)
            setOtp('');
            router.push('/dashboard')

        }catch(error){
            console.error(error)
        }
    };

    return(
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg">
          {!otpSent ? (
            <div id="recaptcha-container" className="mb-4"></div>
          ) : null}
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter Phone Number with Country Code"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 text-sm placeholder-gray-400"
          />
          <input
            type="text"
            value={otp}
            onChange={handleOTPChange}
            placeholder="Enter OTP"
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 text-sm placeholder-gray-400"
          />
          <button
            onClick={otpSent ? handleOTPSubmit : handleSendOtp}
            className={`bg-${otpSent ? 'green' : 'blue'}-500 text-white p-2 rounded-lg w-full text-sm font-semibold`}
          >
            {otpSent ? 'Submit OTP' : 'Send OTP'}
          </button>
        </div>
      </div>
    )


}