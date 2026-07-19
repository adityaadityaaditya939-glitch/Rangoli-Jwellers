"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CLOTHING_CATEGORIES,
  EXPERIENCE_SLIDES,
  GENDER_CATEGORIES,
  IMAGES,
  PERFECT_MATCH_CATEGORIES,
  TRADITIONAL_CATEGORIES,
  WORLD_CATEGORIES,
} from "@/lib/constants";
import { useConsultation } from "@/components/ConsultationProvider";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/db";

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8 px-2 text-center sm:mb-10 sm:px-4 md:px-0">
      <h2 className="font-serif text-xl font-bold text-gray-900 sm:text-2xl md:text-2xl lg:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 px-1 text-sm text-gray-500 sm:mt-3 sm:px-2 sm:text-base md:text-base md:px-0">{subtitle}</p>}
    </div>
  );
}

function DiamondDivider() {
  return (
    <div className="my-12 flex items-center justify-center gap-4 px-4 sm:my-16 sm:px-8">
      <div className="h-px flex-1 bg-gray-200" />
      <div className="h-3 w-3 rotate-45 border border-gray-300" />
      <div className="h-px flex-1 bg-gray-200" />
    </div>
  );
}

export default function HomeSections() {
  const { openConsultation } = useConsultation();
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);  
  const [touchStart, setTouchStart] = useState<number | null>(null);
const [touchEnd, setTouchEnd] = useState<number | null>(null);

const minSwipeDistance = 50;

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => setProducts(data.products?.slice(0, 4) || []))
      .catch(() => { });
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
  setTouchEnd(null);
  setTouchStart(e.targetTouches[0].clientX);
};

const onTouchMove = (e: React.TouchEvent) => {
  setTouchEnd(e.targetTouches[0].clientX);
};

const onTouchEnd = () => {
  if (!touchStart || !touchEnd) return;

  const distance = touchStart - touchEnd;

  // Swipe Left → Next
  if (distance > minSwipeDistance) {
    setTrendingIndex((prev) =>
      prev === IMAGES.trending.length - 1 ? 0 : prev + 1
    );
  }

  // Swipe Right → Previous
  if (distance < -minSwipeDistance) {
    setTrendingIndex((prev) =>
      prev === 0 ? IMAGES.trending.length - 1 : prev - 1
    );
  }
};

  return (
    <>
      <section
        id="section-collections"
        className="mx-auto max-w-7xl px-4 py-10 lg:px-8"
      >
        <SectionHeading
          title="Our Signature Jewelery Collection"
          subtitle="Discover timeless jewellery crafted with elegance, tradition and unmatched craftsmanship."
        />

        <div className="grid gap-5 lg:grid-cols-3">

          {/* Gold */}

          <Link
            href="/catalog?category=gold"
            className="group relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-none border-2 border-amber-200 lg:border-0"
          >
            <div className="relative aspect-[16/9] lg:aspect-[4/5]">

              <Image
                src="/images/Collec_Gold.jpg"
                alt="Gold Collection"
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:from-black lg:via-black/20 lg:to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">

                <p className="text-xs lg:text-sm uppercase tracking-[0.25em] lg:tracking-[0.35em] text-rangoli-gold">
                  Signature
                </p>

                <h3 className="mt-1 lg:mt-2 font-serif text-xl lg:text-3xl font-bold text-white">
                  Gold Jewellery
                </h3>

                <p className="mt-2 lg:mt-3 max-w-xs text-xs lg:text-sm leading-5 lg:leading-6 text-white/85 hidden lg:block">
                  Elegant necklaces, bangles and timeless pieces crafted in pure gold.
                </p>

                <div className="mt-4 lg:mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 lg:px-5 lg:py-3 text-xs lg:text-sm font-semibold text-white backdrop-blur-sm transition group-hover:bg-rangoli-gold group-hover:text-black">

                  Explore Collection

                  →

                </div>

              </div>

            </div>
          </Link>

          {/* Diamond */}

          <Link
            href="/catalog?category=diamond"
            className="group relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-none border-2 border-amber-200 lg:border-0"
          >
            <div className="relative aspect-[16/9] lg:aspect-[4/5]">

              <Image
                src="/images/Collec_Diamond.jpg"
                alt="Diamond Collection"
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:from-black lg:via-black/20 lg:to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">

                <p className="text-xs lg:text-sm uppercase tracking-[0.25em] lg:tracking-[0.35em] text-rangoli-gold">
                  Luxury
                </p>

                <h3 className="mt-1 lg:mt-2 font-serif text-xl lg:text-3xl font-bold text-white">
                  Diamond
                </h3>

                <p className="mt-2 lg:mt-3 text-xs lg:text-sm leading-5 lg:leading-6 text-white/85 hidden lg:block">
                  Sparkling brilliance crafted to celebrate life&apos;s finest moments.
                </p>

                <div className="mt-4 lg:mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 lg:px-5 lg:py-3 text-xs lg:text-sm font-semibold text-white backdrop-blur-sm transition group-hover:bg-rangoli-gold group-hover:text-black">

                  Discover

                  →

                </div>

              </div>

            </div>
          </Link>

          {/* Wedding */}

          <Link
            href="/catalog?category=wedding"
            className="group relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-lg lg:shadow-none border-2 border-amber-200 lg:border-0"
          >
            <div className="relative aspect-[16/9] lg:aspect-[4/5]">

              <Image
                src="/images/Collec_Wedding.jpg"
                alt="Wedding Collection"
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent lg:from-black lg:via-black/20 lg:to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-8">

                <p className="text-xs lg:text-sm uppercase tracking-[0.25em] lg:tracking-[0.35em] text-rangoli-gold">
                  Bridal
                </p>

                <h3 className="mt-1 lg:mt-2 font-serif text-xl lg:text-3xl font-bold text-white">
                  Wedding
                </h3>

                <p className="mt-2 lg:mt-3 text-xs lg:text-sm leading-5 lg:leading-6 text-white/85 hidden lg:block">
                  Beautiful bridal jewellery for unforgettable celebrations.
                </p>

                <div className="mt-4 lg:mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 lg:px-5 lg:py-3 text-xs lg:text-sm font-semibold text-white backdrop-blur-sm transition group-hover:bg-rangoli-gold group-hover:text-black">

                  View Collection

                  →

                </div>

              </div>

            </div>
          </Link>

        </div>
      </section>
      <section id="section-clothing" className="w-full">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 lg:px-8">
          <SectionHeading title="Clothing Collection" subtitle="Traditional & Contemporary Wear - Discover the rich heritage of Pahari culture with exquisite handwoven textiles, vibrant patterns, and timeless designs that celebrate the mountain traditions." />
        </div>
        {/* Mobile: Horizontal scroll cards, Desktop: Grid */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible">
            {CLOTHING_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/clothing?category=${cat.slug}`}
                className="group relative flex-shrink-0 w-[280px] sm:w-full overflow-hidden rounded-2xl border-2 border-gray-200 transition-all duration-300 hover:border-amber-400 sm:block"
                style={{
                  aspectRatio: cat.tall ? '3/4' : '1/1',
                  minHeight: cat.tall ? '350px' : '280px'
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:via-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <h3 className={`font-serif font-bold text-white ${cat.tall ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl md:text-2xl"}`}>
                    {cat.label}
                  </h3>
                  {cat.tall && (
                    <p className="mt-1 text-xs text-white/90 sm:text-sm md:text-base">Premium Collection</p>
                  )}
                  <div className="mt-3 flex items-center gap-2 text-amber-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 sm:mt-4">
                    <span className="text-xs font-medium sm:text-sm">Explore</span>
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-6 max-w-7xl px-4 text-center lg:px-8 sm:mt-8">
          <Link
            href="/clothing"
            className="inline-flex items-center gap-2 rounded-full bg-rangoli-maroon px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rangoli-maroon-dark sm:px-6 sm:py-3 sm:text-base"
          >
            <span>View All Clothing</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="bg-rangoli-cream py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Find Your Perfect Match" subtitle="Shop by Categories" />
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {PERFECT_MATCH_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="group text-center"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <p className="mt-3 px-1 font-serif text-sm font-medium text-gray-800 sm:text-base md:text-base">
                  {cat.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-8">
       <SectionHeading
  title="Trending Now"
  subtitle="Discover our latest arrivals and customer favourites."
/>

<div
  className="relative overflow-hidden rounded-[32px]"
  onTouchStart={onTouchStart}
  onTouchMove={onTouchMove}
  onTouchEnd={onTouchEnd}
>

  <div
    className="flex transition-transform duration-700"
    style={{
      transform: `translateX(-${trendingIndex * 100}%)`,
    }}
  >
    {IMAGES.trending.map((src) => (
      <div
        key={src}
        className="relative min-w-full aspect-[4/5] sm:aspect-[16/9]"
      >
        <Image
          src={src}
          alt="Trending Collection"
          fill
          className="object-cover"
          sizes="100vw"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

        {/* Text */}

       <div className="absolute inset-0 flex flex-col justify-end px-5 pb-8 sm:justify-center sm:px-14 sm:pb-0">

  <p className="text-[10px] uppercase tracking-[0.25em] text-rangoli-gold sm:text-sm sm:tracking-[0.35em]">
    New Collection
  </p>

  <h3 className="mt-2 max-w-xs font-serif text-2xl font-bold leading-tight text-white sm:mt-3 sm:max-w-xl sm:text-5xl">
    Discover Timeless Beauty
  </h3>

  <p className="mt-2 hidden max-w-lg text-sm leading-7 text-white/85 sm:block sm:text-base">
    Explore handcrafted jewellery designed for everyday elegance and unforgettable celebrations.
  </p>

  <Link
    href="/catalog"
    className="mt-5 inline-flex w-fit items-center rounded-full bg-rangoli-gold px-5 py-2 text-sm font-semibold text-black transition hover:scale-105 sm:mt-8 sm:px-7 sm:py-3 sm:text-base"
  >
            Explore Collection →
          </Link>

        </div>

      </div>
    ))}
  </div>

  {/* Indicators */}

  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">

    {IMAGES.trending.map((_, index) => (
      <button
        key={index}
        onClick={() => setTrendingIndex(index)}
        className={`transition-all ${
          trendingIndex === index
            ? "h-2 w-10 rounded-full bg-rangoli-gold"
            : "h-2 w-2 rounded-full bg-white/70"
        }`}
      />
    ))}

  </div>

</div>

        {products.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <DiamondDivider />

      <section id="section-world" className="w-full">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-8">
          <SectionHeading title="Rangoli World" subtitle="A companion for every occasion" />
        </div>
        {/* Mobile: Horizontal scroll cards, Desktop: Grid */}
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible">
            {WORLD_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalog?category=${cat.slug}`}
                className="group relative flex-shrink-0 w-[280px] sm:w-full overflow-hidden rounded-2xl border-2 border-gray-200 transition-all duration-300 hover:border-amber-400 sm:block"
                style={{
                  aspectRatio: cat.tall ? '3/4' : '1/1',
                  minHeight: cat.tall ? '350px' : '280px'
                }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:via-black/40" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                  <h3 className={`font-serif font-bold text-white ${cat.tall ? "text-xl sm:text-2xl md:text-3xl" : "text-lg sm:text-xl md:text-2xl"}`}>
                    {cat.label}
                  </h3>
                  {cat.tall && (
                    <p className="mt-1 text-xs text-white/90 sm:text-sm md:text-base">Premium Collection</p>
                  )}
                  <div className="mt-3 flex items-center gap-2 text-amber-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 sm:mt-4">
                    <span className="text-xs font-medium sm:text-sm">Explore</span>
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="section-gender" className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-8">
        <SectionHeading title="Shop by Gender" subtitle="Curated picks for everyone" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {GENDER_CATEGORIES.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/catalog?gender=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 transition-all duration-300 hover:border-amber-400 aspect-[3/4] sm:aspect-[3/4]"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:via-black/40" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-white sm:text-3xl">
                  {cat.label}
                </h3>
                <p className="mt-2 text-sm text-white/90 sm:text-base">
                  {index === 0 ? 'Elegant designs for her' : index === 1 ? 'Sophisticated pieces for him' : 'Beautiful creations for all'}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-amber-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <span className="text-sm font-medium">Shop Now</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark py-12 sm:py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white/70 sm:text-sm sm:tracking-[0.25em]">Gift of Choice</p>
          <h2 className="mt-2 font-serif text-xl font-bold sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">
            Perfect Gifts for Every Celebration
          </h2>
          <p className="mx-auto mt-3 max-w-2xl px-2 text-sm text-white/85 sm:mt-4 sm:text-base">
            From festive surprises to wedding blessings — discover jewellery that speaks from the heart.
          </p>
          <Link
            href="/catalog?category=gifting"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-2 text-xs font-semibold text-rangoli-maroon transition hover:bg-rangoli-cream sm:mt-8 sm:px-8 sm:py-3 sm:text-sm"
          >
            Explore Gifting
          </Link>
        </div>
      </section>

      <section id="section-traditional" className="mx-auto max-w-7xl px-4 py-10 pb-24 sm:py-14 lg:px-8">
        <SectionHeading title="Traditional Elegance" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {TRADITIONAL_CATEGORIES.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/catalog?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 transition-all duration-300 hover:border-amber-400 aspect-[3/4]"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/80 group-hover:via-black/40" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
                  {cat.label}
                </h3>
                <p className="mt-2 text-sm text-white/90 sm:text-base">
                  {index === 0 ? 'Exquisite bridal wear' : index === 1 ? 'Elegant occasion wear' : 'Timeless ethnic fashion'}
                </p>
                <div className={`mt-4 h-1 w-16 mx-auto rounded-full transition-all group-hover:w-24 ${index === 0
                    ? 'bg-amber-400'
                    : index === 1
                      ? 'bg-pink-400'
                      : 'bg-violet-400'
                  }`} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-8">
        <SectionHeading
          title="Rangoli Experience"
          subtitle="Find a boutique or book a consultation"
        />
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => openConsultation("experience")}
            className="group relative block w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden"
          >
            <Image
              src={EXPERIENCE_SLIDES[experienceIndex].image}
              alt={EXPERIENCE_SLIDES[experienceIndex].title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="100vw"
            />
          </button>
          <button
            type="button"
            onClick={() => openConsultation("experience")}
            className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-rangoli-cream/50 sm:px-6 sm:py-4"
          >
            <div>
              <p className="font-serif text-base font-semibold text-gray-900 sm:text-lg">
                {EXPERIENCE_SLIDES[experienceIndex].title}
              </p>
              <p className="text-xs text-gray-500 sm:text-sm">
                {EXPERIENCE_SLIDES[experienceIndex].subtitle}
              </p>
            </div>
            <svg className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-2 sm:mt-6">
          {EXPERIENCE_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setExperienceIndex(index)}
              className={`h-2 rounded-full transition-all ${index === experienceIndex ? "w-6 bg-rangoli-maroon" : "w-2 bg-gray-300"
                }`}
              aria-label={`Experience slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
