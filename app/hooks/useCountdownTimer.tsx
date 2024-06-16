import { useEffect, useState } from "react";

export function useCountdownTimer(initialValue : number , intervalTime : number){
    const [timer , setTimer] = useState(initialValue)

    useEffect(()=>{
        const interval = setInterval(()=>{
            setTimer(prevTimer => Math.max(0,prevTimer - 1));
        }, intervalTime);
        return ()=> clearInterval(interval);
    },[intervalTime]);
    return timer;
}