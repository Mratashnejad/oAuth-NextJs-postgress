import { SignOutButton } from "@/components/sign-out-button"

export const DashboardPage : React.FC =()=>{
    return (
        <div className="container">
            <div className="dashboard-page">
                <h2>Dashboard Page</h2>
                <div className="dashboard-card">
                    <SignOutButton className="signout-button"/>
                </div>
            </div>

        </div>
        
    )
}