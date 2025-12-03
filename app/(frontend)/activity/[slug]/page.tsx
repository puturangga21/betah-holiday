import { cache } from 'react';

import { Metadata, ResolvingMetadata } from 'next';
import { redirect } from 'next/navigation';

import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import {
  QUERY_ACTIVITY_BY_SLUG,
  QUERY_POPULAR_ACTIVITIES,
} from '@/sanity/lib/queries';
import {
  BadgeCheck,
  CalendarCheck,
  CreditCard,
  History,
  UserSearch,
} from 'lucide-react';

import ActivityCard from '@/components/custom/activity-card';
import Container from '@/components/layout/container';

import FormActivity from './form';
import Gallery from './gallery';

type PageProps = {
  params: Promise<{ slug: string }>;
};

const getActivity = cache(async (slug: string) => {
  const { data: activity } = await sanityFetch({
    query: QUERY_ACTIVITY_BY_SLUG,
    params: { slug },
  });
  return activity;
});

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const activity = await getActivity(slug);

  if (!activity) {
    return {
      title: 'Activity Not Found',
    };
  }

  const previouseImages = (await parent).openGraph?.images || [];
  const ogImage = activity.image?.[0]
    ? urlFor(activity.image[0]).width(1200).height(630).url()
    : previouseImages[0];

  const priceFormatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: activity.currency || 'IDR',
    maximumFractionDigits: 0,
  }).format(activity.price ?? 0);

  return {
    title: `${activity.title} - Book Online | Betah Holiday`,
    description: `Book ${activity.title}. Duration: ${activity.duration}. Price starts from ${priceFormatted}. ${activity.description?.slice(0, 100)}...`,
    openGraph: {
      title: activity.title || '',
      description: `Book ${activity.title} - Best Price Guarantee.`,
      images: [ogImage as string],
      type: 'website',
    },
  };
}

export default async function ActivityPage({ params }: PageProps) {
  const { slug } = await params;

  const activityData = getActivity(slug);
  const popularData = await sanityFetch({ query: QUERY_POPULAR_ACTIVITIES });

  const [activity, { data: popularActivities }] = await Promise.all([
    activityData,
    popularData,
  ]);

  if (!activity) return redirect('/');

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: activity.title,
    image: activity.image?.[0] ? urlFor(activity.image[0]).url() : undefined,
    description: activity.description,
    brand: {
      '@type': 'Brand',
      name: 'Betah Holiday',
    },
    offers: {
      '@type': 'Offer',
      url: `https://betahholiday.com/activity/${slug}`, // Ganti domain
      priceCurrency: activity.currency || 'IDR',
      price: activity.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <section className="mt-4 lg:mt-14">
        <Container className="space-y-8 pb-20 lg:space-y-14">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold">{activity.title}</h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-8">
              {/* gambar */}

              <Gallery
                images={activity.image || []}
                title={activity.title || ''}
              />

              {/* form */}
              <div className="col-span-1 md:col-span-3">
                <div className="flex flex-col gap-4 rounded-xl border px-5 py-7">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm">From</span>
                    <span className="flex items-center gap-3 text-2xl font-bold">
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: activity.currency || 'IDR',
                        maximumFractionDigits: 0,
                      }).format(activity.price ?? 0)}{' '}
                      <span className="text-sm font-normal">per person</span>
                    </span>
                  </div>

                  <FormActivity title={activity.title || ''} />

                  <hr />

                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-2">
                      <BadgeCheck
                        size={20}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-sm font-medium">
                          Free cancellation
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                          Cancel up to 24 hours in advance for a full refund
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <BadgeCheck
                        size={20}
                        className="text-primary mt-0.5 shrink-0"
                      />
                      <div className="flex flex-col items-start gap-0.5">
                        <span className="text-sm font-medium">
                          Reserve now & pay later
                        </span>
                        <span className="text-muted-foreground text-sm font-medium">
                          Keep your travel plans flexible — book your spot and
                          pay nothing today
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* description */}
            <p className="w-full text-base font-normal md:max-w-[60%]">
              Begin with rafting on the Telaga Waja River, followed by
              relaxation at Bali Green SPA, where you can enjoy a traditional
              Balinese massage after your adventure. Afterward, you can also
              shop for Balinese souvenirs at the Krisna shopping center. For
              more details, visit the official Telaga Waja Rafting Tour page.
            </p>

            {/* <p className="w-full text-base font-normal xl:max-w-[60%]">
              {activity.description}
            </p> */}

            <div className="flex flex-col gap-4">
              <span className="text-base font-bold">About this activity</span>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <CalendarCheck
                    size={20}
                    className="text-foreground mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-sm font-medium">
                      Free cancellation
                    </span>
                    <span className="text-muted-foreground text-sm font-medium">
                      Cancel up to 24 hours in advance for a full refund
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CreditCard
                    size={20}
                    className="text-foreground mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-sm font-medium">
                      Reserve now & pay later
                    </span>
                    <span className="text-muted-foreground text-sm font-medium">
                      Keep your travel plans flexible — book your spot and pay
                      nothing today
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <History
                    size={20}
                    className="text-foreground mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-sm font-medium">
                      Duration {activity.duration}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium">
                      Check availability to see starting times
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <UserSearch
                    size={20}
                    className="text-foreground mt-0.5 shrink-0"
                  />
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-sm font-medium">Live tour guide</span>
                    <span className="text-muted-foreground text-sm font-medium">
                      English, Bahasa Indonesia
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div className="flex w-full flex-col gap-6 md:max-w-[60%]">
              <div className="flex w-full flex-col items-start gap-4 md:flex-row md:gap-24">
                <span className="w-full text-base font-bold md:w-[150px]">
                  Highlights
                </span>

                <ul className="list-inside list-disc">
                  {activity.highlights &&
                    activity.highlights.map((item: string) => (
                      <li
                        className="text-sm font-medium"
                        key={item}>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>

              <hr />

              <div className="flex w-full flex-col items-start gap-4 md:flex-row md:gap-24">
                <span className="w-full text-base font-bold md:w-[150px]">
                  Important Information
                </span>

                <div className="flex flex-col gap-1">
                  <span className="text-base font-bold">What to bring</span>
                  <ul className="list-inside list-disc">
                    {activity.whatToBring &&
                      activity.whatToBring.map((item: string) => (
                        <li
                          className="text-sm font-medium"
                          key={item}>
                          {item}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-foreground text-2xl font-black md:text-3xl">
              You might also like...
            </h1>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {popularActivities.map((item) => (
                <ActivityCard
                  data={item}
                  key={item._id}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
