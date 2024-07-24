import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";

export default async (req,res)=>{
    const session = await getServerSession(req,res , authOptions);
    if(session){
        res.send ({
            content: 'Protected Content . you have access to protected session'
        })

    }else{
        res.send({
            error : 'you must be signed into the web to visit this page '
        })
    }
}