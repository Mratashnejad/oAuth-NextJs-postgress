'use server';

import { signOut } from "@/lib/auth/authConfig"

export const handleSignOut = async()=>{
    try{
       signOut()
    }catch(error){
        throw error;
    }
}