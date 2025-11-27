import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/live';

import DestinationsCarousel from './destinations-carousel';

const QUERY_DESTINATIONS = defineQuery(`
    *[_type == 'destination'] | order(_createdAt desc) {
    _id,
    name,
    description,
    "slug": slug.current,
    image
  }`);

export default async function Destinations() {
  const { data: destinations } = await sanityFetch({
    query: QUERY_DESTINATIONS,
  });

  return (
    <div
      id="destinations"
      className="space-y-4">
      <h1 className="text-foreground text-2xl font-black md:text-3xl">
        Things to do wherever you&apos;re going
      </h1>

      <DestinationsCarousel data={destinations} />
    </div>
  );
}
