export const SHOP = {
  name: "Rangoli Jwellers",
  tagline: "Crafted with love, worn with pride",
  address: "The Mall Rd, Upper Bazar, Rohru, Himachal Pradesh 171207",
  email: "info@rangolijwellers.com",
  whatsapp: process.env.WHATSAPP_NUMBER || "919805837108",
  phone: process.env.SHOP_PHONE || "+919805837108",
  poweredBy: "TechExplorers",
} as const;

export const IMAGES = {
  logo: "/images/(A)Logo.png",
  hero: [
    "/images/(B)Hero_sec_1.png",
    "/images/(B)Hero_sec_2.png",
    "/images/(B)Hero_sec_3.png",
    "/images/(B)Hero_sec_4.png",
    "/images/(B)Hero_sec_5.png",
  ],
  collection: [
    "/images/(C)Collection_sec_type1.png",
    "/images/(C) Collection_sec_type2.png",
    "/images/(C) Collection_sec_type3.png",
  ],
  trending: [
    "/images/(D)Top_trending1.png",
    "/images/(D)Top_trending2.png",
    "/images/(D)Top_trending3.png",
  ],
} as const;

export const NAV_CATEGORIES = [
  { label: "All Jewellery", slug: "all", icon: "💎" },
  { label: "Gold", slug: "gold", icon: "🥇" },
  { label: "Diamond", slug: "diamond", icon: "💍" },
  { label: "Earrings", slug: "earrings", icon: "✨" },
  { label: "Rings", slug: "rings", icon: "💫" },
  { label: "Daily Wear", slug: "daily-wear", icon: "🌸" },
  { label: "Gemstone", slug: "gemstone", icon: "🔮" },
  { label: "Wedding", slug: "wedding", icon: "💒" },
  { label: "Gifting", slug: "gifting", icon: "🎁" },
  { label: "Clothing", slug: "clothing", icon: "👗" },
] as const;

export const PERFECT_MATCH_CATEGORIES = [
  { label: "Earrings", slug: "earrings", image: IMAGES.collection[0] },
  { label: "Pendants", slug: "pendants", image: IMAGES.collection[1] },
  { label: "Finger Rings", slug: "rings", image: IMAGES.trending[0] },
  { label: "Mangalsutra", slug: "mangalsutra", image: IMAGES.trending[1] },
] as const;

export const WORLD_CATEGORIES = [
  { label: "Wedding", slug: "wedding", image: "/images/Rangoli_world_sec_Wedding1.png.jpg", tall: true },
  { label: "Diamond", slug: "diamond", image: "/images/Rangoli_world_sec_Daimond1.png.jpg", tall: false },
  { label: "Gold", slug: "gold", image: "/images/Rangoli_world_sec_Gold1.png.jpg", tall: false },
  { label: "Dailywear", slug: "daily-wear", image: "/images/Rangoli_world_sec_dailywear1.png.jpg", tall: true },
] as const;

export const GENDER_CATEGORIES = [
  { label: "For Her", slug: "women", image: IMAGES.collection[0] },
  { label: "For Him", slug: "men", image: IMAGES.collection[1] },
  { label: "For Kids", slug: "kids", image: IMAGES.collection[2] },
] as const;

export const CLOTHING_CATEGORIES = [
  { label: "Sarees", slug: "sarees", image: IMAGES.trending[0] },
  { label: "Lehengas", slug: "lehengas", image: IMAGES.trending[1] },
  { label: "Kurtis", slug: "kurtis", image: IMAGES.trending[2] },
  { label: "Sherwanis", slug: "sherwanis", image: IMAGES.collection[0] },
] as const;

export const TRADITIONAL_CATEGORIES = [
  { label: "Lehenga Jewellery", slug: "lehenga", image: IMAGES.trending[0] },
  { label: "Bridal Suits", slug: "suits", image: IMAGES.trending[1] },
  { label: "Saree Collection", slug: "saree", image: IMAGES.trending[2] },
] as const;

export const EXPERIENCE_SLIDES = [
  {
    title: "Visit Our Store",
    subtitle: "Experience luxury in person at Rohru",
    image: IMAGES.hero[4],
  },
  {
    title: "Book a Consultation",
    subtitle: "Custom bridal & festive designs",
    image: IMAGES.collection[0],
  },
] as const;

export const METAL_OPTIONS = ["Gold", "Silver", "Diamond", "Platinum", "Mixed"] as const;

export const PRODUCT_CATEGORIES = [
  "all",
  "gold",
  "diamond",
  "earrings",
  "rings",
  "daily-wear",
  "gemstone",
  "wedding",
  "gifting",
  "pendants",
  "mangalsutra",
  "lehenga",
  "suits",
  "saree",
  "sarees",
  "lehengas",
  "kurtis",
  "sherwanis",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
