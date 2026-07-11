"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { NAV_CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/db";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function CatalogPageClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const gender = searchParams.get("gender");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        let items: Product[] = data.products || [];
        if (gender) {
          items = items.filter((p) => p.gender === gender);
        }
        setAllProducts(items);
        // Shuffle only for "all" category initially
        if (category === "all" && !gender) {
          setDisplayProducts(shuffleArray(items));
        } else {
          setDisplayProducts(items);
        }
      })
      .catch(() => {
        setAllProducts([]);
        setDisplayProducts([]);
      })
      .finally(() => setLoading(false));
  }, [category, gender]);

  // Auto-shuffle for "all" category only
  useEffect(() => {
    if (category !== "all" || gender) return;

    // Shuffle every 30 seconds
    const shuffleInterval = setInterval(() => {
      setDisplayProducts((prev) => shuffleArray(prev));
    }, 30000);

    return () => clearInterval(shuffleInterval);
  }, [category, gender, allProducts]);

  const categoryLabel =
    NAV_CATEGORIES.find((c) => c.slug === category)?.label ||
    (gender ? `For ${gender}` : "All Jewellery");

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-rangoli-maroon">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-rangoli-maroon">{categoryLabel}</span>
      </nav>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">{categoryLabel}</h1>
          <p className="mt-1 text-sm text-gray-500">({displayProducts.length} results)</p>
        </div>
      </div>

      <div className="mb-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <Link
          href="/catalog"
          className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
            category === "all" && !gender
              ? "bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark text-white shadow-lg shadow-rangoli-maroon/30"
              : "border-2 border-gray-200 text-rangoli-maroon hover:border-rangoli-maroon hover:bg-rangoli-cream"
          }`}
        >
          All
        </Link>
        {NAV_CATEGORIES.filter((c) => c.slug !== "all" && c.slug !== "clothing").map((cat) => (
          <Link
            key={cat.slug}
            href={`/catalog?category=${cat.slug}`}
            className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
              category === cat.slug
                ? "bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark text-white shadow-lg shadow-rangoli-maroon/30"
                : "border-2 border-gray-200 text-rangoli-maroon hover:border-rangoli-maroon hover:bg-rangoli-cream"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {loading ? (
        <div className="py-20 text-center text-gray-500">Loading collection...</div>
      ) : displayProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 py-20 text-center">
          <p className="text-gray-500">No products found in this category.</p>
          <Link href="/catalog" className="mt-4 inline-block text-rangoli-maroon hover:underline">
            View all jewellery
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
  {displayProducts.map((product) => (
    <div key={product.id} className="min-w-0">
      <ProductCard product={product} />
    </div>
          ))}
        </div>
      )}
    </div>
  );
}
