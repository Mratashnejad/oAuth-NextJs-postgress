"use client";

import { FcGoogle } from "react-icons/fc";
import { useTransition, useState } from "react";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";

export const SignInPage: React.FC = () => {

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Sign In</h2>
        <div className="form-container">
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
