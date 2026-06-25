"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
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
    <div className="mb-8 text-center">
      <h2 className="font-serif text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-gray-500 md:text-base">{subtitle}</p>}
    </div>
  );
}

function DiamondDivider() {
  return (
    <div className="my-10 flex items-center justify-center gap-4 px-8">
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
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <SectionHeading
          title="Rangoli Collections"
          subtitle="Explore our newly launched collection"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {IMAGES.collection.map((src, index) => (
            <Link
              key={src}
              href={`/catalog?category=${["gold", "diamond", "wedding"][index]}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl md:aspect-[3/4]"
            >
              <Image
                src={src}
                alt={`Collection ${index + 1}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-rangoli-cream py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Find Your Perfect Match" subtitle="Shop by Categories" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
                <p className="mt-3 font-serif text-sm font-medium text-gray-800 md:text-base">
                  {cat.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
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
              <div key={src} className="relative min-w-full aspect-[16/10]">
                <Image src={src} alt="Trending jewellery" fill className="object-cover" sizes="100vw" />
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
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <DiamondDivider />

      <section className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
        <SectionHeading title="Rangoli World" subtitle="A companion for every occasion" />
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {WORLD_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog?category=${cat.slug}`}
              className={`group relative overflow-hidden rounded-2xl ${
                cat.tall ? "row-span-2 aspect-[3/5]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-0 right-0 text-center font-serif text-lg text-white md:text-xl">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <SectionHeading title="Shop by Gender" subtitle="Curated picks for everyone" />
        <div className="grid gap-4 md:grid-cols-3">
          {GENDER_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog?gender=${cat.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
            >
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover transition group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute bottom-5 left-0 right-0 text-center font-serif text-xl text-white">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <p className="text-sm uppercase tracking-[0.25em] text-white/70">Gift of Choice</p>
          <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
            Perfect Gifts for Every Celebration
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            From festive surprises to wedding blessings — discover jewellery that speaks from the heart.
          </p>
          <Link
            href="/catalog?category=gifting"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-rangoli-maroon transition hover:bg-rangoli-cream"
          >
            Explore Gifting
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <SectionHeading title="Traditional Elegance" subtitle="Lehenga, Suits & Saree jewellery" />
        <div className="grid gap-4 md:grid-cols-3">
          {TRADITIONAL_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalog?category=${cat.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image src={cat.image} alt={cat.label} fill className="object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
              <span className="absolute inset-0 flex items-center justify-center font-serif text-xl text-white md:text-2xl">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <SectionHeading
          title="Rangoli Experience"
          subtitle="Find a boutique or book a consultation"
        />
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => openConsultation("experience")}
            className="group relative block w-full aspect-[16/10] overflow-hidden"
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
            className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-rangoli-cream/50"
          >
            <div>
              <p className="font-serif text-lg font-semibold text-gray-900">
                {EXPERIENCE_SLIDES[experienceIndex].title}
              </p>
              <p className="text-sm text-gray-500">
                {EXPERIENCE_SLIDES[experienceIndex].subtitle}
              </p>
            </div>
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="mt-4 flex justify-center gap-2">
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
