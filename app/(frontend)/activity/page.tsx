import React, { cache } from 'react';

import { Metadata } from 'next';
import Link from 'next/link';

import { cn, formatSlugToTitle } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/live';
import { QUERY_ALL_ACTIVITIES, QUERY_CATEGORIES } from '@/sanity/lib/queries';

import ActivityCard from '@/components/custom/activity-card';
import Container from '@/components/layout/container';

import Destinations from '../components/destinations';

type PageProps = {
  searchParams: Promise<{ category: string }>;
};

const getActivity = cache(async (category: string) => {
  const { data: activities } = await sanityFetch({
    query: QUERY_ALL_ACTIVITIES,
    params: { category: category || null },
  });
  return activities;
});

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { category } = await searchParams;
  const activities = await getActivity(category);

  const locationContext = 'Bali';
  const brandName = 'Betah Holiday';

  const title = category
    ? `Top ${formatSlugToTitle(category)} Activities in ${locationContext} | ${brandName}`
    : `Best Things to Do in ${locationContext} - All Activities | ${brandName}`;

  const description = category
    ? `Browse ${activities.length} best ${formatSlugToTitle(category)} experiences in ${locationContext}. Book your tickets now with ${brandName}.`
    : `Discover ${activities.length} curated activities and tours in ${locationContext}. From adventure to relaxation, find your perfect holiday with ${brandName}.`;

  return {
    title,
    description,
    keywords: [
      'activities',
      'tours',
      'adventure',
      'relaxation',
      'holiday',
      'vacation',
      'travel',
      'bali',
      'indonesia',
    ],
    alternates: {
      canonical: category ? `/activity?category=${category}` : '/activity',
    },
  };
}

export default async function Page({ searchParams }: PageProps) {
  const { category } = await searchParams;

  const { data: categories } = await sanityFetch({
    query: QUERY_CATEGORIES,
  });

  const activities = await getActivity(category);

  return (
    <main>
      <section className="mt-6">
        <Container className="space-y-8 pb-20 md:space-y-14">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {category
                  ? `${formatSlugToTitle(category)} Activities`
                  : 'All Holiday Activities'}
              </h1>
              <p className="text-muted-foreground mt-2 text-lg">
                {category
                  ? `Explore our selection of ${formatSlugToTitle(category)} tours and experiences.`
                  : 'Find the best tours, attractions, and things to do for your trip.'}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href={`/activity`}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  !category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}>
                All
              </Link>

              {categories.map((cat) => {
                const isActive = category === cat.slug;
                return (
                  <Link
                    key={cat._id}
                    href={`/activity?category=${cat.slug}`}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    )}>
                    {cat.name}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-foreground text-sm font-medium">
                Showing {activities.length} result
                {activities.length !== 1 && 's'}
                {category && ` for ${formatSlugToTitle(category)}`}
              </span>

              {activities.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {activities.map((activity) => (
                    <ActivityCard
                      key={activity._id}
                      data={activity}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <p className="text-lg font-semibold text-gray-600">
                    No activities found for {formatSlugToTitle(category)}.
                  </p>
                  <Link
                    href="/activity"
                    className="text-primary mt-2 hover:underline">
                    Clear filters
                  </Link>
                </div>
              )}
            </div>
          </div>

          <Destinations />
        </Container>
      </section>
    </main>
  );
}
