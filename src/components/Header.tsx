"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IMAGES, NAV_CATEGORIES, SHOP } from "@/lib/constants";
import { useConsultation } from "@/components/ConsultationProvider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const { openConsultation } = useConsultation();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-lg p-2 text-rangoli-maroon hover:bg-rangoli-cream lg:hidden"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link href="/" className="flex items-center gap-3">
            <Image
              src={IMAGES.logo}
              alt={SHOP.name}
              width={150}
              height={150}
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />
          </Link>

          <nav className="hidden items-center gap-4 md:flex">
            <Link href="/" className="text-sm font-medium text-rangoli-maroon hover:text-rangoli-maroon-dark">
              Home
            </Link>
            <Link href="/catalog" className="text-sm font-medium text-rangoli-maroon hover:text-rangoli-maroon-dark">
              Catalog
            </Link>
            <Link href="/clothing" className="text-sm font-medium text-rangoli-maroon hover:text-rangoli-maroon-dark">
              Clothing
            </Link>
            <Link href="/contact" className="text-sm font-medium text-rangoli-maroon hover:text-rangoli-maroon-dark">
              Contact
            </Link>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => openConsultation("header")}
              className="rounded-full bg-rangoli-maroon px-5 py-2 text-sm font-semibold text-white hover:bg-rangoli-maroon-dark"
            >
              Book Consultation
            </button>
            
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === "admin" && (
                  <Link href="/admin" className="text-sm font-medium text-rangoli-maroon hover:underline">
                    Admin Dashboard
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-rangoli-maroon">Hi, {user.name}</span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm font-medium text-rangoli-maroon hover:text-rangoli-maroon-dark"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-rangoli-maroon hover:text-rangoli-maroon-dark">
                  Login
                </Link>
                <Link href="/signup" className="rounded-full bg-rangoli-maroon px-5 py-2 text-sm font-semibold text-white hover:bg-rangoli-maroon-dark">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${SHOP.phone}`}
              className="rounded-full p-2 text-rangoli-maroon hover:bg-rangoli-cream"
              aria-label="Call us"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
            <Link
              href="/catalog"
              className="rounded-full p-2 text-rangoli-maroon hover:bg-rangoli-cream"
              aria-label="Browse catalogue"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-100 px-4 py-3 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search for gold necklace, rings..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white shadow-xl">
            <div className="flex items-center justify-between border-b px-4 py-4">
              <span className="font-serif text-lg font-bold text-rangoli-maroon">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mx-4 my-4 rounded-2xl bg-gradient-to-r from-pink-50 to-rangoli-cream p-4">
              <p className="font-serif text-lg text-rangoli-maroon">Custom Design Consultation</p>
              <p className="mt-1 text-sm text-gray-600">Bridal sets & festive jewellery</p>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  openConsultation("mobile-nav");
                }}
                className="mt-3 text-sm font-semibold uppercase tracking-wide text-rangoli-maroon"
              >
                Book Now →
              </button>
            </div>

            <nav className="px-2 pb-8">
              {NAV_CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug === "clothing" ? "/clothing" : `/catalog?category=${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-gray-100 px-3 py-4 text-rangoli-maroon hover:bg-rangoli-cream/50"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="font-medium">{cat.label}</span>
                  </span>
                  <svg className="h-4 w-4 text-rangoli-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
              
              {user ? (
                <div className="border-t border-gray-100 pt-4">
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Signed in as <span className="font-medium text-rangoli-maroon">{user.name}</span>
                  </div>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between border-b border-gray-100 px-3 py-4 text-rangoli-maroon hover:bg-rangoli-cream/50"
                    >
                      <span className="font-medium">Admin Dashboard</span>
                      <svg className="h-4 w-4 text-rangoli-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between border-b border-gray-100 px-3 py-4 text-left text-red-600 hover:bg-red-50"
                  >
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-100 pt-4">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between border-b border-gray-100 px-3 py-4 text-rangoli-maroon hover:bg-rangoli-cream/50"
                  >
                    <span className="font-medium">Login</span>
                    <svg className="h-4 w-4 text-rangoli-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between border-b border-gray-100 px-3 py-4 text-rangoli-maroon hover:bg-rangoli-cream/50"
                  >
                    <span className="font-medium">Sign Up</span>
                    <svg className="h-4 w-4 text-rangoli-maroon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
