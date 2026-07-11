import { config } from "dotenv";
import { getDb } from "../src/lib/db";

config();

async function seedClothingProducts() {
  const sql = getDb();

  console.log("Checking for existing clothing products...");

  try {
    // Check if clothing products already exist
    const existingProducts = await sql`
      SELECT * FROM products 
      WHERE category IN ('lehenga', 'suits', 'saree', 'traditional-wears')
    `;

    if (existingProducts.length > 0) {
      console.log(`Found ${existingProducts.length} existing clothing products.`);
      console.log("Clothing products:");
      existingProducts.forEach((p: any) => {
        console.log(`  - ${p.name} (${p.category})`);
      });
      return;
    }

    console.log("No clothing products found. Adding clothing products...");

    const clothingProducts = [
      { name: "Pink Lehenga", category: "lehenga", image: "/images/Clothes/Pink_Rejta.jpg", gender: "women" },
      { name: "Sadri Saree", category: "saree", image: "/images/Clothes/Sadri.jpg", gender: "women" },
      { name: "Elegant Suit", category: "suits", image: "/images/Clothes/Suit.jpg", gender: "women" },
      { name: "Traditional Lehenga", category: "lehenga", image: "/images/Clothing_collection_Lehanga.jpg", gender: "women" },
      { name: "Traditional Saree", category: "saree", image: "/images/Clothing_collecting_Saare.jpg", gender: "women" },
      { name: "Traditional Suit", category: "suits", image: "/images/Clothing_collection_Suit.jpg", gender: "women" },
    ];

    for (const item of clothingProducts) {
      await sql`
        INSERT INTO products (name, description, price, category, metal, gender, image_url, stock, is_featured, image_position_x, image_position_y, image_scale)
        VALUES (
          ${item.name},
          ${""},
          ${0},
          ${item.category},
          ${null},
          ${item.gender},
          ${item.image},
          ${1},
          ${true},
          ${50},
          ${50},
          ${100}
        )
      `;
      console.log(`✓ Added ${item.name}`);
    }

    console.log("\n✅ Clothing products seeded successfully!");
  } catch (error) {
    console.error("❌ Failed to seed clothing products:", error);
    process.exit(1);
  }
}

seedClothingProducts();
