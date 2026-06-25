import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess, requireAuth, sanitizeString } from "@/lib/api-utils";
import { productSchema } from "@/lib/validations";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const sql = getDb();
    const rows = await sql`SELECT * FROM products WHERE id = ${Number(id)}`;

    if (rows.length === 0) {
      return jsonError("Product not found", 404);
    }

    return jsonSuccess({ product: rows[0] });
  } catch (error) {
    console.error("Product fetch error:", error);
    return jsonError("Failed to fetch product", 500);
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getSession();
  const authError = requireAuth(session);
  if (authError) return authError;

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }

    const data = parsed.data;
    const sql = getDb();

    const rows = await sql`
      UPDATE products SET
        name = ${sanitizeString(data.name, 255)},
        description = ${data.description ? sanitizeString(data.description, 2000) : null},
        price = ${data.price},
        category = ${sanitizeString(data.category, 50)},
        metal = ${data.metal ? sanitizeString(data.metal, 50) : null},
        gender = ${data.gender ? sanitizeString(data.gender, 20) : null},
        image_url = ${sanitizeString(data.imageUrl, 500)},
        stock = ${data.stock},
        is_featured = ${data.isFeatured},
        updated_at = NOW()
      WHERE id = ${Number(id)}
      RETURNING *
    `;

    if (rows.length === 0) {
      return jsonError("Product not found", 404);
    }

    return jsonSuccess({ product: rows[0] });
  } catch (error) {
    console.error("Product update error:", error);
    return jsonError("Failed to update product", 500);
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  const authError = requireAuth(session);
  if (authError) return authError;

  try {
    const { id } = await params;
    const sql = getDb();
    await sql`DELETE FROM products WHERE id = ${Number(id)}`;
    return jsonSuccess({ ok: true });
  } catch (error) {
    console.error("Product delete error:", error);
    return jsonError("Failed to delete product", 500);
  }
}
