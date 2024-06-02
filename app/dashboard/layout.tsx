// DashboardLayout.tsx
import DashboadHeader from '@/components/dashboard/DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard Area',
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <DashboadHeader />
      <main className='flex-grow'>{children}</main>
    </>
  );
}
