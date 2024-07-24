import { redirect } from "next/navigation"
import { SignInPage } from "./signin";

const SignIn: React.FC = async()=>{
    const isAuthenticated = true;

    if(isAuthenticated){
        redirect('/dashboard')
    }else{
        return <SignInPage/>
    }
    
}
export default SignIn;