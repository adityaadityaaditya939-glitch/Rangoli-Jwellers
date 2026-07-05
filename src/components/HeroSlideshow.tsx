"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeroSlideshowProps {
  images: readonly string[];
  interval?: number;
}

export default function HeroSlideshow({
  images,
  interval = 5000,
}: HeroSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play slideshow
  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
  }, [images.length, interval]);

  useEffect(() => {
    resetAutoPlay();
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [resetAutoPlay]);

  // Handle drag start
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setTranslateX(0);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  // Handle drag move
  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    if (translateX > threshold) {
      // Swipe right - go to previous
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    } else if (translateX < -threshold) {
      // Swipe left - go to next
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }

    setTranslateX(0);
    resetAutoPlay();
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  // Calculate slide positions with partial visibility
  const getSlideStyle = (index: number) => {
    const totalSlides = images.length;
    const centerIndex = currentIndex;
    
    // Calculate distance from center (with wrap-around)
    let distance = index - centerIndex;
    if (distance > totalSlides / 2) distance -= totalSlides;
    if (distance < -totalSlides / 2) distance += totalSlides;

    // Base translation
    const slideWidth = 100; // percentage
    const gap = 8; // percentage gap
    const baseTranslate = distance * (slideWidth + gap);

    // Scale and opacity based on distance
    const scale = distance === 0 ? 1 : 0.85;
    const opacity = distance === 0 ? 1 : 0.5;
    const zIndex = distance === 0 ? 10 : Math.abs(distance) === 1 ? 5 : 1;

    return {
      transform: `translateX(${baseTranslate + translateX / 10}%) scale(${scale})`,
      opacity,
      zIndex,
      transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[22/9]">
        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {images.map((src, index) => {
            const style = getSlideStyle(index);
            const isActive = index === currentIndex;

            return (
              <div
                key={src}
                className="absolute h-full w-[90%] overflow-hidden rounded-3xl shadow-2xl"
                style={style}
              >
                <Image
                  src={src}
                  alt={`Hero Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Slide Content - Only show for active slide */}
                {isActive && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                    <span className="mb-3 h-0.5 w-12 rounded-full bg-rangoli-gold sm:mb-4 sm:w-16" />
                    
                    <p className="text-[10px] uppercase tracking-[0.35em] text-rangoli-gold sm:text-xs sm:tracking-[0.4em]">
                      Since 1998 • Rohru
                    </p>

                    <h1 className="mt-3 max-w-3xl font-serif text-3xl font-bold leading-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl xl:text-6xl">
                      Timeless Elegance
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/90 sm:mt-4 sm:text-base lg:text-lg">
                      Discover handcrafted Gold, Diamond & Bridal Jewellery
                    </p>

                    <Link
                      href="/catalog"
                      className="mt-6 rounded-full bg-rangoli-gold px-6 py-2.5 text-sm font-semibold text-black transition hover:scale-105 hover:shadow-xl sm:mt-8 sm:px-8 sm:py-3 sm:text-base"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => goToSlide((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white transition hover:bg-white/20 hover:scale-110 sm:left-8 sm:h-14 sm:w-14"
          aria-label="Previous slide"
        >
          <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => goToSlide((currentIndex + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white transition hover:bg-white/20 hover:scale-110 sm:right-8 sm:h-14 sm:w-14"
          aria-label="Next slide"
        >
          <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-8 sm:gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "h-2 w-8 bg-rangoli-gold sm:h-2.5 sm:w-10"
                  : "h-2 w-2 bg-white/50 hover:bg-white/70 sm:h-2.5 sm:w-2.5"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}