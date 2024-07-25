'use client';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { SignInButton } from './sign-in-button';


export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  return (
  <header>
    <nav className='navbar'>
      <div className="navbar-items">
        <div className="navbar-item" style={{cursor:'pointer'}} onClick={()=>{router.push('/')}}>Gtnelu Logo</div>
        <div className="navbar-item" style={{cursor:'pointer'}} onClick={()=>{router.push('/dashboard')}}>Dashboard</div>
        <SignInButton> Get Started </SignInButton>
      </div>
    </nav>
  </header>
  );
}