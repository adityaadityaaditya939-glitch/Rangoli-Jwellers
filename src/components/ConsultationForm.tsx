"use client";

import { useState } from "react";
import { METAL_OPTIONS } from "@/lib/constants";
import { buildConsultationWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface ConsultationFormProps {
  source?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export default function ConsultationForm({
  source = "website",
  onSuccess,
  compact = false,
}: ConsultationFormProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [budget, setBudget] = useState("");
  const [metalPreference, setMetalPreference] = useState("");
  const [queryType, setQueryType] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          budget,
          metalPreference,
          queryType,
          notes,
          source,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Submission failed");
        return;
      }

      const message = buildConsultationWhatsAppMessage({
        name,
        mobile,
        budget,
        metalPreference,
        queryType,
        notes,
      });

      const phoneNumber = queryType === "clothing" ? "918894506405" : undefined;
      window.open(buildWhatsAppUrl(message, phoneNumber), "_blank");
      onSuccess?.();
      setName("");
      setMobile("");
      setBudget("");
      setMetalPreference("");
      setQueryType("");
      setNotes("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3 sm:space-y-4" : "space-y-5"}>
      <div className={compact ? "grid gap-3 sm:gap-4 sm:grid-cols-2" : "grid gap-5 sm:grid-cols-2"}>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">Full Name</label>
          <div className="relative">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 pl-10 text-sm focus:border-rangoli-maroon focus:outline-none focus:ring-2 focus:ring-rangoli-maroon/20 transition-all sm:px-4 sm:py-3"
              placeholder="Your name"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 sm:top-3 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">Mobile Number</label>
          <div className="relative">
            <input
              required
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 pl-10 text-sm focus:border-rangoli-maroon focus:outline-none focus:ring-2 focus:ring-rangoli-maroon/20 transition-all sm:px-4 sm:py-3"
              placeholder="10-digit mobile"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 sm:top-3 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">Query Type</label>
        <div className="relative">
          <select
            value={queryType}
            onChange={(e) => setQueryType(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 pl-10 text-sm focus:border-rangoli-maroon focus:outline-none focus:ring-2 focus:ring-rangoli-maroon/20 transition-all appearance-none bg-white sm:px-4 sm:py-3"
          >
            <option value="">Select query type</option>
            <option value="jewellery">Jewellery</option>
            <option value="clothing">Clothing</option>
          </select>
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 sm:top-3 sm:h-5 sm:w-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <svg className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 sm:top-3 sm:h-5 sm:w-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className={compact ? "grid gap-3 sm:gap-4 sm:grid-cols-2" : "grid gap-5 sm:grid-cols-2"}>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">Budget Range</label>
          <div className="relative">
            <input
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 pl-10 text-sm focus:border-rangoli-maroon focus:outline-none focus:ring-2 focus:ring-rangoli-maroon/20 transition-all sm:px-4 sm:py-3"
              placeholder="e.g. ₹50,000 - ₹1,00,000"
            />
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 sm:top-3 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">Your Preference</label>
          <div className="relative">
            <select
              value={metalPreference}
              onChange={(e) => setMetalPreference(e.target.value)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2.5 pl-10 text-sm focus:border-rangoli-maroon focus:outline-none focus:ring-2 focus:ring-rangoli-maroon/20 transition-all appearance-none bg-white sm:px-4 sm:py-3"
            >
              <option value="">Select preference</option>
              {METAL_OPTIONS.map((metal) => (
                <option key={metal} value={metal}>
                  {metal}
                </option>
              ))}
            </select>
            <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 sm:top-3 sm:h-5 sm:w-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <svg className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 sm:top-3 sm:h-5 sm:w-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-gray-700 sm:text-sm">Custom Notes</label>
        <div className="relative">
          <textarea
            rows={compact ? 2 : 4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 pl-10 text-sm focus:border-rangoli-maroon focus:outline-none focus:ring-2 focus:ring-rangoli-maroon/20 transition-all resize-none sm:px-4 sm:py-3"
            placeholder="Bridal set, occasion, design preferences..."
          />
          <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 sm:top-3 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 px-3 py-2.5 text-xs text-red-600 sm:px-4 sm:py-3 sm:text-sm flex items-start gap-2">
          <svg className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 sm:py-3 sm:text-base"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </span>
        ) : (
          "Book Design Consultation"
        )}
      </button>
    </form>
  );
}
