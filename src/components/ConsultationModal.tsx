"use client";

import ConsultationForm from "@/components/ConsultationForm";
import { useConsultation } from "@/components/ConsultationProvider";

export default function ConsultationModal() {
  const { isOpen, closeConsultation, source } = useConsultation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="animate-fade-in-up w-full max-w-lg overflow-hidden rounded-2xl bg-rangoli-cream shadow-2xl">
        <div className="relative bg-gradient-to-br from-rangoli-maroon to-rangoli-maroon-dark px-6 py-8 text-center text-white">
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
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-3xl">
            💎
          </div>
          <h2 className="font-serif text-2xl font-bold">Book a Design Consultation</h2>
          <p className="mt-2 text-sm text-white/85">
            Custom bridal sets, festive jewellery & in-store appointments
          </p>
        </div>
        <div className="bg-white p-6">
          <ConsultationForm source={source} onSuccess={closeConsultation} compact />
        </div>
      </div>
    </div>
  );
}
