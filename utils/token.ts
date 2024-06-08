import jwt , {JwtPayload} from 'jsonwebtoken'
import {config} from 'dotenv';

config();



const SECRET_KEY = process.env.NEXT_PUBLIC_SITE_KEY as string
// console.log('secret :', SECRET_KEY);

if(!SECRET_KEY) {
    throw new Error ('Secret Key envirment variable not set')
}

export interface User {
    uid:string;
    phoneNumber : string;
}
export const generateToken = (user: User) : string =>{
    //console.log('jwt:',jwt.sign({uid:user.uid , phoneNumber:user.phoneNumber} , SECRET_KEY , {expiresIn : '1d'}))
    return jwt.sign({uid:user.uid , phoneNumber:user.phoneNumber} , SECRET_KEY , {expiresIn : '1d'});

}

export const decodeToken = (token: string) : User | JwtPayload | null =>{
    try{
        return jwt.verify(token,SECRET_KEY) as User | JwtPayload;
        
    }catch(error){
        console.error ('Error decoding token' , error);
        return null
    }
}
