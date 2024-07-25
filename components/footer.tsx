'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  return (
    <div className='footer'>
      <div className="container">
        <div className="footer-item copyright">© 2024 Gtnelu. All Rights Reserved.</div>
        <div className="footer-items">
          <div className="footer-item" style={{ cursor:'pointer'}} onClick={()=>{router.push('/helpCenter')}}>Help Center</div>

          <div className="footer-item" style={{cursor:'poineter'}} onClick={()=>{router.push('/terms')}}>Terms of Service</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
