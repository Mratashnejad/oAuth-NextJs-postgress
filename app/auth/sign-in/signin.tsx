"use client";

import { FcGoogle } from "react-icons/fc";
import { useState, useTransition } from "react";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";
import { handleEmailSignIn } from "@/lib/auth/emailSignInServerActions";


export const SignInPage: React.FC = () => {
  const [isPending , startTransition]  = useTransition();
  const [formData , setFormData] = useState({email:"" as string});


  const handleSubmit =(event : React.FormEvent) =>{
    event.preventDefault();
    try{
      startTransition(async()=>{
        await handleEmailSignIn(formData.email);
      })
    }catch(error){
      console.error(error);
    }

  }

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Sign In</h2>
        <div className="form-container">
          <form className="email-signin-form" onSubmit={handleSubmit}>
            <input 
            className="form-input"
            type="email"
            maxLength={320}
            placeholder="Email Address"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({email : event.target.value})
            }}
            disabled={isPending}
            required
            />
            <button type="submit" className="submit-button">Sign In with email</button>
          </form>
          <div className="divider">
            <div className="line"></div>
            <span className="or">or</span>
            <div className="line"></div>
          </div>
          <div className="social-logins">
            <button className="google" onClick={() => handleGoogleSignIn()}>
              <FcGoogle className="google-icon" />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
