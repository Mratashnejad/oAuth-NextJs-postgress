import { redirect } from "next/navigation";
import { DashboardPage } from "@/app/dashboard/dashboard";

const Dashboard: React.FC = async ()=>{
    const isAuthenticated = true;

    if(!isAuthenticated){
        redirect('/auth/sign-in')
    }else{
        return <DashboardPage/>
    }
    
}

export default Dashboard;