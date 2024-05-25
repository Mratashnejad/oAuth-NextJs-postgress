'use client'
import React from 'react'
import  { useRouter }           from 'next/navigation'
import    Link                  from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {Input} from '@/components/ui/input'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
import {  UserData  } from '../../types/types';


import  { useAuth }              from '@/app/context/AuthContext';

import  { useEffect , useState} from 'react';

import { CircleUser, Menu, Package2, Search , Bell , CirclePlus } from "lucide-react"
import {getUserNameProfile} from '@/app/api/users/api'; 


export default function Header() {
    const { user, logOut } = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);
    const router = useRouter();
    const [userNameProfile, setUserNameProfile] = useState<string | null>(null);
  
    useEffect(()=>{
      const fetchUserNameProfileData = async ()=>{
        try {
          if(user){
            const name = await getUserNameProfile(user._id);
            setUserNameProfile(name);
          }

        } catch (error) {
          console.error('Error fetching user name information:', error);

        }
      }
      fetchUserNameProfileData();
    } , [user])

    const handleLogout = async () => {
        try {
          await logOut();
          router.push('/');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };


  return (

    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href="/dashboard"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/jobs"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Jobs
            </Link>

            <Link
              href="/dashboard/settings"
              className="text-foreground transition-colors hover:text-foreground"
            >
              Settings
            </Link>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/jobs"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Jobs
                </Link>
                <Link href="/dashboard/settings" className="hover:text-foreground">
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <form className="ml-auto flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                  <Button>
                  <CirclePlus className="mr-2 h-4 w-4" /> Post A Job
                  <span className="sr-only">Toggle user menu</span>
                </Button>

                </TooltipTrigger>
                <TooltipContent>
                  <p>Add New Job</p>
                </TooltipContent>
                </Tooltip>
                </TooltipProvider>


              <DropdownMenuTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Notifications
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div>Notifications will be here</div>
              </DropdownMenuContent>
            </DropdownMenu>



            <DropdownMenu>
              <DropdownMenuTrigger>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                        <CircleUser className="h-5 w-5" />
                        <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Profile
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuLabel>Dear, {userNameProfile || 'Dear User'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Notification</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
  )
}
