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
    <nav className="fixed bottom-4 left-4 right-4 z-40 rounded-2xl border border-white/20 bg-white/85 shadow-2xl backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="flex flex-col items-center"
          >
            <span
              className={`h-0.5 w-8 rounded-full transition-all ${
                activeSection === section.id
                  ? "bg-rangoli-gold"
                  : "bg-transparent"
              }`}
            />

            <span
              className={`mt-2 text-[11px] font-medium transition ${
                activeSection === section.id
                  ? "text-rangoli-maroon"
                  : "text-gray-500"
              }`}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}