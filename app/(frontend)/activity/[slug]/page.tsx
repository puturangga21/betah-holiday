// app/activity/[slug]/page.tsx
import { notFound } from 'next/navigation';
import mockData from '@/lib/mockdata.json';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ActivityPage({ params }: PageProps) {
  const { slug } = await params;

  // Cari 1 aktivitas berdasarkan slug
  const activity = mockData.activities.find((a) => a.slug === slug);

  if (!activity) return notFound();

  return (
    <main className="p-8">
      {/* Header Image & Title */}
      <h1 className="text-3xl font-bold">{activity.title}</h1>
      <p className="text-xl text-green-600 my-2">Rp {activity.price.toLocaleString()}</p>

      {/* Highlight & Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h2 className="font-bold text-lg mb-2">Description</h2>
          <p>{activity.description}</p>

          <h2 className="font-bold text-lg mt-4 mb-2">Highlights</h2>
          <ul className="list-disc pl-5">
            {activity.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>

        {/* Booking Card Area (Sesuai Desain Kanan) */}
        <div className="border p-6 rounded shadow-lg h-fit">
          <p className="font-bold mb-4">Book This Trip</p>
          <button className="bg-green-600 text-white w-full py-2 rounded">
            Reserve Now
          </button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            {activity.cancellationPolicy}
          </p>
        </div>
      </div>
    </main>
  );
}
