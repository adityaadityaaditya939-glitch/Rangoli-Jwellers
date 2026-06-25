"use client";

import { useCallback, useEffect, useState } from "react";
import type { Consultation } from "@/lib/db";

export default function LeadsTable() {
  const [leads, setLeads] = useState<Consultation[]>([]);

  const loadLeads = useCallback(() => {
    fetch("/api/consultations")
      .then((res) => res.json())
      .then((data) => setLeads(data.consultations || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold text-gray-900">Consultation Leads</h2>
          <p className="text-sm text-gray-500">{leads.length} total inquiries</p>
        </div>
        <div className="flex gap-2">
          <a
            href="/api/admin/export?format=csv"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Export CSV
          </a>
          <a
            href="/api/admin/export?format=xlsx"
            className="rounded-lg bg-rangoli-maroon px-4 py-2 text-sm font-medium text-white hover:bg-rangoli-maroon-dark"
          >
            Export Excel
          </a>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-200 text-gray-500">
            <tr>
              <th className="px-3 py-3 font-medium">Name</th>
              <th className="px-3 py-3 font-medium">Mobile</th>
              <th className="px-3 py-3 font-medium">Budget</th>
              <th className="px-3 py-3 font-medium">Metal</th>
              <th className="px-3 py-3 font-medium">Source</th>
              <th className="px-3 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-gray-500">
                  No consultation leads yet.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100">
                  <td className="px-3 py-3 font-medium text-gray-900">{lead.name}</td>
                  <td className="px-3 py-3">{lead.mobile}</td>
                  <td className="px-3 py-3">{lead.budget || "—"}</td>
                  <td className="px-3 py-3">{lead.metal_preference || "—"}</td>
                  <td className="px-3 py-3">{lead.source}</td>
                  <td className="px-3 py-3 text-gray-500">
                    {new Date(lead.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
