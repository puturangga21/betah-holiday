import { client } from '@/sanity/lib/client';

import ActivityCard, { Activity } from '@/components/custom/activity-card';

const query = `
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
  }`;

const options = { next: { revalidate: 30 } };

export default async function AllActivities() {
  const activities = await client.fetch<Activity[]>(query, {}, options);

  return (
    <div className="space-y-4">
      <h1 className="text-foreground text-2xl font-black md:text-3xl">
        Unforgettable travel experiences
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {activities.map((activities) => (
          <ActivityCard
            data={activities}
            key={activities._id}
          />
        ))}
      </div>
    </div>
  );
}
