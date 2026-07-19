"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/whatsapp";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-gray-50 py-20 text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="mt-6 font-serif text-2xl font-bold text-gray-900">
            Your cart is empty
          </h2>
          <p className="mt-2 text-gray-600">
            Looks like you haven't added any items yet.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark px-8 py-3 text-base font-semibold text-white transition hover:shadow-lg"
            >
              Browse Jewellery
            </Link>
            <Link
              href="/clothing"
              className="inline-flex items-center justify-center rounded-xl border-2 border-rangoli-maroon px-8 py-3 text-base font-semibold text-rangoli-maroon transition hover:bg-rangoli-cream"
            >
              Browse Clothing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-rangoli-maroon">
          Home
        </Link>
        <span className="mx-2">›</span>
        <span className="text-rangoli-maroon">Shopping Cart</span>
      </nav>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-serif text-3xl font-bold text-gray-900">
          Shopping Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
        </h1>
        <button
          onClick={clearCart}
          className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              {/* Product Image */}
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <Link
                    href={`/catalog/${item.id}`}
                    className="font-serif text-base font-semibold text-gray-900 hover:text-rangoli-maroon transition-colors line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-gray-600">
                    {item.category && (
                      <span className="inline-block rounded-full bg-gray-100 px-2 py-0.5 text-xs uppercase tracking-wide">
                        {item.category}
                      </span>
                    )}
                    {(item.size || item.color) && (
                      <span className="ml-2 text-xs text-gray-500">
                        {item.size && `Size: ${item.size}`}
                        {item.size && item.color && " • "}
                        {item.color && `Color: ${item.color}`}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-900">
                    ₹{formatPrice(item.price)}
                  </p>

                  <div className="flex items-center gap-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-lg border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cart.reduce((count, item) => count + item.quantity, 0)} items)</span>
                <span className="font-medium text-gray-900">₹{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{formatPrice(cartTotal)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                const message = cart
                  .map(
                    (item) =>
                      `• ${item.name} (Qty: ${item.quantity}) - ₹${formatPrice(
                        item.price * item.quantity
                      )}${item.size ? ` [Size: ${item.size}]` : ""}${
                        item.color ? ` [Color: ${item.color}]` : ""
                      }`
                  )
                  .join("\n");
                const totalMessage = `Total: ₹${formatPrice(cartTotal)}`;
                const fullMessage = `Hello Rangoli Exclusive! I would like to place an order:\n\n${message}\n\n${totalMessage}`;
                window.open(`https://wa.me/918894506405?text=${encodeURIComponent(fullMessage)}`, "_blank");
              }}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-rangoli-maroon to-rangoli-maroon-dark py-4 text-base font-semibold text-white transition hover:shadow-lg"
            >
              Proceed to WhatsApp Checkout
            </button>

            <Link
              href="/catalog"
              className="mt-3 block w-full rounded-xl border-2 border-rangoli-maroon py-3 text-center text-base font-semibold text-rangoli-maroon transition hover:bg-rangoli-cream"
            >
              Continue Shopping
            </Link>

            <p className="mt-4 text-center text-xs text-gray-500">
              Secure checkout via WhatsApp. No payment required upfront.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
