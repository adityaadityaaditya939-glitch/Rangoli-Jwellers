"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { IMAGES, SHOP } from "@/lib/constants";
import { useConsultation } from "@/components/ConsultationProvider";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { openConsultation } = useConsultation();

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
              width={120}
              height={120}
              priority
              className="h-20 w-20 object-contain transition duration-300 hover:scale-105 lg:h-24 lg:w-24"
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
              href="/catalog"
              className="rounded-xl p-2 hover:bg-rangoli-cream"
            >
              🔍
            </Link>

            <a
              href={`tel:${SHOP.phone}`}
              className="rounded-xl p-2 hover:bg-rangoli-cream"
            >
              📞
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
          <aside className="fixed left-0 top-0 z-50 flex h-screen w-[88%] max-w-sm flex-col bg-white shadow-2xl lg:hidden">

            {/* Top */}
            <div className="border-b border-gray-100 p-6">

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
                  className="rounded-xl p-2 hover:bg-gray-100"
                >
                  ✕
                </button>

              </div>

            </div>

            {/* Navigation */}

            <nav className="flex-1 overflow-y-auto px-6 py-8">

              <div className="space-y-2">

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
                      className={`block rounded-2xl px-5 py-4 text-lg font-medium transition ${
                        active
                          ? "bg-rangoli-maroon text-white"
                          : "text-rangoli-maroon hover:bg-rangoli-cream"
                      }`}
                    >
                      {item.title}
                    </Link>
                  );
                })}

              </div>

              {/* Quick Actions */}

              <div className="mt-10 border-t border-gray-100 pt-8">

                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400">
                  Quick Actions
                </p>

                <div className="space-y-3">

                  <a
                    href={`tel:${SHOP.phone}`}
                    className="flex items-center justify-center rounded-xl border border-gray-200 py-4 font-medium transition hover:bg-rangoli-cream"
                  >
                    📞 Call Store
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      openConsultation("mobile-menu");
                      setMenuOpen(false);
                    }}
                    className="w-full rounded-xl bg-rangoli-maroon py-4 font-semibold text-white transition hover:bg-rangoli-maroon-dark"
                  >
                    Book Consultation
                  </button>

                </div>

              </div>

              {/* User */}

              <div className="mt-10 border-t border-gray-100 pt-8">

                {user ? (

                  <div className="space-y-4">

                    <div className="rounded-2xl bg-rangoli-cream p-5">

                      <p className="text-xs uppercase tracking-widest text-gray-500">
                        Welcome
                      </p>

                      <p className="mt-2 font-semibold text-rangoli-maroon">
                        {user.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {user.email}
                      </p>

                    </div>

                    {user.role === "admin" && (

                      <Link
                        href="/admin"
                        onClick={() => setMenuOpen(false)}
                        className="block rounded-xl border border-rangoli-gold py-4 text-center font-semibold text-rangoli-maroon transition hover:bg-rangoli-gold hover:text-white"
                      >
                        Admin Dashboard
                      </Link>

                    )}

                    <button
                      onClick={async () => {
                        setMenuOpen(false);
                        await handleLogout();
                      }}
                      className="w-full rounded-xl border border-red-200 py-4 font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Logout
                    </button>

                  </div>

                ) : (

                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl border border-rangoli-maroon py-4 text-center font-semibold text-rangoli-maroon transition hover:bg-rangoli-maroon hover:text-white"
                  >
                    Login
                  </Link>

                )}

              </div>

            </nav>

            {/* Bottom */}

            <div className="border-t border-gray-100 p-6">

              <div className="text-center">

                <p className="font-serif text-lg font-semibold text-rangoli-maroon">
                  {SHOP.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {SHOP.tagline}
                </p>

                <p className="mt-5 text-xs text-gray-400">
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