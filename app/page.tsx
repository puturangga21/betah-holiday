'use client';

import { useLayoutEffect, useRef } from 'react';

import gsap from 'gsap';

import Container from '@/components/layout/container';

export default function Home() {
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
    <main
      ref={comp}
      className="invisible-until-load">
      <section className="h-screen w-full bg-[url(/home-background.png)] bg-cover bg-center">
        <Container className="space-y-14">
          {/* hero */}
          <div className="flex h-screen items-center justify-center">
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

          {/* content */}
          <div>
            <h1>Most popular activities</h1>
          </div>
        </Container>
      </section>
    </main>
  );
}
