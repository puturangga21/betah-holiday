'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import Container from '@/components/layout/container';

export default function Navbar() {
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  return (
    <nav
      className={`fixed top-0 z-50 w-full ${isHomePage ? 'border-b-0' : 'border-b'}`}>
      <Container className="py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className={`font-nephilm text-3xl ${isHomePage ? 'text-white' : 'text-primary'}`}>
              Betah Holiday
            </Link>
          </div>

          {/* KANAN: Menu Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {/* <span className="text-sm text-gray-500">Menu Placeholder</span> */}
          </div>
        </div>
      </Container>
    </nav>
  );
}
