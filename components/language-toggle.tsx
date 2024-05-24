'use client'

import React , {useState}from 'react'
import { Globe } from 'lucide-react';

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface Language{
  language : string;
}
export function LanguageToggle({language} : Language) {

  const [ selectedLanguage ,setSelectedLanguage ] = useState(language)
  const handleLanguageChange =(newLanguage : string)=>{
    setSelectedLanguage (newLanguage)
  }
  return (
    

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
        <Globe/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => handleLanguageChange('English')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('Armenian')}>
          Armenian
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLanguageChange('Russian')}>
          Russian
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
