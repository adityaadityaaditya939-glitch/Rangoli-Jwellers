"use client";

import { useState, useEffect, useMemo } from "react";

export default function HomeNav() {
  const [activeSection, setActiveSection] = useState("collections");
  const [isVisible, setIsVisible] = useState(false);

  const sections = useMemo(() => [
    { id: "collections", label: "Jewellery" },
    { id: "clothing", label: "Clothing" },
    { id: "world", label: "About" },
    { id: "gender", label: "Gender" },
    { id: "traditional", label: "Heritage" },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;

      setIsVisible(window.scrollY > heroHeight * 0.55);

      const scrollableSections = sections.filter((s) => s.id !== "clothing");

      let current = "collections";

      scrollableSections.forEach((section) => {
        const el = document.getElementById(`section-${section.id}`);

        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 140) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    if (id === "clothing") {
      window.location.href = "/clothing";
      return;
    }

    const el = document.getElementById(`section-${id}`);

    if (!el) return;

    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      80;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-40 rounded-2xl border border-white/30 bg-white/90 shadow-2xl backdrop-blur-xl md:hidden animate-fade-in-up">
      <div className="flex items-center justify-around px-3 py-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="flex flex-col items-center gap-1.5 group relative"
          >
            <div
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-rangoli-gold scale-125 shadow-lg shadow-rangoli-gold/50"
                  : "bg-gray-300 group-hover:bg-gray-400"
              }`}
            />

            <span
              className={`text-[11px] font-semibold tracking-wide transition-all duration-300 ${
                activeSection === section.id
                  ? "text-rangoli-maroon"
                  : "text-gray-500 group-hover:text-gray-700"
              }`}
            >
              {section.label}
            </span>

            {activeSection === section.id && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-rangoli-gold rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}