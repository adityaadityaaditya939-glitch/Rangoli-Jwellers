import { Suspense } from "react";
import ClothingPageClient from "./ClothingPageClient";

export default function ClothingPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">Loading...</div>}>
      <ClothingPageClient />
    </Suspense>
  );
}
