import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/db";
import { buildProductWhatsAppMessage, buildWhatsAppUrl, formatPrice } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappUrl = buildWhatsAppUrl(
    buildProductWhatsAppMessage({
      name: product.name,
      price: product.price,
      id: product.id,
    }),
  );

  return (
    <article className="group w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-lg">
      <Link href={`/catalog/${product.id}`} className="relative block aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-contain transition duration-500 group-hover:scale-105 p-2 bg-white"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.stock === 1 && (
          <span className="absolute bottom-0 left-0 right-0 bg-amber-100/95 py-1 text-center text-xs font-semibold text-amber-800">
            ONLY 1 LEFT!
          </span>
        )}
      </Link>

      <div className="p-4">
        <Link href={`/catalog/${product.id}`}>
          <h3 className="font-serif text-sm sm:text-base font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-base sm:text-lg font-semibold text-gray-900">₹ {formatPrice(product.price)}</p>

        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={`/catalog/${product.id}`}
            className="w-full rounded-lg border border-gray-200 py-2 text-center text-xs font-semibold text-rangoli-maroon hover:border-rangoli-maroon hover:text-rangoli-maroon-dark"
          >
            View Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#25D366] py-2 text-xs font-semibold text-white hover:bg-[#1da851]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
