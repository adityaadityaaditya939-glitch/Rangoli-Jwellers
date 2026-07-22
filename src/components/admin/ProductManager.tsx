"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useUploadThing } from "@/lib/uploadthing";
import { IMAGES, METAL_OPTIONS, PRODUCT_CATEGORIES, CLOTHING_CATEGORIES, TRADITIONAL_SUB_CATEGORIES } from "@/lib/constants";
import type { Product } from "@/lib/db";
import ImagePositionEditor from "./ImagePositionEditor";

const JEWELRY_CATEGORIES = PRODUCT_CATEGORIES.filter(
  (cat) => cat !== "all" && 
  !["lehenga", "suits", "saree", "sarees", "lehengas", "kurtis", "sherwanis", "traditional-wears"].includes(cat)
);

const CLOTHING_SLUGS = [...CLOTHING_CATEGORIES.map((c) => c.slug), ...TRADITIONAL_SUB_CATEGORIES.map((c) => c.slug)];
const TRADITIONAL_SLUGS = TRADITIONAL_SUB_CATEGORIES.map((c) => c.slug);

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "rings" as const,
  metal: "Gold" as const,
  gender: "women" as const,
  imageUrl: IMAGES.trending[0] as string,
  stock: "1",
  isFeatured: false,
  soldOut: false,
  isNew: false,
  productType: "jewelry" as "jewelry" | "clothing",
  imagePositionX: 50,
  imagePositionY: 50,
  imageScale: 100,
  images: [] as Array<{ imageUrl: string; colorName: string; isPrimary: boolean }>,
};

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<{name: string; description: string; price: string; category: string; metal: string; gender: string; imageUrl: string; stock: string; isFeatured: boolean; soldOut: boolean; isNew: boolean; productType: "jewelry" | "clothing"; imagePositionX: number; imagePositionY: number; imageScale: number; images: Array<{ imageUrl: string; colorName: string; isPrimary: boolean }> }>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [inventoryFilter, setInventoryFilter] = useState<"all" | "jewelry" | "clothing">("all");
  const [uploading, setUploading] = useState(false);
  
  const { startUpload } = useUploadThing("imageUploader");

  const loadProducts = useCallback(() => {
    fetch("/api/products?admin=true")
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

  function handleProductTypeChange(type: "jewelry" | "clothing") {
    const defaultCategory = type === "jewelry" ? "rings" : ("lehenga" as const);
    setForm({ ...form, productType: type, category: defaultCategory });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Client-side validation
    if (!form.name.trim()) {
      setMessage("Product name is required");
      setLoading(false);
      return;
    }
    if (form.price === "" || isNaN(Number(form.price)) || Number(form.price) < 0) {
      setMessage("Price must be a valid number (0 or greater)");
      setLoading(false);
      return;
    }
    if (form.stock === "" || isNaN(Number(form.stock)) || Number(form.stock) < 0) {
      setMessage("Stock must be a valid number (0 or greater)");
      setLoading(false);
      return;
    }
    if (!form.imageUrl.trim()) {
      setMessage("Image URL is required");
      setLoading(false);
      return;
    }

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
      soldOut: form.soldOut,
      isNew: form.isNew,
      imagePositionX: Number(form.imagePositionX) || 50,
      imagePositionY: Number(form.imagePositionY) || 50,
      imageScale: Number(form.imageScale) || 100,
      images: form.images,
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await fetch(editingId ? `/api/products/${editingId}` : "/api/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("API response:", data);
      if (!res.ok) {
        setMessage(data.error || "Save failed");
        return;
      }

      setMessage(editingId ? "Product updated successfully" : "Product added successfully");
      setTimeout(() => setMessage(""), 3000);
      resetForm();
      loadProducts();
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    const isClothing = CLOTHING_SLUGS.includes(product.category as "lehenga" | "suits" | "saree" | "traditional-wears");
    setForm({
      name: product.name,
      description: product.description || "",
      price: String(product.price),
      category: product.category,
      metal: product.metal || "Gold",
      gender: product.gender || "women",
      imageUrl: product.image_url || IMAGES.trending[0],
      stock: String(product.stock),
      isFeatured: product.is_featured,
      soldOut: product.sold_out || false,
      isNew: product.is_new || false,
      productType: isClothing ? "clothing" : "jewelry",
      imagePositionX: product.image_position_x || 50,
      imagePositionY: product.image_position_y || 50,
      imageScale: product.image_scale || 100,
      images: [],
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    loadProducts();
  }

  async function handleResetProducts() {
    if (!confirm("Reset all products? This will delete existing products and seed gold, diamond, and silver products.")) return;
    setLoading(true);
    try {
      const res = await fetch("/api/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reset: true })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        loadProducts();
      }
    } catch {
      setMessage("Reset failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    try {
      const result = await startUpload([file]);
      if (!result || result.length === 0) {
        setMessage('Upload failed');
        return;
      }
      const [response] = result;
      setForm({ ...form, imageUrl: response.ufsUrl });
    } catch (error) {
      console.error('Upload error:', error);
      setMessage(`Upload failed: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setUploading(false);
    }
  }

  async function handleColorImageUpload(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    try {
      const result = await startUpload([file]);
      if (!result || result.length === 0) {
        setMessage('Upload failed');
        return;
      }
      const [response] = result;
      const newImages = [...form.images];
      newImages[index].imageUrl = response.ufsUrl;
      setForm({ ...form, images: newImages });
    } catch (error) {
      console.error('Upload error:', error);
      setMessage(`Upload failed: ${error instanceof Error ? error.message : 'Please try again.'}`);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-gray-900">
            {editingId ? "Edit Product" : "Add Product"}
          </h2>
          <button
            type="button"
            onClick={handleResetProducts}
            disabled={loading}
            className="text-sm font-medium text-rangoli-maroon hover:underline disabled:opacity-50"
          >
            Reset Products
          </button>
        </div>
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
              min="0"
              step="0.01"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
            />
            <input
              required
              type="number"
              min="0"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleProductTypeChange("jewelry")}
                className={`flex-1 rounded-lg px-4 py-2.5 font-medium transition-all ${
                  form.productType === "jewelry"
                    ? "bg-rangoli-maroon text-white"
                    : "border-2 border-gray-300 text-gray-700 hover:border-rangoli-maroon"
                }`}
              >
                💎 Jewelry
              </button>
              <button
                type="button"
                onClick={() => handleProductTypeChange("clothing")}
                className={`flex-1 rounded-lg px-4 py-2.5 font-medium transition-all ${
                  form.productType === "clothing"
                    ? "bg-rangoli-maroon text-white"
                    : "border-2 border-gray-300 text-gray-700 hover:border-rangoli-maroon"
                }`}
              >
                👗 Clothing
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {form.productType === "jewelry" ? "Jewelry Category" : "Clothing Category"}
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
            >
              {form.productType === "jewelry" 
                ? JEWELRY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))
                : CLOTHING_SLUGS.map((cat) => (
                    <option key={cat} value={cat}>
                      {CLOTHING_CATEGORIES.find((c) => c.slug === cat)?.label || cat}
                    </option>
                  ))
              }
            </select>
            {form.productType === "clothing" && form.category === "traditional-wears" && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Traditional Sub-Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                >
                  <option value="traditional-wears">All Traditional Wear</option>
                  {TRADITIONAL_SUB_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          {form.productType === "jewelry" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Metal Type</label>
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
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Product Image</label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-rangoli-maroon file:text-white hover:file:bg-rangoli-maroon-dark disabled:opacity-50"
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg">
                  <span className="text-sm text-gray-600">Uploading...</span>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Images up to 4MB</p>
            {form.imageUrl && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={form.imageUrl}
                  alt="Product preview"
                  className="w-full max-h-48 object-contain rounded-lg border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Images (Color Options)</label>
            <div className="space-y-3">
              {form.images.map((img, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex gap-2 items-start">
                    <input
                      type="text"
                      placeholder="Color name (e.g., Red, Blue)"
                      value={img.colorName}
                      onChange={(e) => {
                        const newImages = [...form.images];
                        newImages[index].colorName = e.target.value;
                        setForm({ ...form, images: newImages });
                      }}
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5"
                    />
                    <label className="flex items-center gap-2 text-sm mt-2">
                      <input
                        type="checkbox"
                        checked={img.isPrimary}
                        onChange={(e) => {
                          const newImages = form.images.map((i, idx) => ({
                            ...i,
                            isPrimary: idx === index ? e.target.checked : false
                          }));
                          setForm({ ...form, images: newImages });
                        }}
                      />
                      Primary
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = form.images.filter((_, i) => i !== index);
                        setForm({ ...form, images: newImages });
                      }}
                      className="text-red-600 hover:text-red-800 mt-2"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleColorImageUpload(e, index)}
                      disabled={uploading}
                      className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-rangoli-maroon file:text-white hover:file:bg-rangoli-maroon-dark disabled:opacity-50"
                    />
                    {img.imageUrl && (
                      <Image
                        src={img.imageUrl}
                        alt="Color preview"
                        width={48}
                        height={48}
                        className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                      />
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setForm({
                    ...form,
                    images: [...form.images, { imageUrl: "", colorName: "", isPrimary: false }]
                  });
                }}
                className="text-sm font-medium text-rangoli-maroon hover:underline"
              >
                + Add Color Option
              </button>
            </div>
          </div>
          {form.imageUrl && (
            <ImagePositionEditor
              imageUrl={form.imageUrl}
              positionX={form.imagePositionX}
              positionY={form.imagePositionY}
              scale={form.imageScale}
              onChange={(x, y, s) => setForm({ ...form, imagePositionX: x, imagePositionY: y, imageScale: s })}
            />
          )}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isFeatured}
              onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            />
            Featured on homepage
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.soldOut}
              onChange={(e) => setForm({ ...form, soldOut: e.target.checked })}
            />
            Mark as sold out
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isNew}
              onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
            />
            Mark as new
          </label>
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes("successfully") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl font-bold text-gray-900">Inventory ({products.length})</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setInventoryFilter("all")}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                inventoryFilter === "all"
                  ? "bg-rangoli-maroon text-white"
                  : "border border-gray-300 text-gray-700 hover:border-rangoli-maroon"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setInventoryFilter("jewelry")}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                inventoryFilter === "jewelry"
                  ? "bg-rangoli-maroon text-white"
                  : "border border-gray-300 text-gray-700 hover:border-rangoli-maroon"
              }`}
            >
              Jewelry
            </button>
            <button
              type="button"
              onClick={() => setInventoryFilter("clothing")}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                inventoryFilter === "clothing"
                  ? "bg-rangoli-maroon text-white"
                  : "border border-gray-300 text-gray-700 hover:border-rangoli-maroon"
              }`}
            >
              Clothing
            </button>
          </div>
        </div>
        <div className="mt-4 max-h-[700px] space-y-3 overflow-y-auto">
          {products
            .filter((product) => {
              if (inventoryFilter === "all") return true;
              const isClothing = CLOTHING_SLUGS.includes(product.category as "lehenga" | "suits" | "saree" | "traditional-wears");
              return inventoryFilter === "clothing" ? isClothing : !isClothing;
            })
            .map((product) => (
            <div
              key={product.id}
              className="flex items-start justify-between gap-4 rounded-xl border border-gray-100 p-4"
            >
              <div className="flex gap-3 items-start">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg border border-gray-200 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{Number(product.price).toLocaleString("en-IN")} · {product.category}
                  </p>
                </div>
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
