import ConsultationForm from "@/components/ConsultationForm";
import { SHOP } from "@/lib/constants";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <div className="text-center">
        <h1 className="font-serif text-3xl font-bold text-gray-900 md:text-4xl">
          Book a Design Consultation
        </h1>
        <p className="mt-4 text-gray-600">
          Share your vision for custom bridal jewellery, festive sets, or in-store appointments.
          After submitting, you&apos;ll be redirected to WhatsApp to connect directly with{" "}
          {SHOP.name}.
        </p>
      </div>

      <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-lg md:p-10">
        <ConsultationForm source="contact-page" />
      </div>

      <div className="mt-10 rounded-2xl bg-rangoli-cream p-6 text-center">
        <p className="font-medium text-gray-800">Visit us at</p>
        <p className="mt-2 text-sm text-gray-600">{SHOP.address}</p>
        <a
          href={`tel:${SHOP.phone}`}
          className="mt-4 inline-block font-semibold text-rangoli-maroon hover:underline"
        >
          Call {SHOP.phone}
        </a>
      </div>
    </div>
  );
}
