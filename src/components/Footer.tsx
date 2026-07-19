import Image from "next/image";
import Link from "next/link";
import { IMAGES, SHOP } from "@/lib/constants";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  const whatsappUrl = buildWhatsAppUrl(`Hello ${SHOP.name}! I would like to know more about your jewellery.`);

  return (
    <footer id="about" className="mt-16 bg-rangoli-maroon-dark text-white">
      <div className="mx-auto max-w-7xl rounded-t-3xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={IMAGES.logo}
                alt={SHOP.name}
                width={100}
                height={100}
                className="h-20 w-20 object-contain"
              />
              <div>
                <h2 className="font-serif text-2xl font-bold">{SHOP.name}</h2>
                <p className="text-sm text-white/70">{SHOP.tagline}</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/80">
              Your trusted jewellery destination in Rohru, Himachal Pradesh. From daily wear to
              bridal masterpieces, we craft pieces that celebrate every occasion.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              <li className="flex gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-rangoli-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{SHOP.address}</span>
              </li>
              <li className="flex gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-rangoli-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{SHOP.email}</span>
              </li>
              <li className="flex gap-3">
                <svg className="h-5 w-5 flex-shrink-0 text-rangoli-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${SHOP.phone}`} className="hover:text-rangoli-gold transition-colors">
                  {SHOP.phone}
                </a>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 2C6.486 2 2 6.486 2 12c0 1.811.487 3.508 1.335 4.978L2 22l5.233-1.304A9.953 9.953 0 0012 22c5.514 0 10-4.486 10-10S17.514 2 12 2zm0 18a7.96 7.96 0 01-4.075-1.125l-.292-.175-3.103.776.828-3.023-.19-.303A7.96 7.96 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                </svg>
              </a>
              <a
                href={`mailto:${SHOP.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Email"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/vik.wadhwa.1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/rangoliexclusive_1?igsh=MXc1dDI0cGxjMng0ZA=="
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              <li>
                <Link href="/catalog" className="hover:text-rangoli-gold">
                  All Jewellery
                </Link>
              </li>
              <li>
                <Link href="/clothing" className="hover:text-rangoli-gold">
                  Clothing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rangoli-gold">
                  Book Consultation
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-rangoli-gold">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-center text-sm text-white/60">
          <p>© {new Date().getFullYear()} {SHOP.name}. All rights reserved.</p>
          <p className="mt-2">
            Powered by{" "}
            <a
              href="https://tech-explorer-nine.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-rangoli-gold hover:text-rangoli-gold/80 transition-colors"
            >
              {SHOP.poweredBy}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
