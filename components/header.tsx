// Header.tsx
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from './language-toggle';
import Navbar from '@/components/navbar';
import UserMenu from './userMenu';
import React, { useState } from 'react';

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
          <Navbar />
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
