
import type { Metadata } from 'next';
import '@/sass/globals.scss'
import {SessionProvider} from 'next-auth/react';
import  Footer from '@/components/Footer'
import Navbar from '@/components/Navbar';
interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata : Metadata = {
  title : "Gtnelu",
}

export default function RootLayout({ children }: RootLayoutProps) {
 
  return (
    <html lang='en' >
      <SessionProvider>
          <body className="min-h-screen ">
              <Navbar />  
                <div className='flex justify-center items-center p-24 '>
                  {children}
                </div> 
              <Footer />
          </body>
      </SessionProvider>
    </html>
  );
}
