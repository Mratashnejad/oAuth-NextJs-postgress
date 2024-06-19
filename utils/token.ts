import { jwtVerify, SignJWT } from 'jose';
import { config } from 'dotenv';

config();

const SECRET_KEY = process.env.NEXT_PUBLIC_SITE_KEY as string;

if (!SECRET_KEY) {
    throw new Error('Secret Key environment variable not set');
}

export interface User {
    uid: string;
    phoneNumber: string;
}

export const generateToken = async (user: User): Promise<string> => {
    const jwt = await new SignJWT({ uid: user.uid, phoneNumber: user.phoneNumber })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(new TextEncoder().encode(SECRET_KEY));

    console.log('jwt:', jwt);
    return jwt;
};

export const decodeToken = async (token: string): Promise<User | null> => {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
        if (typeof payload === 'object' && 'uid' in payload && 'phoneNumber' in payload) {
            return payload as User; // Type assertion for TypeScript
        }
        return payload as User; // If payload is of type User
    } catch (error) {
        console.error('Error decoding token', error);
        return null;
    }
};
