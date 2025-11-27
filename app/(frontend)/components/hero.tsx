'use client';
import React from 'react';
import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';

export default function Hero() {
  const comp = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { delay: 0.6 } });

      tl.from('.reveal-text', {
        yPercent: 100,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        skewY: 3,
      }).from(
        '.fade-text',
        {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.8'
      );
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={comp}
      className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 text-center md:gap-12">
        <div className="flex flex-col gap-1 md:gap-2">
          <div className="overflow-hidden">
            <span className="reveal-text inline-block text-base font-medium text-white uppercase md:text-xl">
              Discover Your Next
            </span>
          </div>

          <div className="overflow-hidden">
            <h1 className="reveal-text text-5xl font-bold text-white uppercase md:text-9xl">
              ADVENTURE
            </h1>
          </div>
        </div>

        <span className="fade-text max-w-[572px] text-sm text-white md:text-base">
          Experience the magic of exploring the Bali most breathtaking
          destinations with our custom designed travel packages for every
          adventurer.
        </span>
      </div>
    </div>
  );
}
