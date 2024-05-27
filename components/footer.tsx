import React from 'react';

export default function Footer() {
  return (
    <footer className='flex py-4'>
      <div className='container'>
        <p className='text-center text-sm text-gray-500'>
          &copy; {new Date().getFullYear()} Gtnelu. All rights reserved.
        </p>
        <div className='flex justify-center'>
          <FooterLink href="/help">Help</FooterLink>
          <FooterLink href="/contact">Contact Us</FooterLink>
          <FooterLink href="/terms">Terms of Service</FooterLink>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="text-sm text-gray-600 hover:text-blue-400 ml-4">
      {children}
    </a>
  );
}
