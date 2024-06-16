import { useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';


export function useRecaptchaVerifier(auth : any) {
    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
          'size': 'invisible',
          'callback': (response : any) => { },
          'expired-callback': () => { },
        }, auth);
      },[auth]);
    }