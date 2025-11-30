import { sanityFetch } from '@/sanity/lib/live';
import { QUERY_ALL_ACTIVITIES } from '@/sanity/lib/queries';

import ActivityCard from '@/components/custom/activity-card';

export default async function AllActivities() {
  const { data: activities } = await sanityFetch({
    query: QUERY_ALL_ACTIVITIES,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-foreground text-2xl font-black md:text-3xl">
        Unforgettable travel experiences
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
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
