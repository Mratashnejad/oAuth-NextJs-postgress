import React from 'react';
import Header from '@/components/dashboard/header';
import Footer from '@/components/footer';
import {Button} from '@/components/ui/button';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthContextProvider } from '@/app/context/AuthContext';
import '@/css/globals.css';

interface DashboardLayoutProps {
  title : string;
  children : React.ReactNode;
}

const DashboardLayout = ({ title , children }: DashboardLayoutProps) => {
  return (
    <html lang='en' className='scroll-smooth antialiased' suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col`}>
        <AuthContextProvider>
          <ThemeProvider
            enableSystem
            attribute='class'
            defaultTheme='system'
            disableTransitionOnChange
          >
            <Header />
            <div className="flex min-h-screen w-full flex-col">
              <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 p-8 pt-6">
                  <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
                    
                  </div>
                </div>
              </div>
              <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                {children}
              </main>
            </div>
          
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
};

export default DashboardLayout;
