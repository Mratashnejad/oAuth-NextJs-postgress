import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from 'next/link';

export default function PostJobButton() {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Link href='/dashboard/jobs'>
              <Button>
                <CirclePlus className="mr-2 h-4 w-4" /> Post A Job
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            Post a new job
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
