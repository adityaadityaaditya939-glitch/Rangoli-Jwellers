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
  const samples = [
    {
      name: "Bloom Bud Gold Ring",
      description: "Elegant gold ring with floral motif, perfect for daily wear.",
      price: 66942,
      category: "rings",
      metal: "Gold",
      gender: "women",
      image: "/images/(D)Top_trending1.png",
    },
    {
      name: "Bloom Cluster Gold Ring",
      description: "Statement cluster ring crafted in 22K gold.",
      price: 69044,
      category: "rings",
      metal: "Gold",
      gender: "women",
      image: "/images/(D)Top_trending2.png",
    },
    {
      name: "Verdant Bloom Gold Ring",
      description: "Nature-inspired gold ring with intricate detailing.",
      price: 64351,
      category: "rings",
      metal: "Gold",
      gender: "women",
      image: "/images/(D)Top_trending3.png",
    },
    {
      name: "Tropical Canopy Gold Drop Earrings",
      description: "Stunning drop earrings for festive occasions.",
      price: 119164,
      category: "earrings",
      metal: "Gold",
      gender: "women",
      image: "/images/(C)Collection_sec_type1.png",
    },
    {
      name: "Coral Bloom Diamond Pendant",
      description: "Diamond pendant with rose gold finish.",
      price: 85400,
      category: "diamond",
      metal: "Diamond",
      gender: "women",
      image: "/images/(C) Collection_sec_type2.png",
    },
    {
      name: "Heritage Gold Necklace",
      description: "Traditional gold necklace for weddings.",
      price: 245000,
      category: "wedding",
      metal: "Gold",
      gender: "women",
      image: "/images/(C) Collection_sec_type3.png",
    },
    {
      name: "Classic Daily Wear Bangles",
      description: "Lightweight bangles for everyday elegance.",
      price: 48200,
      category: "daily-wear",
      metal: "Gold",
      gender: "women",
      image: "/images/(B)Hero_sec_1.png",
    },
    {
      name: "Royal Gemstone Ring",
      description: "Premium gemstone ring with gold band.",
      price: 92000,
      category: "gemstone",
      metal: "Mixed",
      gender: "men",
      image: "/images/(B)Hero_sec_2.png",
    },
  ];

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
  price: string;
  category: string;
  metal: string | null;
  gender: string | null;
  image_url: string;
  stock: number;
  is_featured: boolean;
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

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  created_at: string;
}
