import type { Metadata } from 'next';

import { nephilm, openSans, plusJakartaSans } from '@/lib/fonts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Betah Holiday',
  description: 'A simple holiday planner for your family trips.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nephilm.variable} ${plusJakartaSans.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
