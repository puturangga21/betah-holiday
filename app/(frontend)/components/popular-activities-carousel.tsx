'use client';

import React from 'react';

import Autoplay from 'embla-carousel-autoplay';

import ActivityCard, { Activity } from '@/components/custom/activity-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface PopularActivitiesCarouselProps {
  data: Activity[];
}

export default function PopularActivitiesCarousel({
  data,
}: PopularActivitiesCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full">
      <CarouselContent>
        {data.map((activity) => (
          <CarouselItem
            key={activity._id}
            className="basis-1/1 md:basis-1/3 lg:basis-1/4">
            {/* <DestinationCard data={destination} /> */}
            <ActivityCard data={activity} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
