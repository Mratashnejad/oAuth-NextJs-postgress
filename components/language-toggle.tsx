// LanguageToggle.tsx
'use client'

import React, { useState } from 'react';
import { Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface LanguageToggleProps {
  language: string;
  onLanguageChange: (language: string) => void;
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Globe />
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
  );
}
