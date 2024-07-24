'use client';
import { usePathname } from 'next/navigation';
import { TabNav, Flex } from '@radix-ui/themes';
import Link from 'next/link';

export default function Nav() {
  const pathname = usePathname();
  return (
  <header>
    <nav className='flex items-center justify-between p-6 lg:px-8 h-20 border border-t-0 border-l-0 border-r-0 border-b-gray'>
      <div className="flex lg:flex-1">
        <a href='/' className='-m-1.5 p-1.5'>
        Gtnelu
        </a>
      </div>
      <Link href='/dashboard'>Dashboard</Link>
    </nav>
  </header>
  );
}