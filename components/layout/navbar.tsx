'use client';

import { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowUpRight, Menu, X } from 'lucide-react';

import Container from '@/components/layout/container';

const navbarLinks = [
  { label: 'Home', href: '/' },
  { label: 'Place to see', href: '#destinations' },
  { label: 'Things to do', href: '#activities' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isHomePage = pathname === '/';

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        isHomePage && !isOpen
          ? 'border-b-0 bg-transparent'
          : 'border-b bg-white'
      }`}>
      <Container className="py-4 lg:py-8">
        <div className="flex items-center justify-between">
          <div className="z-50 flex items-center">
            <Link
              href="/"
              onClick={closeMenu}
              className={`font-nephilm text-2xl lg:text-3xl ${
                isHomePage && !isOpen ? 'text-white' : 'text-green-800'
              }`}>
              Betah Holiday
            </Link>
          </div>

          <ul className="hidden items-center gap-4 lg:flex">
            {navbarLinks.map((link) => (
              <li
                key={link.href}
                className="bg-muted rounded-full px-6 py-3">
                <Link
                  href={link.href}
                  className="text-base font-medium hover:text-green-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="bg-muted hidden max-h-12 cursor-pointer items-center gap-2 rounded-full px-6 py-3 lg:flex">
            <span className="font-medium">Plan trip</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-white">
              <ArrowUpRight size={18} />
            </div>
          </div>

          {/* hamburger */}
          <div className="z-50 flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`cursor-pointer p-2 focus:outline-none ${
                isHomePage && !isOpen ? 'text-white' : 'text-green-800'
              }`}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </Container>

      <div
        className={`absolute top-full left-0 flex w-full flex-col items-start gap-6 border-t bg-white px-4 pt-4 pb-8 shadow-lg transition-all duration-300 ease-in-out lg:hidden ${
          isOpen
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-5 opacity-0'
        }`}>
        <ul className="flex w-full flex-col items-start gap-6">
          {navbarLinks.map((link) => (
            <li
              key={link.href}
              className="w-full">
              <Link
                href={link.href}
                onClick={closeMenu}
                className="block w-full py-2 text-xl font-medium">
                {link.label}
              </Link>
            </li>
          ))}

          <div
            onClick={closeMenu}
            className="flex items-center gap-3 rounded-full py-2">
            <span className="text-xl font-medium">Plan your trip now</span>
            <ArrowUpRight size={20} />
          </div>
        </ul>
      </div>
    </nav>
  );
}
