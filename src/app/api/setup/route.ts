import { initDatabase } from "@/lib/db";
import { jsonError, jsonSuccess } from "@/lib/api-utils";

export async function GET() {
  try {
    await initDatabase();
    return jsonSuccess({ ok: true, message: "Database initialized" });
  } catch (error) {
    console.error("Setup error:", error);
    return jsonError("Database setup failed", 500);
  }
}

export async function POST() {
  return GET();
}
