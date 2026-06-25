import { Suspense } from "react";
import CatalogPageClient from "./CatalogPageClient";

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <CatalogPageClient />
    </Suspense>
  );
}
