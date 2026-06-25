import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess, requireAuth, sanitizeString } from "@/lib/api-utils";
import { consultationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = consultationSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }

    const { name, mobile, budget, metalPreference, notes, source } = parsed.data;
    const sql = getDb();

    const rows = await sql`
      INSERT INTO consultations (name, mobile, budget, metal_preference, notes, source)
      VALUES (
        ${sanitizeString(name, 255)},
        ${sanitizeString(mobile, 20)},
        ${budget ? sanitizeString(budget, 100) : null},
        ${metalPreference ? sanitizeString(metalPreference, 50) : null},
        ${notes ? sanitizeString(notes, 2000) : null},
        ${source ? sanitizeString(source, 50) : "website"}
      )
      RETURNING id, name, mobile, budget, metal_preference, notes, source, created_at
    `;

    return jsonSuccess({ consultation: rows[0] }, 201);
  } catch (error) {
    console.error("Consultation error:", error);
    return jsonError("Failed to submit consultation", 500);
  }
}

export async function GET() {
  const session = await getSession();
  const authError = requireAuth(session);
  if (authError) return authError;

  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, name, mobile, budget, metal_preference, notes, source, created_at
      FROM consultations
      ORDER BY created_at DESC
    `;
    return jsonSuccess({ consultations: rows });
  } catch (error) {
    console.error("Consultations fetch error:", error);
    return jsonError("Failed to fetch consultations", 500);
  }
}
