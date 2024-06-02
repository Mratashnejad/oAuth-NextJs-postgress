'use client';

import { Inter } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthContextProvider } from '@/app/context/AuthContext';
import '@/css/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { refetchOnWindowFocus: false },
    },
  });

  return (
    <html lang='en' className='scroll-smooth antialiased' suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <ThemeProvider
              enableSystem
              attribute='class'
              defaultTheme='system'
              disableTransitionOnChange>
              <Header />
              <main className='flex-grow'>{children}</main>
              <Toaster />
              <Footer />
            </ThemeProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
