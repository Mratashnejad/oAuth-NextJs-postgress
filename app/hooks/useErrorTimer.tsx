import { useEffect , useState } from "react";

export function useErrorTimer(initialValue:number){
    const [errorTimer , setErrorTimer] = useState(initialValue);
    const [canResend  , setCanResend ] = useState(true);

    useEffect(()=>{
        if(errorTimer > 0){
            setCanResend(false);
            const interval = setInterval(()=>{
                setErrorTimer(prevErrorTimer =>Math.max(0,prevErrorTimer - 1));
            }, 1000);
            return ()=> clearInterval(interval);
        }else{
            setCanResend(true);
        }
    },[errorTimer]);
    return {errorTimer , canResend};
}