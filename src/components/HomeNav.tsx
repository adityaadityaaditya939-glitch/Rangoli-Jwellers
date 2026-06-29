"use client";

import { useState, useEffect } from "react";

export default function HomeNav() {
  const [activeSection, setActiveSection] = useState("collections");
  const [isVisible, setIsVisible] = useState(false);

  const sections = [
    { id: "collections", label: "Collections", icon: "💎" },
    { id: "clothing", label: "Clothing", icon: "👗" },
    { id: "world", label: "Rangoli World", icon: "🌍" },
    { id: "gender", label: "Shop by Gender", icon: "👥" },
    { id: "traditional", label: "Traditional", icon: "✨" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.5);

      // Update active section based on scroll position
      const scrollableSections = sections.filter(s => s.id !== "clothing");
      const sectionElements = scrollableSections.map((section) => 
        document.getElementById(`section-${section.id}`)
      );

      let currentSection = "collections";
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            currentSection = scrollableSections[index].id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Handle clothing section - redirect to clothing page
    if (sectionId === "clothing") {
      window.location.href = "/clothing";
      return;
    }

    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  if (!isVisible) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-gray-200 shadow-lg md:hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-center justify-around py-3">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                activeSection === section.id
                  ? "bg-rangoli-maroon/10 text-rangoli-maroon"
                  : "text-rangoli-maroon hover:bg-rangoli-cream/50"
              }`}
              aria-label={`Navigate to ${section.label}`}
            >
              <span className="text-lg">{section.icon}</span>
              <span className="text-xs font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}