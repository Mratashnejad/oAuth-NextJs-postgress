import { verifyAuth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req : NextRequest){

    const token = req.cookies.get('user-token')?.value
    console.log('token is ',token)
  
    const verifiedToken = 
    token && 
    (await verifyAuth(token).catch((err)=>{
        console.error(err.message)
    }))

    if(req.nextUrl.pathname.startsWith('/auth/login')&& !verifiedToken){
        return
    }

    if(req.url.includes('/auth/login') && verifiedToken){
        return NextResponse.redirect(new URL('/dashboard' , req.url))
    }

    const url = req.url

    if(!verifiedToken){
        return NextResponse.redirect(new URL('/auth/login' , req.url))
    }
}

export const config = {
    matcher:['/dashboard' , '/auth/login' , '/api/users' ,'/api/address'],
}