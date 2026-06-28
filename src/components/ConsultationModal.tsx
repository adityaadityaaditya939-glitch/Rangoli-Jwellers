"use client";

import ConsultationForm from "@/components/ConsultationForm";
import { useConsultation } from "@/components/ConsultationProvider";

export default function ConsultationModal() {
  const { isOpen, closeConsultation, source } = useConsultation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="animate-fade-in-up w-full max-w-lg overflow-hidden rounded-2xl bg-rangoli-cream shadow-2xl">
        <div className="relative bg-gradient-to-br from-rangoli-maroon to-rangoli-maroon-dark px-4 py-5 text-center text-white sm:px-6 sm:py-8">
          <button
            type="button"
            onClick={closeConsultation}
            className="absolute right-4 top-4 rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl sm:h-16 sm:w-16 sm:text-3xl sm:mb-4">
            💎
          </div>
          <h2 className="font-serif text-xl font-bold sm:text-2xl">Book a Design Consultation</h2>
          <p className="mt-2 text-xs text-white/85 sm:text-sm">
            Custom bridal sets, festive jewellery & in-store appointments
          </p>
        </div>
        <div className="bg-white p-4 sm:p-6">
          <ConsultationForm source={source} onSuccess={closeConsultation} compact />
        </div>
      </div>
    </div>
  );
}
