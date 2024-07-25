'use client';
import { handleSignOut } from "@/lib/auth/signOutServerAction";
import { useRouter } from "next/navigation";

export const SignOutButton = (props:{ children?: React.ReactNode,className?:string}) =>{
    const router = useRouter();
    return (
    <button className={props.className}
        style={{cursor :'pointer'}}
        onClick={()=>{handleSignOut()}}>
        {props.children || 'Sign Out'}
    </button>
    )
}
