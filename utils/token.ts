import jwt , {JwtPayload} from 'jsonwebtoken'


const SECRET_KEY = process.env.SECRET_KEY as string

export interface User {
    uid:string;
    phoneNumber : string;
}
export const generateToken = (user: User) : string =>{
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
