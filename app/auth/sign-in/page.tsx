import { redirect } from "next/navigation"
import { SignInPage } from "@/app/auth/sign-in/signin";

const SignIn: React.FC = async()=>{
    //TODO: check if user is authenticated
    const isAuthenticated = false;
    if(isAuthenticated){
        redirect('/dashboard')
    }else{
        return <SignInPage/>
    }
    
}
export default SignIn;