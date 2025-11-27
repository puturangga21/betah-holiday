import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Activity } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import { ArrowRight } from 'lucide-react';

import { Button } from '../ui/button';

interface PopularActivitesCardProps {
  data: Activity;
}

export default function ActivityCard({ data }: PopularActivitesCardProps) {
  return (
    <Link
      href={`/activity/${data.slug}`}
      className="group relative block h-full w-full overflow-hidden rounded-2xl border-2">
      <div className="aspect-video h-[188px] w-full overflow-hidden">
        <Image
          src={urlFor(data.image ?? '/placeholder.png')
            .width(600)
            .height(400)
            .url()}
          alt={data.title || 'Activity Image'}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-8 p-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-base font-semibold">{data.title}</span>
          <span className="text-muted-foreground line-clamp-2 text-xs font-normal">
            {data.description}
          </span>
        </div>

        <div className="flex items-start justify-between">
          <Button className="rounded-full text-sm">
            Book A Trip <ArrowRight />
          </Button>

          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Starting from</span>
            <span className="text-base font-bold">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: data.currency || 'IDR',
                maximumFractionDigits: 0,
              }).format(data.price ?? 0)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
