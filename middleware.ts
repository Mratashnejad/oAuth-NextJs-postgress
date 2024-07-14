import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import Cookies from "universal-cookie";

const SECRET_KEY = process.env.NEXT_PUBLIC_SITE_KEY;

export async function middleware(req : NextRequest){
    const cookies = new Cookies(req.headers.getSetCookie());
    const token = req.cookies.get('jwt')?.value
    console.log('token is ',token)
    
    if(!token){
        return NextResponse.redirect(new URL('auth/login',req.url))
    }

    // try {
    //     const {payload} = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    //     req.user = payload;
    //     return NextResponse.next();

    // } catch (error) {
    //     console.error('JWT verification Failed:' , error);
    //     return NextResponse.redirect(new URL('auth/login' , req.url))
    // }

}
    export const config = {
        matcher: ['/Dashboard'], // Adjust this matcher based on your protected routes
      }
    