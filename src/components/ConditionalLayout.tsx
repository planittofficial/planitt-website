'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WealthAdvisoryFab from '@/components/WealthAdvisoryFab';
import TechnicalFaqFab from '@/components/TechnicalFaqFab';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  const isErrorPage = pathname === '/';

  // Show bare page with no chrome when the site is in maintenance / error mode
  if (isErrorPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header variant={isLandingPage ? 'landing' : 'main'} />
      {children}
      {!isLandingPage && <Footer />}
      {!isLandingPage && <WealthAdvisoryFab />}
      {!isLandingPage && <TechnicalFaqFab />}
    </>
  );
}
