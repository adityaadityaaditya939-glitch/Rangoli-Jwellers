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
      image: `/images/Gold_gdq/gp_${i}.JPG`,
    });
  }

  // Diamond products
  const diamondImages = [
    "DSC01494.JPG",
    "DSC01517.JPG",
    "DSC01551.JPG",
    "DSC01552.JPG",
    "DSC01555.JPG",
    "DSC01558.JPG",
    "DSC01561.JPG"
  ];
  for (const img of diamondImages) {
    samples.push({
      name: "Diamond Jewellery",
      description: "",
      price: 0,
      category: "diamond",
      metal: "Diamond",
      gender: "women",
      image: `/images/Daimond_products/${img}`,
    });
  }

  // Silver products
  const silverImages = [
    "DSC01538.JPG",
    "DSC01539.JPG",
    "DSC01588.JPG",
    "DSC08341.JPG",
    "DSC08447.JPG",
    "DSC08448.JPG",
    "DSC08449.JPG",
    "DSC08450.JPG",
    "DSC08452.JPG",
    "DSC08453.JPG",
    "DSC08454.JPG",
    "DSC08455.JPG"
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
