import React from 'react'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Bell  } from "lucide-react"

export default function NotificationMenu() {
  return (
    <>
            <DropdownMenu>
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
        </>
    )
}
