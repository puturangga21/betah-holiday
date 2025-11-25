import { Open_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';

export const nephilm = localFont({
  variable: '--font-nephilm',
  display: 'swap',
  src: [
    {
      path: '../lib/typeface/Nephilm.otf',
    },
  ],
});

export const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
});
