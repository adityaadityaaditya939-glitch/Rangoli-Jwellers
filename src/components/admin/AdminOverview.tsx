"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  products: number;
  leads: number;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats>({ products: 0, leads: 0 });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data.stats || { products: 0, leads: 0 }))
      .catch(() => {});
  }, []);

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="mt-2 text-4xl font-bold text-rangoli-maroon">{stats.products}</p>
          <Link href="/admin/products" className="mt-4 inline-block text-sm text-rangoli-maroon hover:underline">
            Manage inventory →
          </Link>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">Consultation Leads</p>
          <p className="mt-2 text-4xl font-bold text-rangoli-maroon">{stats.leads}</p>
          <Link href="/admin/leads" className="mt-4 inline-block text-sm text-rangoli-maroon hover:underline">
            View leads →
          </Link>
        </div>
      </div>
    </div>
  );
}
