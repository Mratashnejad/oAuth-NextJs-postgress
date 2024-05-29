import React from 'react'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import { Tooltip,TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { CirclePlus  } from "lucide-react"

export default function PostJobButton() {
  return (
    <>         
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
  </DropdownMenu>
  </>
  )
}
