import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/live';

import PopularActivitiesCarousel from './popular-activities-carousel';

const QUERY_POPULAR_ACTIVITIES = defineQuery(`
    *[_type == 'activity' && isPopular == true] | order(_createdAt desc) [0...5] {
    _id,
    title,
    "slug": slug.current,
    price,
    currency,
    description,
    "destination": destination->{
      name,
      "slug": slug.current,
      },
    "categories": categories[]->{
      name
      },
    "image": image[0],
  }`);

export default async function PopularActivities() {
  const { data: activities } = await sanityFetch({
    query: QUERY_POPULAR_ACTIVITIES,
  });

  return (
    <div
      id="activities"
      className="space-y-4">
      <h1 className="text-foreground text-2xl font-black md:text-3xl">
        Most popular activities
      </h1>

      <PopularActivitiesCarousel data={activities} />
    </div>
  );
}
