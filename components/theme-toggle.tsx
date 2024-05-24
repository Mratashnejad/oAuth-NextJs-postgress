import React from 'react';
import { Sun , Moon }                 from 'lucide-react';
import { useTheme }                   from 'next-themes'
import { Button }                      from '@/components/ui/button'

export function ThemeToggle() {
  const {theme , setTheme } = useTheme()

const handleDarkClick =()=>{
  if(theme === 'light'){
    setTheme('dark')
  }else{
    setTheme('light');
  }
}
  return (
<>
    {theme === 'light' ? (<Button type='button' onClick={handleDarkClick} variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
      </Button>):(<Button type='button' onClick={handleDarkClick} variant='outline' size='icon'>
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
      </Button>)
      }
    </>
  )
}
