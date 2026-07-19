export const SHOP = {
  name: "Rangoli Exclusive",
  tagline: "Crafted with love, worn with pride",
  address: "The Mall Rd, Upper Bazar, Rohru, Himachal Pradesh 171207",
  email: "info@rangolijwellers.com",
  whatsapp: process.env.WHATSAPP_NUMBER || "918894506405",
  phone: process.env.SHOP_PHONE || "+918894506405",
  clothingPhone: process.env.CLOTHING_PHONE || "+918894506405",
  poweredBy: "TechExplorers",
} as const;

export const IMAGES = {
  logo: "/images/Updated logo.png",
  hero: [
    "/images/New_hero_sec_1.jpg",
    "/images/Hero_sec_1_updated.jpg.JPG",
    "/images/Hero_sec_2_new.JPG",
    "/images/Hero_sec_3_new.JPG",
    "/images/Hero_sec_2.jpg",
    "/images/Hero_sec_3.jpg",
    "/images/Hero_sec_4.jpg",
  ],
  heroDesktop: [
    "/images/Hero_sec_1_updated.jpg.JPG",
    "/images/Hero_sec_2_new - Crop.JPG",
    "/images/Hero_sec_3_new - Crop.JPG",
    "/images/Hero_sec_2.jpg",
    "/images/Hero_sec_3.jpg",
    "/images/Hero_sec_4.jpg",
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
  { label: "Silver", slug: "silver", icon: "🥈" },
  { label: "Earrings", slug: "earrings", icon: "✨" },
  { label: "Rings", slug: "rings", icon: "💫" },
  { label: "Daily Wear", slug: "daily-wear", icon: "🌸" },
  { label: "Gemstone", slug: "gemstone", icon: "🔮" },
  { label: "Wedding", slug: "wedding", icon: "💒" },
  { label: "Gifting", slug: "gifting", icon: "🎁" },
  { label: "Clothing", slug: "clothing", icon: "👗" },
] as const;

export const PERFECT_MATCH_CATEGORIES = [
  { label: "Earrings", slug: "earrings", image: "/images/shop_by_category_earrings.jpg" },
  { label: "Pendants", slug: "pendants", image: "/images/shop_by_category_pendant.jpg" },
  { label: "Finger Rings", slug: "rings", image: "/images/shop_by_category_fingerrings.jpg" },
  { label: "Mangalsutra", slug: "mangalsutra", image: "/images/shop_by_category_magalsutra.jpg" },
] as const;

export const WORLD_CATEGORIES = [
  { label: "Wedding", slug: "wedding", image: "/images/Rangoli_world_sec_Wedding1.png.jpg", tall: true },
  { label: "Diamond", slug: "diamond", image: "/images/Rangoli_world_sec_Daimond1.png.jpg", tall: false },
  { label: "Gold", slug: "gold", image: "/images/Rangoli_world_sec_Gold1.png.jpg", tall: false },
  { label: "Dailywear", slug: "daily-wear", image: "/images/Rangoli_world_sec_dailywear1.png.jpg", tall: true },
] as const;

export const GENDER_CATEGORIES = [
  { label: "For Her", slug: "women", image: "/images/Shop_by_gender_female.jpg" },
  { label: "For Him", slug: "men", image: "/images/Shop_by_gender_male.jpg" },
  { label: "For Kids", slug: "kids", image: "/images/Shop_by_gender_kid.jpg" },
] as const;

export const CLOTHING_CATEGORIES = [
  { label: "Traditional Wears", slug: "traditional-wears", image: "/images/Clothes/Traditional_1.jpg.jpg", tall: true },
  { label: "Suits", slug: "suits", image: "/images/Clothes/Suit.jpg", tall: true },
  { label: "Lehenga", slug: "lehenga", image: "/images/Clothes/Lehenga_2.jpg.jpg", tall: true },
  { label: "Saree", slug: "saree", image: "/images/Clothes/Saree_2.jpg.jpg", tall: true },
] as const;

export const TRADITIONAL_CATEGORIES = [
  { label: "Traditional dresses", slug: "traditional-first", image: "/images/Clothes/Traditional_firstPhoto.jpg.jpg" },
  { label: "Traditional dresses", slug: "lehenga", image: "/images/Traditional_Elegance_1.1.JPG" },
  { label: "Traditional dresses", slug: "suits", image: "/images/Traditional_Elegance_2.jpg" },
  { label: "Traditional dresses", slug: "saree", image: "/images/Traditional_Elegance_3.jpg" },
  { label: "Sadri", slug: "sadri", image: "/images/Clothes/Traditional_10.1.jpg.jpg" },
] as const;

export const EXPERIENCE_SLIDES = [
  {
    title: "Visit Our Store",
    subtitle: "Experience luxury in person at Rohru",
    image: "/images/Visit_our_store.png",
  },
  {
    title: "Book a Consultation",
    subtitle: "Custom bridal & festive designs",
    image: IMAGES.collection[0],
  },
] as const;

export const METAL_OPTIONS = ["Gold", "Silver", "Diamond", "Platinum", "Mixed", "Traditional", "Suit", "Saree", "Lehenga"] as const;

export const PRODUCT_CATEGORIES = [
  "all",
  "gold",
  "diamond",
  "silver",
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
  "traditional-wears",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
