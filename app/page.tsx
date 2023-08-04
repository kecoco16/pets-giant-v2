import { Carousel } from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import Footer from 'components/layout/footer';
import { Gallery } from 'components/product/gallery';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};

const images = [
  { src: '/images/counter.png', altText: 'counter' },
  { src: '/images/kitchen-countertop.png', altText: 'kitchen counter top' },
  {
    src: '/images/sunrise-teak-decking-second.png',
    altText: 'sunrise-teak-decking-second'
  },
  { src: '/images/sunrise-teak-decking.png', altText: 'sunrise-teak-decking' },
  { src: '/images/teak-countertop.png', altText: 'teak-countertop' }
];

export default async function HomePage() {
  return (
    <>
      <Gallery heroImage autoPlay showPreview={false} images={images} />
      <ThreeItemGrid />
      <Suspense>
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
