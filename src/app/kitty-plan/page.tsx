import Image from "next/image";
import Link from "next/link";

export default function KittyPlanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-rangoli-maroon via-rangoli-maroon to-rangoli-maroon-dark py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h1 className="font-serif text-3xl font-bold text-amber-300 sm:text-4xl md:text-5xl lg:text-6xl">
            RANGOLI EXCLUSIVE
          </h1>
          <div className="mt-6 rounded-full bg-amber-400/20 px-6 py-3 sm:mt-8 sm:px-8 sm:py-4">
            <h3 className="font-serif text-2xl font-bold text-amber-300 sm:text-3xl md:text-4xl">
              GINNI GOLD KITTY
            </h3>
          </div>
          <p className="mt-6 text-lg font-medium text-white/90 sm:mt-8 sm:text-xl md:text-2xl">
            Start your journey with just ₹1000. Invest up to ₹50,000.
          </p>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="relative mx-auto max-w-7xl px-2 py-12 sm:px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/images/Kitty_plan.png"
            alt="Ginni Gold Kitty Plan"
            width={1200}
            height={600}
            className="w-full object-cover"
            priority
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-rangoli-maroon sm:text-4xl md:text-5xl">
            Why Choose Us?
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
            {/* Card 1 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center">
                <div className="rounded-full bg-rangoli-maroon p-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-6 text-center font-serif text-xl font-bold text-gray-900">
                Safe & Reliable Investment
              </h3>
              <p className="mt-3 text-center text-gray-600">
                सुरक्षित और भरोसेमंद
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center">
                <div className="rounded-full bg-rangoli-maroon p-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-6 text-center font-serif text-xl font-bold text-gray-900">
                Small Savings
              </h3>
              <p className="mt-3 text-center text-gray-600">
                हर महीने छोटी बचत = बड़ा फायदा
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl bg-white p-8 shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
              <div className="flex justify-center">
                <div className="rounded-full bg-rangoli-maroon p-4">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
              <h3 className="mt-6 text-center font-serif text-xl font-bold text-gray-900">
                Double Happiness
              </h3>
              <p className="mt-3 text-center text-gray-600">
                Gift + Profit = Double Happiness
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profit Benefits Section */}
      <section className="bg-rangoli-cream py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold text-rangoli-maroon sm:text-4xl md:text-5xl">
            Profit Benefits
          </h2>
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3">
            {/* 12 Months */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-white">12 Months Scheme</h3>
              </div>
              <div className="p-6 text-center">
                <p className="text-lg text-gray-700">
                  12 months तक ₹1000 deposit
                </p>
                <div className="mt-4 rounded-lg bg-green-100 p-4">
                  <p className="font-serif text-2xl font-bold text-green-700">
                    ₹1000/- Extra Profit
                  </p>
                </div>
              </div>
            </div>

            {/* 18 Months */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
              <div className="bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark p-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-white">18 Months Scheme</h3>
              </div>
              <div className="p-6 text-center">
                <p className="text-lg text-gray-700">
                  18 months तक ₹1000 deposit
                </p>
                <div className="mt-4 rounded-lg bg-green-100 p-4">
                  <p className="font-serif text-2xl font-bold text-green-700">
                    ₹2000/- Extra Profit
                  </p>
                </div>
              </div>
            </div>

            {/* 24 Months */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:scale-105 hover:shadow-xl">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-center">
                <h3 className="font-serif text-2xl font-bold text-white">24 Months Scheme</h3>
              </div>
              <div className="p-6 text-center">
                <p className="text-lg text-gray-700">
                  24 months तक ₹1000 deposit
                </p>
                <div className="mt-4 rounded-lg bg-green-100 p-4">
                  <p className="font-serif text-2xl font-bold text-green-700">
                    ₹3000/- Extra Profit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Gift Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-rangoli-maroon via-rangoli-maroon to-rangoli-maroon-dark p-8 text-center shadow-2xl sm:p-12 md:p-16">
          <div className="flex justify-center">
            <div className="rounded-full bg-amber-400 p-6">
              <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 font-serif text-3xl font-bold text-amber-300 sm:text-4xl md:text-5xl">
            Special Gift Offer
          </h2>
          <div className="mt-6 rounded-xl bg-white/10 p-6 sm:mt-8 sm:p-8">
            <p className="text-xl font-medium text-white sm:text-2xl md:text-3xl">
              5th time जब आप ₹1000 जमा करेंगे
            </p>
            <p className="mt-4 font-serif text-3xl font-bold text-amber-300 sm:text-4xl md:text-5xl">
              1 Silver Coin FREE!
            </p>
          </div>
        </div>
      </section>

      {/* Contact/Footer Section */}
      <section className="bg-gray-900 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-amber-300 sm:text-3xl md:text-4xl">
            Visit Us Today
          </h2>
          <div className="mt-8 space-y-4 sm:mt-10">
            <div className="flex items-center justify-center gap-3">
              <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-lg">RANGOLI EXCLUSIVE, The Mall, Rohru</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <svg className="h-6 w-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <p className="text-lg">88943 20048, 88945 06405</p>
            </div>
          </div>
          <div className="mt-8 space-y-4 sm:mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-lg font-semibold text-gray-900 transition hover:bg-amber-500 sm:px-8 sm:py-4"
            >
              Contact Us
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="https://wa.me/918894506405"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-rangoli-maroon px-6 py-3 text-lg font-semibold text-white transition hover:bg-rangoli-maroon-dark sm:px-8 sm:py-4"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
