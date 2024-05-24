import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageToggle } from './language-toggle'
import  Navbar  from '@/components/navbar'
import UserMenu from './userMenu'

export default function Header() {
  return (
    <header className='py-4'>
      <nav className='container flex items-center justify-between'>
        {/* Left-aligned section (Navigation Menu) */}
        <div className='flex items-center space-x-4'>
          <Navbar />
        </div>

          {/* Right-aligned section (Language Toggle, Theme Toggle) */}
          <div className='flex items-center space-x-4'>
            
          <LanguageToggle />
          <ThemeToggle />
          <UserMenu />
        </div>
      </nav>
    </header>
  )
}
