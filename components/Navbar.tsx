'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar'; // Make sure the path is correct
import { SignInButton } from './sign-in-button';

export default function Nav() {
    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = (query) => {
        // Handle search query here
        console.log('Search query:', query);
    };

    return (
        <header>
            <nav className='navbar'>
                <div className="navbar-container">
                    <div className="navbar-left">
                        <div className="navbar-item" style={{ cursor: 'pointer' }} onClick={() => { router.push('/') }}>Gtnelu Logo</div>
                        <div className="navbar-item" style={{ cursor: 'pointer' }} onClick={() => { router.push('/dashboard') }}>Dashboard</div>
                    </div>
                    {/* <div className="navbar-center">
                        <SearchBar onSearch={handleSearch} />
                    </div> */}
                    <div className="navbar-right">
                        <SignInButton>Get Started</SignInButton>
                    </div>
                </div>
            </nav>
        </header>
    );
}
