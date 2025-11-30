import { sanityFetch } from '@/sanity/lib/live';
import { QUERY_POPULAR_ACTIVITIES } from '@/sanity/lib/queries';

import PopularActivitiesCarousel from './popular-activities-carousel';

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
