
import React from 'react'
import {
    DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

  import {
    Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,
  } from "@/components/ui/tooltip"
  import {Input} from '@/components/ui/input';
  import { CircleUser, Search , Bell , CirclePlus } from "lucide-react"
  import { Button } from "@/components/ui/button"


export default function NavbarRightMenu() {
  return (
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

  )
}

