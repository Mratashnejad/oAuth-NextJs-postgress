'use client'
import { CircleUser} from "lucide-react"
//firebase
import {  useAuth } from '@/app/context/AuthContext';
import { Button } from "./ui/button"
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect , useState } from "react";

interface UserData {
  uid : string;
  phoneNumber:string | null;
}

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
              <DropdownMenuLabel>Dear {user.name} </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/notifications">
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              </Link>
              <Link href="/dashboard/jobs">
              <DropdownMenuItem>Jobs</DropdownMenuItem>
              </Link>
              <Link href="/dashboard/wallet">
              <DropdownMenuItem>Wallet</DropdownMenuItem>
              </Link>
              <Link href="/dashboard/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <Link href="/dashboard">
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
              </Link>
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
      
      ):(
        <Link href={'/auth/login'}><Button> SignIn</Button></Link>
      )}
      </>
    )
}