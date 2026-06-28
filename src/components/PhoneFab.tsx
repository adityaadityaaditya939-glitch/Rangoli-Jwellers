"use client";

import { SHOP } from "@/lib/constants";

export default function PhoneFab() {
  return (
    <a
      href={`tel:${SHOP.phone}`}
      className="fixed bottom-16 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-rangoli-maroon text-white shadow-lg transition hover:scale-105 hover:bg-rangoli-maroon-dark hover:shadow-xl"
      aria-label="Call Rangoli Jwellers"
    >
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    </a>
  );
}
