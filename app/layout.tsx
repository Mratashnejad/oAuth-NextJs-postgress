'use client'

// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthContextProvider } from '@/app/context/AuthContext';
import '@/css/globals.css';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

// export const metadata: Metadata = {
//   title: 'Gtnelu',
//   description: 'Welcome to my app',
// };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' className='scroll-smooth antialiased' suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <AuthContextProvider>
          <ThemeProvider
            enableSystem
            attribute='class'
            defaultTheme='system'
            disableTransitionOnChange>
            <Header />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
