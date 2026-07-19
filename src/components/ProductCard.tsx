"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { Product } from "@/lib/db";
import {
  buildProductWhatsAppMessage,
  buildWhatsAppUrl,
  formatPrice,
} from "@/lib/whatsapp";
import { useCart } from "@/components/CartProvider";

interface ProductCardProps {
  product: Product & { images?: Array<{ id: number; image_url: string; color_name: string | null; is_primary: boolean }> };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.image_url);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  
  const whatsappUrl = buildWhatsAppUrl(
    buildProductWhatsAppMessage({
      name: product.name,
      price: product.price,
      id: product.id,
    })
  );

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setIsLiked(wishlist.includes(product.id));
  }, [product.id]);

  // Toggle like/wishlist
  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const newWishlist = isLiked 
      ? wishlist.filter((id: number) => id !== product.id)
      : [...wishlist, product.id];
    
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setIsLiked(!isLiked);
  };

  // Add to cart handler
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    setAddedToCart(true);
    
    // Reset the added state after 2 seconds
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Calculate image positioning using database fields
  const imageStyle = {
    objectPosition: `${product.image_position_x}% ${product.image_position_y}%`,
    objectFit: 'contain' as const,
  };

  // Check if product is new (created within last 7 days)
  const isNew = new Date(product.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  
  // Check if product is featured
  const isFeatured = product.is_featured;

  // Get available color options
  const colorOptions = product.images || [];
  const hasMultipleImages = colorOptions.length > 0;

  return (
    <article className="group relative w-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Like Button */}
      <button
        onClick={toggleLike}
        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white"
        aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg
          className={`h-5 w-5 transition-all duration-200 ${
            isLiked 
              ? 'fill-red-500 text-red-500 scale-110' 
              : 'fill-none text-gray-400 hover:text-red-500'
          }`}
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>

      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {isNew && (
          <span className="rounded-full bg-rangoli-maroon px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
            NEW
          </span>
        )}
        {isFeatured && !isNew && (
          <span className="rounded-full bg-rangoli-gold px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
            FEATURED
          </span>
        )}
        {product.stock <= 0 && (
          <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white shadow-md">
            SOLD OUT
          </span>
        )}
      </div>

      {/* Product Image */}
      <Link
        href={`/catalog/${product.id}`}
        className="relative block aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 cursor-zoom-in"
      >
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          className="bg-white transition duration-500 group-hover:scale-125 ease-out"
          style={imageStyle}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Color Options */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 z-10">
            {colorOptions.map((img) => (
              <button
                key={img.id}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedImage(img.image_url);
                }}
                className={`w-6 h-6 rounded-full border-2 transition-all ${
                  selectedImage === img.image_url
                    ? 'border-rangoli-maroon scale-110'
                    : 'border-white'
                }`}
                style={{
                  backgroundColor: img.color_name || '#ccc',
                }}
                title={img.color_name || 'Default'}
              />
            ))}
          </div>
        )}

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
          <span className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-rangoli-maroon shadow-lg">
            Quick View
          </span>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        <Link href={`/catalog/${product.id}`} className="block">
          <h3 className="line-clamp-2 font-serif text-sm font-medium text-gray-900 sm:text-base group-hover:text-rangoli-maroon transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Category Badge */}
        {product.category && (
          <span className="mt-2 inline-block rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 uppercase tracking-wide">
            {product.category}
          </span>
        )}

        {product.price > 0 && (
          <div className="mt-2 flex items-baseline gap-1">
            <p className="text-base font-bold text-gray-900 sm:text-lg">
              ₹{formatPrice(product.price)}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-3 sm:mt-4 flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`flex-1 rounded-xl py-2 text-center text-xs font-semibold transition-all duration-200 ${
              addedToCart
                ? "bg-green-500 text-white"
                : product.stock <= 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-rangoli-gold text-white hover:bg-rangoli-gold/90 hover:shadow-md"
            }`}
          >
            {addedToCart ? "✓ Added" : product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark py-2 text-xs font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.486 2 2 6.486 2 12c0 1.811.487 3.508 1.335 4.978L2 22l5.233-1.304A9.953 9.953 0 0012 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18a7.96 7.96 0 01-4.075-1.125l-.292-.175-3.103.776.828-3.023-.19-.303A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
}