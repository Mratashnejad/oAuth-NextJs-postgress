import { jwtVerify, SignJWT } from 'jose';
import { config } from 'dotenv';
import cookies from 'js-cookie'; 

config();

const SECRET_KEY = process.env.NEXT_PUBLIC_SITE_KEY as string;

if (!SECRET_KEY) {
    throw new Error('Secret Key environment variable not set');
}

export interface User {
    uid: string;
    phoneNumber: string;
}
  //TOKEN

  const generateToken = async (user : User) => {
    const jwt = await new SignJWT({ uid: user.uid, phoneNumber: user.phoneNumber })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(new TextEncoder().encode(SECRET_KEY));
    
    cookies.set('jwt', jwt, { path: '/' });
    console.log('Generated token:', jwt);
    return jwt;
};

const decodeToken = async (token : string) => {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
        if (typeof payload === 'object' && 'uid' in payload && 'phoneNumber' in payload) {
            return payload;
        }
        return payload;
    } catch (error) {
        console.error('Error decoding token', error);
        return null;
    }
};