import Link from 'next/link';

import mockData from '@/lib/mockdata.json';

export default function Home() {
  return (
    <main className="space-y-8 p-8">
      <div>
        <h1>Destinations</h1>
        <ul>
          {mockData.destinations.map((destination) => (
            <li key={destination.id}>
              <Link href={`/destination/${destination.slug}`}>{destination.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>All Activites</h1>
        <ul>
          {mockData.activities.map((activity) => (
            <li key={activity.id}>
              <Link href={`/activity/${activity.slug}`}>{activity.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
