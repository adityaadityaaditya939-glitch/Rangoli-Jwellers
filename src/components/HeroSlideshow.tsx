"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSlideshowProps {
  images: readonly string[];
  interval?: number;
}

export default function HeroSlideshow({
  images,
  interval = 5000,
}: HeroSlideshowProps) {
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
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={src}
              alt={`Hero Slide ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover scale-105"
              sizes="100vw"
            />

            {/* Luxury Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">

          <span className="mb-4 h-1 w-16 rounded-full bg-rangoli-gold"></span>

          <p className="text-xs uppercase tracking-[0.4em] text-rangoli-gold sm:text-sm">
            Since 1998 • Rohru
          </p>

          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Timeless Jewellery
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Discover handcrafted Gold, Diamond & Bridal Jewellery designed to
            celebrate every milestone with elegance.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              href="/catalog"
              className="rounded-full bg-rangoli-gold px-8 py-3 font-semibold text-black transition hover:scale-105 hover:shadow-xl"
            >
              Explore Collection
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/60 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-rangoli-maroon"
            >
              Book Consultation
            </Link>

          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 gap-6 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 shadow-2xl backdrop-blur-md sm:grid-cols-4">

            <div>
              <p className="text-2xl font-bold text-rangoli-gold">25+</p>
              <p className="text-xs uppercase tracking-wide text-white/80">
                Years
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-rangoli-gold">5000+</p>
              <p className="text-xs uppercase tracking-wide text-white/80">
                Customers
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-rangoli-gold">100%</p>
              <p className="text-xs uppercase tracking-wide text-white/80">
                Hallmarked
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-rangoli-gold">Premium</p>
              <p className="text-xs uppercase tracking-wide text-white/80">
                Quality
              </p>
            </div>

          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 flex flex-col items-center text-white/80">
            <span className="text-xs uppercase tracking-widest">
              Scroll
            </span>
            <div className="mt-2 h-8 w-[2px] animate-pulse bg-white"></div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              index === current
                ? "h-2 w-10 bg-rangoli-gold"
                : "h-2 w-2 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}