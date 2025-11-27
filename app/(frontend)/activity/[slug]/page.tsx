// app/activity/[slug]/page.tsx
import { notFound } from 'next/navigation';

import mockData from '@/lib/mockdata.json';

import Container from '@/components/layout/container';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ActivityPage({ params }: PageProps) {
  const { slug } = await params;

  // Cari 1 aktivitas berdasarkan slug
  const activity = mockData.activities.find((a) => a.slug === slug);

  if (!activity) return notFound();

  return (
    <main>
      <section className="pt-32">
        <Container>
          {/* Header Image & Title */}
          <h1 className="text-3xl font-bold">{activity.title}</h1>
          <p className="my-2 text-xl text-green-600">
            Rp {activity.price.toLocaleString()}
          </p>

          {/* Highlight & Description */}
          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-2 text-lg font-bold">Description</h2>
              <p>{activity.description}</p>

              <h2 className="mt-4 mb-2 text-lg font-bold">Highlights</h2>
              <ul className="list-disc pl-5">
                {activity.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Booking Card Area (Sesuai Desain Kanan) */}
            <div className="h-fit rounded border p-6 shadow-lg">
              <p className="mb-4 font-bold">Book This Trip</p>
              <button className="w-full rounded bg-green-600 py-2 text-white">
                Reserve Now
              </button>
              <p className="mt-2 text-center text-xs text-gray-500">
                {activity.cancellationPolicy}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
