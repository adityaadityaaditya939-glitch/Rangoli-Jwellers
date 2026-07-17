import { notFound } from "next/navigation";
import ConsultationForm from "@/components/ConsultationForm";
import { getDb, type Product, type ProductImage } from "@/lib/db";
import ProductDetailClient from "./ProductDetailClient";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const sql = getDb();
    const rows = await sql`SELECT * FROM products WHERE id = ${Number(id)}`;
    return (rows[0] as Product) || null;
  } catch {
    return null;
  }
}

async function getProductImages(productId: number): Promise<ProductImage[]> {
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT * FROM product_images 
      WHERE product_id = ${productId}
      ORDER BY is_primary DESC, id ASC
    `;
    return rows as ProductImage[];
  } catch {
    return [];
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

  const images = await getProductImages(product.id);

  return (
    <>
      <ProductDetailClient product={product} images={images} />
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8 mt-16 rounded-3xl border border-gray-100 bg-rangoli-cream/50 p-6 md:p-10">
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
    </>
  );
}
