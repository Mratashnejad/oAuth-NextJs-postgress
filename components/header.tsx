// Header.tsx
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from './language-toggle';

import UserMenu from './userMenu';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';


export default function Header() {
  const [language, setLanguage] = useState('English'); // Default language is English

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    // Additional logic for language change if needed
  };

  return (
    <header className='py-4'>
      <nav className='container flex items-center justify-between'>
        {/* Left-aligned section (Navigation Menu) */}
        <div className='flex items-center space-x-4'>
        <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="flex items-center space-x-2">
          <Link href="/" className="flex items-center font-bold text-lg text-gray-900 hover:text-gray-700 transition-colors">
           
            <span className="ml-2">Gtnelu</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-gray-700 font-semibold hover:text-gray-900 transition-colors">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
        </div>

        {/* Right-aligned section (Language Toggle, Theme Toggle) */}
        <div className='flex items-center space-x-4'>
          <LanguageToggle language={language} onLanguageChange={handleLanguageChange} />
          <ThemeToggle />
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}
