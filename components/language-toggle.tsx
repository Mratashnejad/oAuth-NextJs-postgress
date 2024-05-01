'use client'

import * as React from 'react'
import { Globe } from 'lucide-react';
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function LanguageToggle() {
  const { setTheme } = useTheme()

  return (
    

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
        <Globe/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Armenian
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Russian
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
