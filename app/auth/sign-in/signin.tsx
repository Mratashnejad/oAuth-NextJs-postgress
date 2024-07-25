'use client'
import { handleGoogleSignIn } from '@/lib/auth/googleSignInServerAction';
import {FcGoogle} from 'react-icons/fc';

export const SignInPage: React.FC = () => {
    return (
        <div className="signin-page">
            <div className="signin-card">
            <h2>Sign in</h2>
                <div className="form-container">
                    <div className="social-logins">
                        <button className="google" onClick={()=> handleGoogleSignIn()}>
                            <FcGoogle className="google-icon"/>
                                Sign In with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
    )
}
