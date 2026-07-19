"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { IMAGES, SHOP } from "@/lib/constants";
import { useConsultation } from "@/components/ConsultationProvider";
import { useCart } from "@/components/CartProvider";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { openConsultation } = useConsultation();
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  const navigation = [
    { title: "Home", href: "/" },
    { title: "Jewellery", href: "/catalog" },
    { title: "Clothing", href: "/clothing" },
    { title: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});

    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.refresh();
    router.push("/");
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-lg border-b border-amber-100"
            : "bg-white"
        }`}
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:px-8">

          {/* Mobile Menu */}

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="rounded-xl p-2 text-rangoli-maroon transition hover:bg-rangoli-cream lg:hidden"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          </button>

          {/* Logo */}

          <Link
            href="/"
            className="flex shrink-0 items-center"
          >
            <Image
              src={IMAGES.logo}
              alt={SHOP.name}
              width={220}
              height={220}
              priority
              className="h-52 w-52 object-contain transition duration-300 hover:scale-225 lg:h-56 lg:w-56"
            />
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden flex-1 items-center justify-center gap-10 lg:flex">
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative py-2 font-medium tracking-wide text-rangoli-maroon"
                >
                  <span
                    className={`transition ${
                      active
                        ? "text-rangoli-gold"
                        : "group-hover:text-rangoli-gold"
                    }`}
                  >
                    {item.title}
                  </span>

                  <span
                    className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-rangoli-gold transition-all duration-300 ${
                      active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right */}

          <div className="hidden items-center gap-3 lg:flex">

            <Link
              href="/cart"
              className="relative rounded-full border border-gray-200 p-3 transition hover:border-rangoli-gold hover:bg-rangoli-cream"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rangoli-maroon text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <a
              href={`tel:${SHOP.phone}`}
              className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-rangoli-maroon transition hover:border-rangoli-gold hover:bg-rangoli-cream"
            >
              📞
              <span>Call</span>
            </a>

            <Link
              href="/catalog"
              className="rounded-full border border-gray-200 p-3 transition hover:border-rangoli-gold hover:bg-rangoli-cream"
            >
              🔍
            </Link>

            <button
              type="button"
              onClick={() => openConsultation("header")}
              className="rounded-full bg-rangoli-maroon px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-rangoli-maroon-dark"
            >
              Book Consultation
            </button>

            {user ? (
              <div className="flex items-center gap-3">

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="rounded-full border border-rangoli-gold px-4 py-2 text-sm font-medium text-rangoli-maroon hover:bg-rangoli-gold hover:text-white"
                  >
                    Dashboard
                  </Link>
                )}

                <div className="hidden xl:block">
                  <p className="text-xs text-gray-500">
                    Welcome
                  </p>

                  <p className="max-w-[130px] truncate text-sm font-semibold text-rangoli-maroon">
                    {user.name}
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-red-50 hover:text-red-600"
                >
                  Logout
                </button>

              </div>
            ) : (
              <Link
                href="/login"
                className="rounded-full border border-rangoli-maroon px-5 py-2 text-sm font-semibold text-rangoli-maroon transition hover:bg-rangoli-maroon hover:text-white"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Icons */}

          <div className="flex items-center gap-2 lg:hidden">

            <Link
              href="/cart"
              className="relative rounded-xl p-2.5 text-rangoli-maroon transition hover:bg-rangoli-cream hover:scale-105"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rangoli-maroon text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/catalog"
              className="rounded-xl p-2.5 text-rangoli-maroon transition hover:bg-rangoli-cream hover:scale-105"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>

            <a
              href={`tel:${SHOP.phone}`}
              className="rounded-xl p-2.5 text-rangoli-maroon transition hover:bg-rangoli-cream hover:scale-105"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>

          </div>

        </div>

      </header>
            {/* ================= MOBILE MENU ================= */}

      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />

          {/* Drawer */}
          <aside className="fixed left-0 top-0 z-50 flex h-screen w-[88%] max-w-sm flex-col bg-white shadow-2xl lg:hidden animate-fade-in-up">

            {/* Top */}
            <div className="border-b border-amber-100 p-6 bg-gradient-to-r from-rangoli-cream to-white">

              <div className="flex items-center justify-between">

                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={IMAGES.logo}
                    alt={SHOP.name}
                    width={70}
                    height={70}
                    className="h-16 w-16 object-contain"
                  />

                  <div>
                    <h2 className="font-serif text-xl font-bold text-rangoli-maroon">
                      {SHOP.name}
                    </h2>

                    <p className="text-xs text-gray-500">
                      Premium Jewellery
                    </p>
                  </div>

                </Link>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

              </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 overflow-y-auto px-4 py-6">

              <div className="space-y-1">

                {navigation.map((item) => {

                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3.5 font-medium transition ${
                        active
                          ? "bg-rangoli-maroon text-white shadow-md"
                          : "text-gray-700 hover:bg-rangoli-cream hover:text-rangoli-maroon"
                      }`}
                    >
                      {active ? (
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                      {item.title}
                    </Link>
                  );
                })}

              </div>

              {/* Quick Actions */}

              <div className="mt-8 pt-6 border-t border-gray-100">

                <button
                  type="button"
                  onClick={() => {
                    openConsultation("mobile-menu");
                    setMenuOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark px-4 py-3.5 font-semibold text-white shadow-lg transition hover:shadow-xl hover:-translate-y-0.5"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book Consultation
                </button>

              </div>

              {/* User */}

              <div className="mt-8 pt-6 border-t border-gray-100">

                {user ? (

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm border border-gray-100">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rangoli-maroon text-white font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500">Welcome</p>
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {user.name}
                        </p>
                      </div>
                    </div>

                    {user.role === "admin" && (

                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-rangoli-gold bg-white px-4 py-3 text-sm font-semibold text-rangoli-maroon transition hover:bg-rangoli-gold hover:text-white"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Dashboard
                      </Link>

                    )}

                    <button
                      onClick={async () => {
                        setMenuOpen(false);
                        await handleLogout();
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>

                  </div>

                ) : (

                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-rangoli-maroon bg-white px-4 py-3.5 text-sm font-semibold text-rangoli-maroon transition hover:bg-rangoli-maroon hover:text-white"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Login
                  </Link>

                )}

              </div>

            </nav>

            {/* Bottom */}

            <div className="border-t border-gray-100 p-4 bg-rangoli-cream">

              <div className="text-center">

                <p className="font-serif text-sm font-semibold text-rangoli-maroon">
                  {SHOP.name}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {SHOP.tagline}
                </p>

                <p className="mt-3 text-xs text-gray-400">
                  © {new Date().getFullYear()} {SHOP.name}
                </p>

              </div>

            </div>

          </aside>

        </>
      )}

    </>
  );
}