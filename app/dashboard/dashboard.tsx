'use client';
import { SignOutButton } from "@/components/sign-out-button";
import { getAccountLinkStatus } from "@/lib/auth/getAccountLinkStatusServerAction";
import { getUserName } from "@/lib/auth/getUserNameServerAction";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";
import { unlinkGoogleAccount } from "@/lib/auth/unLinkGoogleAccountServerAction";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

export const DashboardPage: React.FC = () => {
    const [isAccountLinked, setIsAccountLinked] = useState(false);
    const [username , setUsername] = useState("");
    const {update} = useSession();

    useEffect(() => {
        const userInfo = async()=>{
            const name = await getUserName();
            if(name){
                setUsername(name);
            }
        }
        const accountLinkStatus = async () => {
            try {
                const status = await getAccountLinkStatus();
                setIsAccountLinked(status);
            } catch (error) {
                console.log('Failed to get account link status:', error);
            }
        };
        userInfo();
        accountLinkStatus(); // Fetch status on component mount
    }, []);

    return (
        <div className="container">
            <div className="dashboard-page">
                <h2>Dashboard Page</h2>
                <div className="dashboard-card">
                    <div className="name">{username}</div>
                    <div className="field-input-container">
                        <input type="text"
                        placeholder="Enter name" 
                        value={username}
                        onChange={(event)=> setUsername(event.target.value)}/>
                        <button className="update-field-button"
                        onClick={()=>update({name:username})}
                        >Update Name</button>
                    </div>
                    <button
                        className={`link-account-button ${isAccountLinked ? 'linked' : ''}`}
                        onClick={
                            isAccountLinked
                                ? async () => {
                                    await unlinkGoogleAccount().then(() => {
                                        setIsAccountLinked(false);
                                    });
                                }
                                : async () => {
                                    await handleGoogleSignIn().then(() => {
                                        setIsAccountLinked(true);
                                    });
                                }
                        }
                    >
                        {isAccountLinked ? "Disconnect Google Account" : "Connect Google Account"}
                    </button>
                    <SignOutButton className="signout-button"/>
                </div>
            </div>
        </div>
    );
};
