import { Inter } from 'next/font/google';
import { AuthContextProvider } from '@/app/context/AuthContext';
import '@/css/globals.css';
import DashboadHeader from '@/components/dashboard/DashboardHeader';
const inter = Inter({ subsets: ['latin'] });

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard Area',
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang='en' className='scroll-smooth antialiased' suppressHydrationWarning>
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <AuthContextProvider>
          <DashboadHeader />
          <main className='flex-grow'>{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
