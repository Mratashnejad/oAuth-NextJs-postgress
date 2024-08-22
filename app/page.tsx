import { SignInButton } from '@/components/sign-in-button';
import React from 'react';

export default function Home() {
  return (
    <div className="home-page">
    <h1>PErsonal Web</h1>
    <div><SignInButton className='signin-button'/></div>
    </div>
  );
}
