import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess, requireAuth, sanitizeString } from "@/lib/api-utils";
import { productSchema } from "@/lib/validations";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const type = searchParams.get("type"); // 'jewellery' or 'clothing'
    const admin = searchParams.get("admin"); // 'true' for admin dashboard
    const sql = getDb();

    let rows;
    if (category && category !== "all") {
      // For traditional-wears, sort by id ASC to maintain seed order
      if (category === "traditional-wears") {
        rows = await sql`
          SELECT * FROM products
          WHERE category = ${category}
          ORDER BY id ASC
        `;
      } else {
        rows = await sql`
          SELECT * FROM products
          WHERE category = ${category}
          ORDER BY created_at DESC
        `;
      }
    } else if (featured === "true") {
      rows = await sql`
        SELECT * FROM products
        WHERE is_featured = true
        ORDER BY created_at DESC
      `;
    } else if (type === "clothing") {
      // Only clothing categories
      rows = await sql`
        SELECT * FROM products
        WHERE category IN ('lehenga', 'suits', 'saree', 'sarees', 'lehengas', 'kurtis', 'sherwanis', 'traditional-wears')
        ORDER BY created_at DESC
      `;
    } else if (admin === "true") {
      // Admin dashboard: return all products
      rows = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
      `;
    } else {
      // Default: exclude clothing categories (jewellery)
      rows = await sql`
        SELECT * FROM products
        WHERE category NOT IN ('lehenga', 'suits', 'saree', 'sarees', 'lehengas', 'kurtis', 'sherwanis', 'traditional-wears')
        ORDER BY created_at DESC
      `;
    }

    return jsonSuccess({ products: rows });
  } catch (error) {
    console.error("Products fetch error:", error);
    return jsonError("Failed to fetch products", 500);
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  const authError = requireAuth(session);
  if (authError) return authError;

  try {
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }

    const data = parsed.data;
    const sql = getDb();

    const rows = await sql`
      INSERT INTO products (name, description, price, category, metal, gender, image_url, stock, is_featured, image_position_x, image_position_y, image_scale)
      VALUES (
        ${sanitizeString(data.name, 255)},
        ${data.description ? sanitizeString(data.description, 2000) : null},
        ${data.price},
        ${sanitizeString(data.category, 50)},
        ${data.metal ? sanitizeString(data.metal, 50) : null},
        ${data.gender ? sanitizeString(data.gender, 20) : null},
        ${data.imageUrl ? sanitizeString(data.imageUrl, 500) : null},
        ${data.stock},
        ${data.isFeatured},
        ${data.imagePositionX ?? 50},
        ${data.imagePositionY ?? 50},
        ${data.imageScale ?? 100}
      )
      RETURNING *
    `;

    return jsonSuccess({ product: rows[0] }, 201);
  } catch (error) {
    console.error("Product create error:", error);
    return jsonError("Failed to create product", 500);
  }
}
