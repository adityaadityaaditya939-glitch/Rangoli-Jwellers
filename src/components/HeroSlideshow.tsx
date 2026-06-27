"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSlideshowProps {
  images: readonly string[];
  interval?: number;
}

export default function HeroSlideshow({ images, interval = 5000 }: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [images.length, interval]);

  return (
    <section className="relative">
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
        {images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`${index + 1} hero slide`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          </div>
        ))}

        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-16 text-center text-white sm:pb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-white/80">Crafted in Rohru</p>
          <h1 className="mt-3 font-serif text-3xl font-bold sm:text-5xl lg:text-6xl">
            Timeless Jewellery
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/90 sm:text-base">
            Discover gold, diamond & bridal collections for every celebration
          </p>
          <Link
            href="/catalog"
            className="mt-6 inline-flex rounded bg-white px-8 py-3 text-sm font-semibold uppercase tracking-wider text-rangoli-maroon transition hover:bg-rangoli-cream"
          >
            Explore Now
          </Link>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all ${
              index === current
                ? "w-6 bg-rangoli-maroon"
                : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
