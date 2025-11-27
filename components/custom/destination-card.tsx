import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { urlFor } from '@/sanity/lib/image';

export interface Destination {
  _id: string;
  name: string;
  description: string;
  slug: string;
  image: string;
}

interface DestinationCardProps {
  data: Destination;
}

export default function DestinationCard({ data }: DestinationCardProps) {
  return (
    <Link
      href={`/destination/${data.slug}`}
      className="group relative block w-full overflow-hidden rounded-2xl">
      <div className="aspect-3/4 w-full overflow-hidden">
        <Image
          src={urlFor(data.image).width(400).height(533).url()}
          alt={data.name}
          width={400}
          height={533}
          className="bg-muted h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-transparent opacity-80" />

      <span className="bg-primary text-primary-foreground absolute top-3.5 left-3.5 px-2 text-xl font-black">
        {data.name}
      </span>
    </Link>
  );
}
