import { config } from "dotenv";
import { getDb } from "../src/lib/db";

config();

async function migrateImagePositioning() {
  const sql = getDb();

  console.log("Adding image positioning columns to products table...");

  try {
    // Check if columns already exist
    const columns = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'products'
    `;
    
    const columnNames = columns.map((c: any) => c.column_name);
    
    // Add image_position_x if it doesn't exist
    if (!columnNames.includes('image_position_x')) {
      await sql`
        ALTER TABLE products 
        ADD COLUMN image_position_x DECIMAL(5, 2) DEFAULT 50
      `;
      console.log("✓ Added image_position_x column");
    } else {
      console.log("✓ image_position_x column already exists");
    }

    // Add image_position_y if it doesn't exist
    if (!columnNames.includes('image_position_y')) {
      await sql`
        ALTER TABLE products 
        ADD COLUMN image_position_y DECIMAL(5, 2) DEFAULT 50
      `;
      console.log("✓ Added image_position_y column");
    } else {
      console.log("✓ image_position_y column already exists");
    }

    // Add image_scale if it doesn't exist
    if (!columnNames.includes('image_scale')) {
      await sql`
        ALTER TABLE products 
        ADD COLUMN image_scale DECIMAL(5, 2) DEFAULT 100
      `;
      console.log("✓ Added image_scale column");
    } else {
      console.log("✓ image_scale column already exists");
    }

    console.log("\n✅ Migration completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateImagePositioning();
