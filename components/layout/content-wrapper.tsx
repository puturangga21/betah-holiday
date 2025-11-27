'use client';

import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function ContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className={cn('min-h-screen w-full', !isHomePage && 'pt-24 lg:pt-28')}>
      {children}
    </div>
  );
}
