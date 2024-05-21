// /Users/wilaliam/Documents/github/gtnelu-project/Gtnelu/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthContextProvider } from '@/app/context/AuthContext';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
  pathname?: string; 
}

export default function RootLayout({ children, pathname }: RootLayoutProps) {
  const isDashboard = pathname === '/dashboard';
  const isAdmin = pathname === 'Administrator-page';

  return (
    <html lang='en' className='scroll-smooth antialiased' suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <AuthContextProvider>
          <ThemeProvider
            enableSystem
            attribute='class'
            defaultTheme='system'
            disableTransitionOnChange
          >

              {!isDashboard && <Header />}
              <main className='flex-grow'>{children}</main>
              <Footer />
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
