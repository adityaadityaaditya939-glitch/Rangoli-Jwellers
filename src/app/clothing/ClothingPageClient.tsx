"use client";
 
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { CLOTHING_CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/db";
 
export default function ClothingPageClient() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category && category !== "all") params.set("category", category);
 
    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        let items: Product[] = data.products || [];
        // Filter for clothing categories
        const clothingSlugs = CLOTHING_CATEGORIES.map((c) => c.slug) as string[];
        items = items.filter((p) => clothingSlugs.includes(p.category));
        if (category && category !== "all") {
          items = items.filter((p) => p.category === category);
        }
        setProducts(items);
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category]);
 
  const categoryLabel =
    CLOTHING_CATEGORIES.find((c) => c.slug === category)?.label ||
    "All Clothing";
 
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <nav className="mb-4 text-sm text-gray-500">
        <Link href="/" className="hover:text-rangoli-maroon">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-rangoli-maroon">Clothing</span>
        {category !== "all" && (
          <>
            <span className="mx-2">›</span>
            <span className="text-rangoli-maroon">{categoryLabel}</span>
          </>
        )}
      </nav>
 
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">{categoryLabel}</h1>
          <p className="mt-1 text-sm text-gray-500">({products.length} results)</p>
        </div>
      </div>
 
      <div className="mb-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Link
          href="/clothing"
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
            category === "all"
              ? "bg-rangoli-maroon text-white"
              : "border border-gray-200 text-rangoli-maroon hover:border-rangoli-maroon"
          }`}
        >
          All
        </Link>
        {CLOTHING_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/clothing?category=${cat.slug}`}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
              category === cat.slug
                ? "bg-rangoli-maroon text-white"
                : "border border-gray-200 text-rangoli-maroon hover:border-rangoli-maroon"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>
 
      {loading ? (
        <div className="py-20 text-center text-gray-500">Loading collection...</div>
      ) : products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 py-20 text-center">
          <p className="text-gray-500">No products found in this category.</p>
          <Link href="/clothing" className="mt-4 inline-block text-rangoli-maroon hover:underline">
            View all clothing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}