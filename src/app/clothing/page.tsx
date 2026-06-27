import { Suspense } from "react";
import ClothingPageClient from "./ClothingPageClient";

export default function ClothingPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <ClothingPageClient />
    </Suspense>
  );
}
