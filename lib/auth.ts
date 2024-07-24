import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { CredentialsProvider } from "next-auth/providers";

export const authOptions = {
    providers :[
        GoogleProvider({
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
        }),
    ],
},
callbacks:{

}

export default NextAuth(authOptions);