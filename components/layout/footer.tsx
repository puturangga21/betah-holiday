import React from 'react';

import Link from 'next/link';

import Container from './container';

const FooterData = [
  {
    title: 'Find Us',
    links: [
      {
        label: 'Instagram',
        href: '#',
      },
      {
        label: 'Facebook',
        href: '#',
      },
      {
        label: 'Twitter',
        href: '#',
      },
      {
        label: 'Youtube',
        href: '#',
      },
    ],
  },
  {
    title: 'Contact',
    links: [
      {
        label: '+62 812 3456 7890',
        href: '#',
      },
      {
        label: 'betahholiday@gmail.com',
        href: '#',
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-primary mb-14 w-full">
      <section>
        <Container>
          <div className="flex h-full flex-col items-start justify-between gap-12 py-10 md:flex-row">
            <div className="flex flex-col gap-6 md:gap-16">
              <h2 className="font-nephilm text-secondary text-3xl">
                Betah Holiday
              </h2>
              <span className="text-primary-foreground text-sm font-normal">
                © 2025 Betah Holiday. Made in Bali.
              </span>
            </div>

            <div className="flex flex-wrap gap-8 md:gap-14">
              {FooterData.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-3">
                  <span className="text-primary-foreground text-sm font-bold">
                    {item.title}
                  </span>
                  <ul className="text-primary-foreground flex flex-col gap-1 text-sm">
                    {item.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </footer>
  );
}
