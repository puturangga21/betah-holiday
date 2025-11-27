import React from 'react';

import { SanityLive } from '@/sanity/lib/live';

import ContentWrapper from '@/components/layout/content-wrapper';
import Navbar from '@/components/layout/navbar';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <ContentWrapper>{children}</ContentWrapper>
      <SanityLive />
    </>
  );
}
