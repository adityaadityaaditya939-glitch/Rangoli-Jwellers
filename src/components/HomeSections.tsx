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

  useEffect(() => {
    fetch("/api/products?featured=true")
      .then((res) => res.json())
      .then((data) => setProducts(data.products?.slice(0, 4) || []))
      .catch(() => {});
  }, []);

  return (
    <>
      <section id="section-collections" className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-8">
        <SectionHeading
          title="Rangoli Collections"
          subtitle="Explore our newly launched collection"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left: Large Featured Card */}
          <Link
            href={`/catalog?category=gold`}
            className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-amber-50 to-amber-100 p-8 transition-all duration-300 hover:border-amber-300 hover:shadow-xl"
          >
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-200/50 text-amber-800">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">Gold Collection</h3>
                <p className="mt-3 text-sm text-gray-600 sm:text-base">Timeless elegance crafted in pure gold</p>
              </div>
              <div className="mt-6 flex items-center text-amber-800 transition-transform group-hover:translate-x-2">
                <span className="font-medium">Explore Collection</span>
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
          {/* Right: Two Stacked Cards */}
          <div className="grid grid-rows-2 gap-6">
            <Link
              href={`/catalog?category=diamond`}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-slate-50 to-slate-100 p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/50 text-slate-800">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 sm:text-2xl">Diamond Collection</h3>
                  <p className="mt-2 text-sm text-gray-600">Brilliance that lasts forever</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200/50 text-slate-800 transition-transform group-hover:translate-x-1 group-hover:scale-110">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
            <Link
              href={`/catalog?category=wedding`}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-rose-50 to-rose-100 p-6 transition-all duration-300 hover:border-rose-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-200/50 text-rose-800">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-gray-900 sm:text-2xl">Wedding Collection</h3>
                  <p className="mt-2 text-sm text-gray-600">Make your special day unforgettable</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-200/50 text-rose-800 transition-transform group-hover:translate-x-1 group-hover:scale-110">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section id="section-clothing" className="w-full">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-8">
          <SectionHeading title="Clothing Collection" subtitle="Traditional & Contemporary Wear" />
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
          subtitle="Jewellery pieces everyone's eyeing right now"
        />
        <div className="relative overflow-hidden rounded-3xl">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${trendingIndex * 100}%)` }}
          >
            {IMAGES.trending.map((src) => (
              <div key={src} className="relative min-w-full aspect-[16/10] sm:aspect-[16/9]">
                <Image 
                  src={src} 
                  alt="Trending jewellery" 
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {IMAGES.trending.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setTrendingIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === trendingIndex ? "w-6 bg-rangoli-maroon" : "w-2 bg-white/70"
                }`}
                aria-label={`Trending slide ${index + 1}`}
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
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-gradient-to-br p-8 transition-all duration-300 hover:shadow-xl aspect-[3/4] sm:aspect-[3/4] flex flex-col items-center justify-center text-center"
              style={{
                background: index === 0 
                  ? 'linear-gradient(to bottom right, #fdf2f8, #fce7f3)' 
                  : index === 1 
                  ? 'linear-gradient(to bottom right, #ecfdf5, #d1fae5)' 
                  : 'linear-gradient(to bottom right, #eff6ff, #dbeafe)'
              }}
            >
              <div className={`flex h-20 w-20 items-center justify-center rounded-full ${
                index === 0 
                  ? 'bg-pink-200/50 text-pink-800' 
                  : index === 1 
                  ? 'bg-emerald-200/50 text-emerald-800' 
                  : 'bg-blue-200/50 text-blue-800'
              }`}>
                {index === 0 && (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 012-4.444M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <h3 className="mt-6 font-serif text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                {cat.label}
              </h3>
              <p className="mt-3 text-sm text-gray-600 sm:text-base">
                {index === 0 ? 'Elegant designs for her' : index === 1 ? 'Sophisticated pieces for him' : 'Beautiful creations for all'}
              </p>
              <div className={`mt-6 flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                index === 0 
                  ? 'bg-pink-100 text-pink-800 group-hover:bg-pink-200' 
                  : index === 1 
                  ? 'bg-emerald-100 text-emerald-800 group-hover:bg-emerald-200' 
                  : 'bg-blue-100 text-blue-800 group-hover:bg-blue-200'
              }`}>
                <span>Shop Now</span>
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
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
        <SectionHeading title="Traditional Elegance" subtitle="Lehenga, Suits & Saree jewellery" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {TRADITIONAL_CATEGORIES.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/catalog?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-100 bg-gradient-to-br p-8 transition-all duration-300 hover:shadow-xl aspect-[3/4] flex flex-col items-center justify-center text-center"
              style={{
                background: index === 0 
                  ? 'linear-gradient(to bottom right, #fef3c7, #fde68a)' 
                  : index === 1 
                  ? 'linear-gradient(to bottom right, #fce7f3, #fbcfe8)' 
                  : 'linear-gradient(to bottom right, #ddd6fe, #c4b5fd)'
              }}
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${
                index === 0 
                  ? 'bg-amber-200/50 text-amber-800' 
                  : index === 1 
                  ? 'bg-pink-200/50 text-pink-800' 
                  : 'bg-violet-200/50 text-violet-800'
              }`}>
                {index === 0 && (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                )}
                {index === 1 && (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )}
                {index === 2 && (
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
              </div>
              <h3 className="mt-6 font-serif text-lg font-bold text-gray-900 sm:text-xl md:text-2xl">
                {cat.label}
              </h3>
              <p className="mt-3 text-sm text-gray-600 sm:text-base">
                {index === 0 ? 'Bridal lehenga essentials' : index === 1 ? 'Perfect for suits & occasions' : 'Complete your saree look'}
              </p>
              <div className={`mt-6 h-1 w-16 rounded-full transition-all group-hover:w-24 ${
                index === 0 
                  ? 'bg-amber-400' 
                  : index === 1 
                  ? 'bg-pink-400' 
                  : 'bg-violet-400'
              }`} />
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
              className={`h-2 rounded-full transition-all ${
                index === experienceIndex ? "w-6 bg-rangoli-maroon" : "w-2 bg-gray-300"
              }`}
              aria-label={`Experience slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
