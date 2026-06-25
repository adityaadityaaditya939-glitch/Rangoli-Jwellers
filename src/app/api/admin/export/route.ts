import { getDb } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { jsonError, requireAuth } from "@/lib/api-utils";
import { toCsv, toExcelBuffer } from "@/lib/export";

export async function GET(request: Request) {
  const session = await getSession();
  const authError = requireAuth(session);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "csv";

  try {
    const sql = getDb();
    const rows = (await sql`
      SELECT id, name, mobile, budget, metal_preference, notes, source, created_at
      FROM consultations
      ORDER BY created_at DESC
    `) as Record<string, unknown>[];

    if (format === "xlsx") {
      const buffer = toExcelBuffer(rows, "consultations");
      return new Response(new Uint8Array(buffer), {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": 'attachment; filename="consultations.xlsx"',
        },
      });
    }

    const csv = toCsv(rows);
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="consultations.csv"',
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return jsonError("Export failed", 500);
  }
}
