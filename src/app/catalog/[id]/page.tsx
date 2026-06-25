import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultationForm from "@/components/ConsultationForm";
import { getDb, type Product } from "@/lib/db";
import { buildProductWhatsAppMessage, buildWhatsAppUrl, formatPrice } from "@/lib/whatsapp";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM products WHERE id = ${Number(id)}`;
    return (rows[0] as Product) || null;
  } catch {
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const whatsappUrl = buildWhatsAppUrl(
    buildProductWhatsAppMessage({
      name: product.name,
      price: product.price,
      id: product.id,
    }),
  );

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
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-gray-50">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <p className="text-sm uppercase tracking-wider text-rangoli-maroon">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-gray-900 md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-semibold text-gray-900">
            ₹ {formatPrice(product.price)}
          </p>

          {product.metal && (
            <p className="mt-2 text-sm text-gray-600">Metal: {product.metal}</p>
          )}

          {product.description && (
            <p className="mt-6 leading-relaxed text-gray-600">{product.description}</p>
          )}

          {product.stock === 1 && (
            <p className="mt-4 inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-800">
              Only 1 left in stock
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-8 py-4 text-base font-semibold text-white transition hover:bg-[#1da851]"
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

      <section className="mt-16 rounded-3xl border border-gray-100 bg-rangoli-cream/50 p-6 md:p-10">
        <h2 className="font-serif text-2xl font-bold text-gray-900">
          Custom Design Consultation
        </h2>
        <p className="mt-2 text-gray-600">
          Want something unique? Share your requirements and we&apos;ll connect on WhatsApp.
        </p>
        <div className="mt-6">
          <ConsultationForm source="product-detail" />
        </div>
      </section>
    </div>
  );
}
