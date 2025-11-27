'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import gsap from 'gsap';
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

  // Refs for GSAP targeting
  const containerRef = useRef<HTMLElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const closeMenu = () => setIsOpen(false);

  // 1. Setup GSAP Animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      // -- Step 1: Color Transition (First) --
      // We animate the background to white and text to green/primary
      tl.current
        .to(containerRef.current, {
          backgroundColor: '#ffffff',
          borderBottomColor: '#e0d6c9',
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(
          [logoRef.current, hamburgerRef.current],
          {
            color: '#006045', // text-green-800
            duration: 0.3,
            ease: 'power2.out',
          },
          '<' // Run simultaneously with background change
        )

        // -- Step 2: Open Menu (After colors change) --
        .to(menuContainerRef.current, {
          height: 'auto',
          autoAlpha: 1,
          duration: 1.5,
          ease: 'power3.inOut',
        })
        .from(
          '.mobile-link-item',
          {
            yPercent: 100,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power4.out',
          },
          '-=0.3'
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Control Timeline
  useEffect(() => {
    if (tl.current) {
      if (isOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isOpen]);

  const isTransparent = isHomePage;

  return (
    <nav
      ref={containerRef}
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
        isTransparent ? 'border-b-transparent bg-transparent' : 'border-b'
      }`}>
      <Container className="py-4 lg:py-8">
        <div className="flex items-center justify-between">
          <div className="z-50 flex items-center">
            <Link
              ref={logoRef}
              href="/"
              onClick={closeMenu}
              className={`font-nephilm text-2xl mix-blend-difference transition-colors duration-300 lg:text-3xl ${
                isTransparent ? 'text-white' : 'text-green-800'
              }`}>
              Betah Holiday
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-4 lg:flex">
            {navbarLinks.map((link) => (
              <li
                key={link.href}
                className="bg-muted rounded-full px-6 py-3">
                <Link
                  href={link.href}
                  className="text-base font-medium transition-colors hover:text-green-700">
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

          {/* Hamburger Button */}
          <div className="z-50 flex items-center lg:hidden">
            <button
              ref={hamburgerRef}
              onClick={() => setIsOpen(!isOpen)}
              className={`cursor-pointer p-2 transition-colors focus:outline-none ${
                isTransparent ? 'text-white' : 'text-green-800'
              }`}
              aria-label="Toggle menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </Container>

      {/* MOBILE MENU DROPDOWN */}
      <div
        ref={menuContainerRef}
        className="absolute top-full left-0 h-0 w-full overflow-hidden bg-white lg:hidden"
        style={{ willChange: 'height, opacity' }}>
        <div className="flex h-screen flex-col items-start justify-between gap-6 border-t px-4 pt-4 pb-8 sm:px-6 lg:px-8">
          <ul className="flex w-full flex-col items-start gap-2">
            {navbarLinks.map((link) => (
              <div
                key={link.href}
                className="overflow-hidden">
                <li className="mobile-link-item w-full">
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block w-full py-2 text-xl font-semibold text-green-900 transition-transform active:scale-95">
                    {link.label}
                  </Link>
                </li>
              </div>
            ))}
          </ul>

          <div className="mb-24 overflow-hidden">
            <div
              onClick={closeMenu}
              className="mobile-link-item flex cursor-pointer items-center justify-center gap-3 rounded-full py-2 text-green-800">
              <span className="text-xl font-semibold">Plan your trip now</span>
              <ArrowUpRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
