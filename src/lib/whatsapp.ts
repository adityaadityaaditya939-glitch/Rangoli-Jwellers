import { SHOP } from "./constants";

export function buildWhatsAppUrl(message: string) {
  const number = SHOP.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppMessage(product: {
  name: string;
  price: string | number;
  id: number;
}) {
  const price =
    typeof product.price === "number"
      ? product.price.toLocaleString("en-IN")
      : Number(product.price).toLocaleString("en-IN");

  return `Hello ${SHOP.name}! I am interested in:\n\n*${product.name}*\nPrice: ₹${price}\n\nProduct link: ${getProductUrl(product.id)}`;
}

export function buildConsultationWhatsAppMessage(data: {
  name: string;
  mobile: string;
  budget?: string;
  metalPreference?: string;
  notes?: string;
}) {
  const lines = [
    `Hello ${SHOP.name}! I would like to book a design consultation.`,
    "",
    `Name: ${data.name}`,
    `Mobile: ${data.mobile}`,
  ];

  if (data.budget) lines.push(`Budget: ${data.budget}`);
  if (data.metalPreference) lines.push(`Metal Preference: ${data.metalPreference}`);
  if (data.notes) lines.push(`Notes: ${data.notes}`);

  return lines.join("\n");
}

export function getProductUrl(id: number) {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/catalog/${id}`;
  }
  return `/catalog/${id}`;
}

export function formatPrice(price: string | number) {
  const num = typeof price === "number" ? price : Number(price);
  return num.toLocaleString("en-IN");
}
