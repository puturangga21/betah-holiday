import { defineQuery } from 'next-sanity';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import {
  BadgeCheck,
  Calendar,
  CalendarCheck,
  CreditCard,
  History,
  UserSearch,
  Users,
} from 'lucide-react';

import Container from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';

const QUERY_ACTIVITY = defineQuery(`
  *[_type == "activity" && slug.current == $slug][0] {
    _id,
    title,
    image,
    description,
    price,
    currency,
    duration,
    meetingPoint,
    cancellationPolicy,
    highlights,
    whatToBring
  }
`);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ActivityPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: activity } = await sanityFetch({
    query: QUERY_ACTIVITY,
    params: { slug },
  });

  if (!activity) return redirect('/');

  return (
    <main>
      <section className="mt-4 lg:mt-14">
        <Container>
          <div>
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold">{activity.title}</h1>

              <div className="grid grid-cols-1 gap-8 lg:grid-cols-8">
                {/* gambar */}
                <div className="col-span-1 lg:col-span-5">
                  <div className="flex h-[400px] w-full flex-col gap-4 lg:flex-row">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl lg:w-[60%]">
                      {activity.image?.[0] && (
                        <Image
                          src={urlFor(activity.image[0])
                            .width(800)
                            .height(600)
                            .url()}
                          alt={activity.title || 'Activity Image'}
                          fill
                          className="object-cover"
                          priority
                        />
                      )}
                    </div>

                    {/* Kolom Gambar Samping */}
                    <div className="flex h-full w-full flex-row gap-4 lg:w-[40%] lg:flex-col">
                      {/* Gambar Samping Atas */}
                      <div className="relative h-full w-full overflow-hidden rounded-2xl lg:h-1/2">
                        {activity.image?.[1] && (
                          <Image
                            src={urlFor(activity.image[1])
                              .width(400)
                              .height(300)
                              .url()}
                            alt={activity.title || 'Activity Detail 1'}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>

                      {/* Gambar Samping Bawah */}
                      <div className="relative h-full w-full overflow-hidden rounded-2xl lg:h-1/2">
                        {activity.image?.[2] && (
                          <Image
                            src={urlFor(activity.image[2])
                              .width(400)
                              .height(300)
                              .url()}
                            alt={activity.title || 'Activity Detail 2'}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* form */}
                <div className="col-span-1 lg:col-span-3">
                  <div className="flex flex-col gap-4 rounded-xl border px-5 py-7">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground text-sm">
                        From
                      </span>
                      <span className="flex items-center gap-3 text-2xl font-bold">
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: activity.currency || 'IDR',
                          maximumFractionDigits: 0,
                        }).format(activity.price ?? 0)}{' '}
                        <span className="text-sm font-normal">per person</span>
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <InputGroup className="h-10 gap-4 rounded-full">
                        <InputGroupInput placeholder="Adult 1x" />
                        <InputGroupAddon>
                          <Users />
                        </InputGroupAddon>
                      </InputGroup>

                      <InputGroup className="h-10 gap-4 rounded-full">
                        <InputGroupInput placeholder="24 November 2025" />
                        <InputGroupAddon>
                          <Calendar />
                        </InputGroupAddon>
                      </InputGroup>

                      <Button className="h-10 w-full rounded-full">
                        Check availability
                      </Button>
                    </div>

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
              <p className="w-full text-base font-normal lg:max-w-[60%]">
                Begin with rafting on the Telaga Waja River, followed by
                relaxation at Bali Green SPA, where you can enjoy a traditional
                Balinese massage after your adventure. Afterward, you can also
                shop for Balinese souvenirs at the Krisna shopping center. For
                more details, visit the official Telaga Waja Rafting Tour page.
              </p>

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
                      <span className="text-sm font-medium">
                        Live tour guide
                      </span>
                      <span className="text-muted-foreground text-sm font-medium">
                        English, Bahasa Indonesia
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              <div className="flex w-full flex-col gap-6 lg:max-w-[60%]">
                <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:gap-24">
                  <span className="w-full text-base font-bold lg:w-[150px]">
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

                <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:gap-24">
                  <span className="w-full text-base font-bold lg:w-[150px]">
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
          </div>
        </Container>
      </section>
    </main>
  );
}
