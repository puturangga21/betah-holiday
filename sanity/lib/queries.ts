import { defineQuery } from 'next-sanity';

export const QUERY_POPULAR_ACTIVITIES = defineQuery(`
    *[_type == 'activity' && isPopular == true] | order(_createdAt desc) [0...5] {
    _id,
    title,
    "slug": slug.current,
    price,
    currency,
    description,
    "destination": destination->{
      name,
      "slug": slug.current,
      },
    "categories": categories[]->{
      name
      },
    "image": image[0],
  }`);

export const QUERY_ALL_ACTIVITIES = defineQuery(`
    *[_type == 'activity' &&
    (!defined($category) || $category in categories[]->slug.current)] 
    | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    price,
    currency,
    description,
    "destination": destination->{ name, "slug": slug.current },
    "categories": categories[]->{ name, "slug": slug.current },
    "image": image[0]
  }`);

export const QUERY_ACTIVITY_BY_SLUG = defineQuery(`
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

export const QUERY_DESTINATIONS = defineQuery(`
    *[_type == 'destination'] | order(_createdAt desc) {
    _id,
    name,
    description,
    "slug": slug.current,
    image
  }`);

export const QUERY_ACTIVITY_BY_DESTINATION = defineQuery(`
  *[_type == 'activity' && 
  destination->slug.current == $slug &&
  (!defined($category) || $category in categories[]->slug.current)
  ] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  currency,
  description,
  "image": image[0],
  "destination": destination->{ name, "slug": slug.current },
  "categories": categories[]->{ name, "slug": slug.current }
}`);

export const QUERY_CATEGORIES = defineQuery(`
  *[_type == 'category'] {
  _id,
  name,
  "slug": slug.current
}`);
