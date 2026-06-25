"use client";

import { useCallback, useEffect, useState } from "react";
import { IMAGES, METAL_OPTIONS, PRODUCT_CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/db";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "rings",
  metal: "Gold",
  gender: "women",
  imageUrl: IMAGES.trending[0],
  stock: "1",
  isFeatured: false,
};

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadProducts = useCallback(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      category: form.category,
      metal: form.metal,
      gender: form.gender,
      imageUrl: form.imageUrl,
      stock: Number(form.stock),
      isFeatured: form.isFeatured,
    };

    try {
      const res = await fetch(editingId ? `/api/products/${editingId}` : "/api/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Save failed");
        return;
      }

      setMessage(editingId ? "Product updated" : "Product added");
      resetForm();
      loadProducts();
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description || "",
      price: String(product.price),
      category: product.category,
      metal: product.metal || "Gold",
      gender: product.gender || "women",
      imageUrl: product.image_url,
      stock: String(product.stock),
      isFeatured: product.is_featured,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-gray-900">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            required
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
            />
            <input
              required
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
            />
          </div>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
          >
            {PRODUCT_CATEGORIES.filter((c) => c !== "all").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.metal}
              onChange={(e) => setForm({ ...form, metal: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
            >
              {METAL_OPTIONS.map((metal) => (
                <option key={metal} value={metal}>
                  {metal}
                </option>
              ))}
            </select>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
            >
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kids">Kids</option>
            </select>
          </div>
          <input
            required
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            />
            Featured on homepage
          </label>
          {message && <p className="text-sm text-rangoli-maroon">{message}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-rangoli-maroon px-6 py-2.5 font-semibold text-white hover:bg-rangoli-maroon-dark disabled:opacity-60"
            >
              {loading ? "Saving..." : editingId ? "Update" : "Add Product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-6 py-2.5 text-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-gray-900">Inventory ({products.length})</h2>
        <div className="mt-4 max-h-[700px] space-y-3 overflow-y-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 p-4"
            >
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{Number(product.price).toLocaleString("en-IN")} · {product.category}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(product)}
                  className="text-sm font-medium text-rangoli-maroon hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  className="text-sm font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
