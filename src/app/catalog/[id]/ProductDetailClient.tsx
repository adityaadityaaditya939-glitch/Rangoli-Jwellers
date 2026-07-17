"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { buildProductWhatsAppMessage, buildWhatsAppUrl, formatPrice } from "@/lib/whatsapp";
import type { Product, ProductImage } from "@/lib/db";

const CLOTHING_CATEGORIES = ["lehenga", "suits", "saree", "sarees", "lehengas", "kurtis", "sherwanis", "traditional-wears"];

export default function ProductDetailClient({ product, images }: { product: Product; images: ProductImage[] }) {
  const [selectedImage, setSelectedImage] = useState(product.image_url);
  const isClothing = CLOTHING_CATEGORIES.includes(product.category);

  const whatsappUrl = useMemo(() => buildWhatsAppUrl(
    buildProductWhatsAppMessage({
      name: product.name,
      price: product.price,
      id: product.id,
    })
  ), [product.name, product.price, product.id]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-rangoli-maroon">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link href="/catalog" className="hover:text-rangoli-maroon">
          All Jewellery
        </Link>
        <span className="mx-2">›</span>
        <span className="text-rangoli-maroon">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-50">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          
          {/* Color variant thumbnails */}
          {images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedImage(product.image_url)}
                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === product.image_url ? "border-rangoli-maroon" : "border-gray-200"
                }`}
              >
                <Image
                  src={product.image_url}
                  alt="Main image"
                  fill
                  className="object-cover"
                />
              </button>
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img.image_url)}
                  className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === img.image_url ? "border-rangoli-maroon" : "border-gray-200"
                  }`}
                  title={img.color_name || `Color ${index + 1}`}
                >
                  <Image
                    src={img.image_url}
                    alt={img.color_name || `Color ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Color names */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-700">Available colors:</span>
              {images.map((img, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                  {img.color_name || `Color ${index + 1}`}
                </span>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-rangoli-maroon">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            {product.name}
          </h1>
          {product.price > 0 && (
            <p className="mt-4 text-3xl font-semibold text-gray-900">
              ₹ {formatPrice(product.price)}
            </p>
          )}

          {/* Only show metal for jewelry, not clothing */}
          {!isClothing && product.metal && (
            <p className="mt-2 text-sm text-gray-600">Metal: {product.metal}</p>
          )}

          {product.description && (
            <p className="mt-6 leading-relaxed text-gray-600">{product.description}</p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark px-8 py-4 text-base font-semibold text-white transition hover:shadow-lg"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Inquire on WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border-2 border-rangoli-maroon px-8 py-4 text-base font-semibold text-rangoli-maroon transition hover:bg-rangoli-cream"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
