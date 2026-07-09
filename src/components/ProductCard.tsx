import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db";
import {
  buildProductWhatsAppMessage,
  buildWhatsAppUrl,
  formatPrice,
} from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = buildWhatsAppUrl(
    buildProductWhatsAppMessage({
      name: product.name,
      price: product.price,
      id: product.id,
    })
  );

  return (
    <article className="group w-full min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link
        href={`/catalog/${product.id}`}
        className="relative block h-44 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="bg-white object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/0 via-transparent to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      <div className="p-4">
        <Link href={`/catalog/${product.id}`}>
          <h3 className="line-clamp-2 font-serif text-sm font-medium text-gray-900 sm:text-base group-hover:text-rangoli-maroon transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.price > 0 && (
          <div className="mt-2 flex items-baseline gap-1">
            <p className="text-base font-bold text-gray-900 sm:text-lg">
              ₹ {formatPrice(product.price)}
            </p>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/catalog/${product.id}`}
            className="w-full rounded-xl border-2 border-gray-200 py-2.5 text-center text-xs font-semibold text-rangoli-maroon transition-all duration-200 hover:border-rangoli-maroon hover:bg-rangoli-maroon hover:text-white hover:shadow-md"
          >
            View Details
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark py-2.5 text-xs font-semibold text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 2C6.486 2 2 6.486 2 12c0 1.811.487 3.508 1.335 4.978L2 22l5.233-1.304A9.953 9.953 0 0012 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18a7.96 7.96 0 01-4.075-1.125l-.292-.175-3.103.776.828-3.023-.19-.303A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}