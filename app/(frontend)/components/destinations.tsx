import { client } from '@/sanity/lib/client';

import { Destination } from '@/components/custom/destination-card';

import DestinationsCarousel from './destinations-carousel';

const query = `
  *[_type == 'destination'] | order(_createdAt desc) {
  _id,
  name,
  description,
  "slug": slug.current,
  image
  }`;

const options = { next: { revalidate: 30 } };

export default async function Destinations() {
  const destinations = await client.fetch<Destination[]>(query, {}, options);

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
