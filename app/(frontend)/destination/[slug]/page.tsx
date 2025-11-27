import Link from 'next/link';
import { redirect } from 'next/navigation';

import mockData from '@/lib/mockdata.json';

// Import ini

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const destination = mockData.destinations.find((d) => d.slug === slug);

  if (!destination) {
    redirect('/');
  }

  const activities = mockData.activities.filter(
    (a) => a.destinationId === destination.id
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">
        List activities in {destination.name}
      </h1>

      <ul className="mt-4 space-y-4">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <li
              key={activity.id}
              className="rounded border p-4 hover:bg-gray-50">
              <Link
                href={`/activity/${activity.slug}`}
                className="flex flex-col">
                <span className="font-semibold">{activity.title}</span>
                <span className="line-clamp-2 text-sm text-gray-600">
                  {activity.description}
                </span>
                <span className="mt-2 text-green-600">
                  Rp {activity.price.toLocaleString()}
                </span>
              </Link>
            </li>
          ))
        ) : (
          <p>No activities found for this destination.</p>
        )}
      </ul>
    </div>
  );
}
