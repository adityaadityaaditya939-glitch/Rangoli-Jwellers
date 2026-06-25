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
        notes,
      });

      window.open(buildWhatsAppUrl(message), "_blank");
      onSuccess?.();
      setName("");
      setMobile("");
      setBudget("");
      setMetalPreference("");
      setNotes("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div className={compact ? "grid gap-3 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-rangoli-maroon focus:outline-none focus:ring-1 focus:ring-rangoli-maroon"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Mobile Number</label>
          <input
            required
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-rangoli-maroon focus:outline-none focus:ring-1 focus:ring-rangoli-maroon"
            placeholder="10-digit mobile"
          />
        </div>
      </div>

      <div className={compact ? "grid gap-3 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Budget Range</label>
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-rangoli-maroon focus:outline-none focus:ring-1 focus:ring-rangoli-maroon"
            placeholder="e.g. ₹50,000 - ₹1,00,000"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Metal Preference</label>
          <select
            value={metalPreference}
            onChange={(e) => setMetalPreference(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-rangoli-maroon focus:outline-none focus:ring-1 focus:ring-rangoli-maroon"
          >
            <option value="">Select metal</option>
            {METAL_OPTIONS.map((metal) => (
              <option key={metal} value={metal}>
                {metal}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Custom Notes</label>
        <textarea
          rows={compact ? 3 : 4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-rangoli-maroon focus:outline-none focus:ring-1 focus:ring-rangoli-maroon"
          placeholder="Bridal set, occasion, design preferences..."
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-rangoli-maroon py-3 font-semibold text-white transition hover:bg-rangoli-maroon-dark disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Book Design Consultation"}
      </button>
    </form>
  );
}
