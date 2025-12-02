import React from 'react';

import NextTopLoader from 'nextjs-toploader';

import { SanityLive } from '@/sanity/lib/live';

import ContentWrapper from '@/components/layout/content-wrapper';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextTopLoader
        color="#006045"
        showSpinner={false}
        zIndex={1600}
      />
      <SanityLive />
      <Navbar />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </>
  );
}
