import { client } from '@/sanity/lib/client';

import { Activity } from '@/components/custom/activity-card';

import PopularActivitiesCarousel from './popular-activities-carousel';

const query = `
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
  }`;

const options = { next: { revalidate: 30 } };

export default async function PopularActivities() {
  const activities = await client.fetch<Activity[]>(query, {}, options);

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
