import { SHOP } from "./constants";

export function buildWhatsAppUrl(message: string, customNumber?: string) {
  const number = customNumber || SHOP.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildProductWhatsAppMessage(product: {
  name: string;
  price: number;
  id: number;
}) {
  const price = product.price.toLocaleString("en-IN");

  return `Hello ${SHOP.name}! I am interested in:\n\n*${product.name}*\nPrice: ₹${price}\n\nProduct link: ${getProductUrl(product.id)}`;
}

export function buildConsultationWhatsAppMessage(data: {
  name: string;
  mobile: string;
  budget?: string;
  metalPreference?: string;
  queryType?: string;
  notes?: string;
}) {
  const lines = [
    `Hello ${SHOP.name}! I would like to book a design consultation.`,
    "",
    `Name: ${data.name}`,
    `Mobile: ${data.mobile}`,
  ];

  if (data.queryType) lines.push(`Query Type: ${data.queryType === "clothing" ? "Clothing" : "Jewellery"}`);
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

export function formatPrice(price: number) {
  return price.toLocaleString("en-IN");
}
