import { defineQuery } from 'next-sanity';

import { sanityFetch } from '@/sanity/lib/live';

import ActivityCard from '@/components/custom/activity-card';

const QUERY_ACTIVITIES = defineQuery(`
    *[_type == 'activity'] | order(_createdAt desc) {
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
    "image": image[0]
  }`);

export default async function AllActivities() {
  const { data: activities } = await sanityFetch({
    query: QUERY_ACTIVITIES,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-foreground text-2xl font-black md:text-3xl">
        Unforgettable travel experiences
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {activities.map((activity) => (
          <ActivityCard
            data={activity}
            key={activity._id}
          />
        ))}
      </div>
    </div>
  );
}
