import { neon } from "@neondatabase/serverless";

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }
  return neon(url);
}

export async function initDatabase() {
  const sql = getDb();

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(12, 2) NOT NULL,
      category VARCHAR(50) NOT NULL,
      metal VARCHAR(50),
      gender VARCHAR(20),
      image_url VARCHAR(500) NOT NULL,
      stock INTEGER DEFAULT 1,
      is_featured BOOLEAN DEFAULT false,
      image_position_x DECIMAL(5, 2) DEFAULT 50,
      image_position_y DECIMAL(5, 2) DEFAULT 50,
      image_scale DECIMAL(5, 2) DEFAULT 100,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS consultations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      mobile VARCHAR(20) NOT NULL,
      budget VARCHAR(100),
      metal_preference VARCHAR(50),
      notes TEXT,
      source VARCHAR(50) DEFAULT 'website',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS product_images (
      id SERIAL PRIMARY KEY,
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      image_url VARCHAR(500) NOT NULL,
      color_name VARCHAR(50),
      is_primary BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  const userCount = await sql`SELECT COUNT(*)::int AS count FROM users`;
  if ((userCount[0]?.count as number) === 0) {
    // @ts-expect-error Neon type compatibility issue
    await seedDefaultAdmin(sql);
  }

  const count = await sql`SELECT COUNT(*)::int AS count FROM products`;
  if ((count[0]?.count as number) === 0) {
    // @ts-expect-error Neon type compatibility issue
    await seedProducts(sql);
  }
}

export async function resetProducts() {
  const sql = getDb();
  await sql`DELETE FROM products`;
  // @ts-expect-error Neon type compatibility issue
  await seedProducts(sql);
}

async function seedDefaultAdmin(sql: ReturnType<typeof neon>) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@rangolijwellers.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const hashedPassword = await hashPassword(adminPassword);
  
  await sql`
    INSERT INTO users (email, password, name, role)
    VALUES (
      ${adminEmail},
      ${hashedPassword},
      'Admin User',
      'admin'
    )
  `;
}

async function hashPassword(password: string): Promise<string> {
  // Simple hash for demo - in production use bcrypt
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "rangoli_salt");
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function seedProducts(sql: ReturnType<typeof neon>) {
  const samples = [];
  
  // Gold products
  for (let i = 38; i >= 1; i--) {
    samples.push({
      name: "Gold Jewellery",
      description: "",
      price: 0,
      category: "gold",
      metal: "Gold",
      gender: "women",
      image: `/images/Gold_gdq/gp_${i}.jpg`,
    });
  }

  // Diamond products
  const diamondImages = [
    "DSC01494.jpg",
    "DSC01517.jpg",
    "DSC01551.jpg",
    "DSC01552.jpg",
    "DSC01555.jpg",
    "DSC01558.jpg",
    "DSC01561.jpg"
  ];
  for (const img of diamondImages) {
    samples.push({
      name: "Diamond Jewellery",
      description: "",
      price: 0,
      category: "diamond",
      metal: "Diamond",
      gender: "women",
      image: `/images/Diamond_products/${img}`,
    });
  }

  // Silver products
  const silverImages = [
    "DSC01538.jpg",
    "DSC01539.jpg",
    "DSC01588.jpg",
    "DSC08341.jpg",
    "DSC08447.jpg",
    "DSC08448.jpg",
    "DSC08449.jpg",
    "DSC08450.jpg",
    "DSC08452.jpg",
    "DSC08453.jpg",
    "DSC08454.jpg",
    "DSC08455.jpg"
  ];
  for (const img of silverImages) {
    samples.push({
      name: "Silver Jewellery",
      description: "",
      price: 0,
      category: "silver",
      metal: "Silver",
      gender: "women",
      image: `/images/Silver_Products/${img}`,
    });
  }

  // Clothing products
  const clothingProducts = [
    { name: "Pahari Traditional Dress", category: "traditional-wears", image: "/images/Clothes/Traditional_firstPhoto.jpg.jpg", gender: "women" },
    { name: "Pink Lehenga", category: "lehenga", image: "/images/Clothes/Lehenga_2.jpg.jpg", gender: "women" },
    { name: "Sadri Saree", category: "saree", image: "/images/Clothes/Saree_2.jpg.jpg", gender: "women" },
    { name: "Elegant Suit", category: "suits", image: "/images/Clothes/Suit.jpg", gender: "women" },
    { name: "Traditional Lehenga", category: "lehenga", image: "/images/Clothing_collection_Lehanga.jpg", gender: "women" },
    { name: "Traditional Saree", category: "saree", image: "/images/Clothing_collecting_Saare.jpg", gender: "women" },
    { name: "Traditional Suit", category: "suits", image: "/images/Clothing_collection_Suit.jpg", gender: "women" },
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_2.jpg.jpg", gender: "women" },
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_3.jpg.jpg", gender: "women" },
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_4.jpg.jpg", gender: "women" },
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_5.jpg.jpg", gender: "women" },
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_6.jpg.jpg", gender: "women" },
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_7.jpg.jpg", gender: "women" },
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_8.jpg.jpg", gender: "women" },
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_9.jpg.jpg", gender: "women" },
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_10.jpg.jpg", gender: "women" },
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_11.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_1.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_2.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_3.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_4.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_5.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_6.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_7.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_8.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_9.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_10.jpg.jpg", gender: "women" },
    { name: "Sadri", category: "traditional-wears", image: "/images/Clothes/Traditional_10.1.jpg.jpg", gender: "women" },
    { name: "Dhatu", category: "traditional-wears", image: "/images/Clothes/Traditional_11.jpg.jpg", gender: "women" },
    { name: "Dhatu", category: "traditional-wears", image: "/images/Clothes/Traditional_12.jpg.jpg", gender: "women" },
    { name: "Dhatu", category: "traditional-wears", image: "/images/Clothes/Traditional_13.jpg.jpg", gender: "women" },
    { name: "Dhatu", category: "traditional-wears", image: "/images/Clothes/Traditional_14.jpg.jpg", gender: "women" },
    { name: "Dhatu", category: "traditional-wears", image: "/images/Clothes/Traditional_15.jpg.jpg", gender: "women" },
    { name: "Dhatu", category: "traditional-wears", image: "/images/Clothes/Traditional_16.jpg.jpg", gender: "women" },
    { name: "Dhatu", category: "traditional-wears", image: "/images/Clothes/Traditional_17.jpg.jpg", gender: "women" },
    { name: "Dhatu", category: "traditional-wears", image: "/images/Clothes/Traditional_18.jpg.jpg", gender: "women" },
    { name: "Dhatu", category: "traditional-wears", image: "/images/Clothes/Traditional_19.jpg.jpg", gender: "women" },
    { name: "Dhatu", category: "traditional-wears", image: "/images/Clothes/Traditional_20.jpg.jpg", gender: "women" },
    { name: "Rejta", category: "traditional-wears", image: "/images/Clothes/Traditional_21.jpg.jpg", gender: "women" },
    { name: "Rejta", category: "traditional-wears", image: "/images/Clothes/Traditional_22.jpg.jpg", gender: "women" },
    { name: "Rejta", category: "traditional-wears", image: "/images/Clothes/Traditional_23.jpg.jpg", gender: "women" },
    { name: "Rejta", category: "traditional-wears", image: "/images/Clothes/Traditional_24.jpg.jpg", gender: "women" },
    { name: "Rejta", category: "traditional-wears", image: "/images/Clothes/Traditional_25.jpg.jpg", gender: "women" },
    { name: "Rejta", category: "traditional-wears", image: "/images/Clothes/Traditional_26.jpg.jpg", gender: "women" },
    { name: "Rejta", category: "traditional-wears", image: "/images/Clothes/Traditional_27.jpg.jpg", gender: "women" },
    { name: "Rejta", category: "traditional-wears", image: "/images/Clothes/Traditional_28.jpg.jpg", gender: "women" },
  ];
  for (const item of clothingProducts) {
    samples.push({
      name: item.name,
      description: "",
      price: 0,
      category: item.category,
      metal: null,
      gender: item.gender,
      image: item.image,
    });
  }

  for (const item of samples) {
    await sql`
      INSERT INTO products (name, description, price, category, metal, gender, image_url, stock, is_featured)
      VALUES (
        ${item.name},
        ${item.description},
        ${item.price},
        ${item.category},
        ${item.metal},
        ${item.gender},
        ${item.image},
        ${Math.floor(Math.random() * 3) + 1},
        ${Math.random() > 0.5}
      )
    `;
  }
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category: string;
  metal: string | null;
  gender: string | null;
  image_url: string;
  stock: number;
  is_featured: boolean;
  image_position_x: number;
  image_position_y: number;
  image_scale: number;
  created_at: string;
  updated_at: string;
}

export interface Consultation {
  id: number;
  name: string;
  mobile: string;
  budget: string | null;
  metal_preference: string | null;
  notes: string | null;
  source: string;
  created_at: string;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  color_name: string | null;
  is_primary: boolean;
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  created_at: string;
}
