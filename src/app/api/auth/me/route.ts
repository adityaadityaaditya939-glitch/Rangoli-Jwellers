import { getSession } from "@/lib/auth";
import { jsonError, jsonSuccess } from "@/lib/api-utils";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return jsonError("Not authenticated", 401);
    }

    return jsonSuccess({ 
      user: {
        id: session.userId,
        email: session.email,
        name: session.name,
        role: session.role
      }
    });
  } catch (error) {
    console.error("Get user error:", error);
    return jsonError("Failed to get user", 500);
  }
}