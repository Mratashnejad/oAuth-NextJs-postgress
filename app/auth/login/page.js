  'use client'
  import               {  app }                                   from '../../../configs/FireBaseConfig'
  import              { useRouter }                               from 'next/navigation';
  import          React , { useState , useEffect}                 from 'react';
  import {  getAuth , RecaptchaVerifier , signInWithPhoneNumber } from 'firebase/auth'
  import               { Button }                                 from '@/components/ui/button';
  import               { Input  }                                 from '@/components/ui/input';
  import              { InputOTP }                                from '@/components/ui/input-otp';
  import              {     z    }                                from 'zod';
  import              { zodResolver }                             from '@hookform/resolvers/zod';
  import              { useForm  }                                from 'react-hook-form';

  import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

  
  export default function Login(){
      const [phoneNumber , setPhoneNumber] = useState('')
      const [otp , setOtp] = useState('')
      const [confirmationResult , setConfirmationResult] = useState(null)
      const [otpSent , setOtpSent] = useState(false)

      //temp
      const [isSubmitting,setIsSubmitting] = useState(false);

      const auth = getAuth(app);
      const router = useRouter();

      useEffect(()=>{
          window.recaptchaVerifier = new RecaptchaVerifier(auth,"recaptcha-container", {
              'size':'normal',
              'callback':(response)=>{},
              'expired-callback': ()=>{},
          },auth);

      }, [auth]);


   

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
              console.log('OTP has been sent')
              alert('OTP has been sent');

          }catch(error){
              console.error(error)
          }
      };

      const handleOTPSubmit = async()=>{
        if(isSubmitting) return;
        setIsSubmitting(true);
        console.log('handleOTPSubmit Called');

          try{
              const   result = await confirmationResult.confirm(otp);
              const   user   = result.user;
              const   uid    = user.uid;
              const   phoneNumber = user.phoneNumber;


              //temp check user data
              console.log('Submitting User : ',uid ,phoneNumber);

              //send UID and phoneNumber to API
              const   response = await fetch('/api/users',{
                method : 'POST',
                headers:{
                  'Content-Type' : 'application/json',
                },
                body: JSON.stringify({uid , phoneNumber}),
              })

              if(response.status == 201){
                console.log('user created successfully');
                console.log('router routing to dashboard ...')
                router.push('/dashboard')
              }else if (response.status == 409){
                console.log('user is already registered');
                console.log('router routing to homepage ...')
                router.push('/')
              }else{
                console.log('failed to create user in mongoDB')
              }
              console.log('otp set to empty')

              setOtp('');
          }catch(error){
              console.error(error)
          }
      };

      return(
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
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
          {otpSent && (
            <input
              type="text"
              value={otp}
              onChange={handleOTPChange}
              placeholder="Enter OTP"
              className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 text-sm placeholder-gray-400"
            />
          )}
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