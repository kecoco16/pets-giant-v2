'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { GridTileImage } from 'components/grid/tile';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function Gallery({
  images,
  heroImage = false,
  showPreview = true,
  autoPlay = false
}: {
  images: { src: string; altText: string }[];
  heroImage?: boolean;
  showPreview?: boolean;
  autoPlay?: boolean;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function handleNavigate(direction: 'next' | 'previous') {
    if (direction === 'next') {
      setCurrentImageIndex(currentImageIndex + 1 < images.length ? currentImageIndex + 1 : 0);
    } else {
      setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
    }
  }

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        handleNavigate('next');
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [autoPlay, handleNavigate]);

  const buttonClassName =
    'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white';

  return (
    <div
      className={clsx('h-full', {
        'mr-8': !heroImage
      })}
    >
      <div
        className={clsx(`mb-12 h-full max-h-[${heroImage ? '1000px' : '550px'}] overflow-hidden`, {
          relative: !heroImage
        })}
      >
        {images[currentImageIndex] && (
          <Image
            className={clsx('h-full w-full object-contain', {
              relative: !heroImage
            })}
            width={heroImage ? 1920 : 600}
            height={heroImage ? 1080 : 600}
            alt={images[currentImageIndex]?.altText as string}
            src={images[currentImageIndex]?.src as string}
            priority={true}
          />
        )}

        {images.length > 1 && !autoPlay ? (
          <div className="absolute bottom-[15%] flex w-full justify-center">
            <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
              <button
                aria-label="Previous product image"
                onClick={() => handleNavigate('previous')}
                className={buttonClassName}
              >
                <ArrowLeftIcon className="h-5" />
              </button>
              <div className="mx-1 h-6 w-px bg-neutral-500"></div>
              <button
                aria-label="Next product image"
                onClick={() => handleNavigate('next')}
                className={buttonClassName}
              >
                <ArrowRightIcon className="h-5" />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {images.length > 1 && showPreview ? (
        <div className="flex items-center justify-center gap-2 overflow-auto py-1">
          {images.map((image, index) => {
            const isActive = index === currentImageIndex;
            return (
              <button
                aria-label="Enlarge product image"
                key={image.src}
                className="h-auto w-20"
                onClick={() => setCurrentImageIndex(index)}
              >
                <GridTileImage
                  alt={image.altText}
                  src={image.src}
                  width={600}
                  height={600}
                  active={isActive}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
