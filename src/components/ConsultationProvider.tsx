"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface ConsultationContextValue {
  openConsultation: (source?: string) => void;
  closeConsultation: () => void;
  isOpen: boolean;
  source: string;
}

const ConsultationContext = createContext<ConsultationContextValue | null>(null);

const INITIAL_DELAY = 12000;
const SECOND_DELAY = 120000;
const THIRD_DELAY = 300000;

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState("website");
  const [dismissCount, setDismissCount] = useState(0);

  const openConsultation = useCallback((nextSource = "website") => {
    setSource(nextSource);
    setIsOpen(true);
  }, []);

  const closeConsultation = useCallback(() => {
    setIsOpen(false);
    setDismissCount((count) => count + 1);
  }, []);

  useEffect(() => {
    if (isOpen) return;

    const delay =
      dismissCount === 0 ? INITIAL_DELAY : dismissCount === 1 ? SECOND_DELAY : THIRD_DELAY;

    const timer = window.setTimeout(() => {
      openConsultation("popup");
    }, delay);

    return () => window.clearTimeout(timer);
  }, [dismissCount, isOpen, openConsultation]);

  return (
    <ConsultationContext.Provider
      value={{ openConsultation, closeConsultation, isOpen, source }}
    >
      {children}
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const ctx = useContext(ConsultationContext);
  if (!ctx) {
    throw new Error("useConsultation must be used within ConsultationProvider");
  }
  return ctx;
}
