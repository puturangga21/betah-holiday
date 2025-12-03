'use client';

import React from 'react';

import Image from 'next/image';

import { urlFor } from '@/sanity/lib/image';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lightgallery.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';

interface GalleryProps {
  images: SanityImageSource[];
  title: string;
}

export default function Gallery({ images, title }: GalleryProps) {
  if (!images || images.length === 0) return null;

  const totalImages = images.length;
  const remainingImages = totalImages - 3;

  return (
    <LightGallery
      speed={500}
      plugins={[lgZoom, lgThumbnail]}
      elementClassNames="col-span-1 md:col-span-5"
      selector="a">
      <div className="flex h-[400px] w-full flex-col gap-4 md:flex-row">
        <a
          href={urlFor(images[0]).url()}
          className="relative h-full w-full overflow-hidden rounded-2xl md:w-[60%]">
          <Image
            src={urlFor(images[0]).width(800).height(600).url()}
            alt={`${title} - 1`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </a>

        <div className="flex h-full w-full flex-row gap-4 md:w-[40%] md:flex-col">
          {images[1] && (
            <a
              href={urlFor(images[1]).url()}
              className="relative h-full w-full overflow-hidden rounded-2xl md:h-1/2">
              <Image
                src={urlFor(images[1]).width(400).height(300).url()}
                alt={`${title} - 2`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </a>
          )}

          {images[2] && (
            <a
              href={urlFor(images[2]).url()}
              className="relative h-full w-full overflow-hidden rounded-2xl md:h-1/2">
              <Image
                src={urlFor(images[2]).width(400).height(300).url()}
                alt={`${title} - 3`}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />

              {remainingImages > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-colors">
                  <span className="text-xl font-bold text-white md:text-2xl">
                    +{remainingImages} Photos
                  </span>
                </div>
              )}
            </a>
          )}

          {images.slice(3).map((img, index) => (
            <a
              key={index}
              href={urlFor(img).url()}
              className="hidden">
              <Image
                src={urlFor(img).width(800).height(600).url()}
                alt={`${title} - ${index + 4}`}
                width={800}
                height={600}
              />
            </a>
          ))}
        </div>
      </div>
    </LightGallery>
  );
}
