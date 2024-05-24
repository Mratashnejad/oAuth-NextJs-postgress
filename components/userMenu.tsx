'use client'
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
//firebase
import {useAuth} from '@/app/context/AuthContext';
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect , useState } from "react";

interface UserData {
  uid : string;
  phoneNumber:string | null;
}

//Icons
import { LayoutDashboard  , User , Bell, Settings ,Pickaxe , Wallet , LogOut  ,LogIn } from 'lucide-react';



export default function UserMenu(){

  const {user ,signInWithPhone , logOut } = useAuth()

  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

 useEffect(()=>{
  if(user){
    const {uid , phoneNumber} = user;
    setUserData ({uid , phoneNumber});
  }else{
    setUserData(null);
  }

 } , [user]);

 
  const handleLogout = async () => {
    try {
      await logOut()
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // const user = useAuth()
    return(
      <>
      {user ? (
        <div>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>User </DropdownMenuLabel>
              <DropdownMenuLabel><User />{user.phoneNumber}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/notifications">
              <DropdownMenuItem><Bell/> Notifications</DropdownMenuItem>
              </Link>
              <Link href="/dashboard/jobs">
              <DropdownMenuItem><Pickaxe/>Jobs</DropdownMenuItem>
              </Link>
              <Link href="/dashboard/wallet">
              <DropdownMenuItem><Wallet/>Wallet</DropdownMenuItem>
              </Link>
              <Link href="/dashboard/settings">
              <DropdownMenuItem><Settings/>Settings</DropdownMenuItem>
              </Link>
              <Link href="/dashboard">
              <DropdownMenuItem><LayoutDashboard/> Dashboard</DropdownMenuItem>
              </Link>
              
              <DropdownMenuItem onClick={handleLogout}><LogOut/>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
      
      ):(
        
        <Link href={'/auth/login'}><Button> SignIn</Button></Link>

      )}
      </>
    )
}