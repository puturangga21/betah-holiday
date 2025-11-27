'use client';

import React from 'react';

import { QUERY_DESTINATIONSResult } from '@/sanity.types';
import Autoplay from 'embla-carousel-autoplay';

import DestinationCard from '@/components/custom/destination-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface DestinationCarouselProps {
  data: QUERY_DESTINATIONSResult;
}

export default function DestinationsCarousel({
  data,
}: DestinationCarouselProps) {
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
        {data.map((destination) => (
          <CarouselItem
            key={destination._id}
            className="basis-1/2 md:basis-1/4 lg:basis-1/6">
            <DestinationCard data={destination} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
