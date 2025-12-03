import { Metadata } from 'next';

import Container from '@/components/layout/container';

import AllActivities from './components/all-activities';
import Destinations from './components/destinations';
import Hero from './components/hero';
import PopularActivities from './components/popular-activities';

export const metadata: Metadata = {
  title: 'Betah Holiday - Best Tours, Activities & Travel Experiences in Bali',
  description:
    'Explore and book top-rated activities, tours, and holiday packages in Bali with Betah Holiday. Unforgettable experiences await you. Verified & Best Price.',
  keywords: [
    'Bali tours',
    'holiday activities',
    'travel agency',
    'water sport bali',
    'nusa penida trip',
    'betah holiday',
  ],
  openGraph: {
    title: 'Betah Holiday - Your Gateway to Bali Adventures',
    description:
      'Find the best holiday activities in Bali. Book now for exclusive offers!',
    siteName: 'Betah Holiday',
    images: [
      {
        url: '/home-background.png',
        width: 1200,
        height: 630,
        alt: 'Betah Holiday Hero Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Betah Holiday',
    image: '/home-background.png',
    description:
      'Explore and book top-rated activities, tours, and holiday packages in Bali.',
    url: '/',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bali',
      addressCountry: 'ID',
    },
    priceRange: 'Rp 100.000 - Rp 500.000',
  };

  return (
    <main className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative h-screen w-full bg-[url(/home-background.png)] bg-cover bg-center">
        <Container className="relative z-10 h-full">
          <Hero />
        </Container>
      </section>

      <section className="bg-background w-full py-14">
        <Container className="space-y-14">
          <PopularActivities />

          <Destinations />

          <AllActivities />
        </Container>
      </section>
    </main>
  );
}
