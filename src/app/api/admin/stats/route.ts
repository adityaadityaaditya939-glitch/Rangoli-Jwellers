import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess, requireAuth } from "@/lib/api-utils";

export async function GET() {
  const session = await getSession();
  const authError = requireAuth(session);
  if (authError) return authError;

  try {
    const sql = getDb();
    const [products, leads] = await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM products`,
      sql`SELECT COUNT(*)::int AS count FROM consultations`,
    ]);

    return jsonSuccess({
      stats: {
        products: products[0]?.count ?? 0,
        leads: leads[0]?.count ?? 0,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    return jsonError("Failed to load stats", 500);
  }
}
