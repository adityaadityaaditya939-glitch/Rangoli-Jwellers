import { getDb, type User } from "@/lib/db";
import { verifyAdminCredentials, verifyPassword, setSessionCookie } from "@/lib/auth";
import { jsonError, jsonSuccess } from "@/lib/api-utils";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }

    const { email, password } = parsed.data;

    // First check if it's a regular user in the database
    const sql = getDb();
    const users = await sql`
      SELECT id, email, password, name, role FROM users WHERE email = ${email}
    `;

    if (users.length > 0) {
      const user = users[0] as User;
      const isValid = await verifyPassword(password, user.password);
      
      if (isValid) {
        await setSessionCookie({
          userId: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        });
        return jsonSuccess({ 
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          },
          message: "Login successful"
        });
      }
      
      return jsonError("Invalid credentials", 401);
    }

    // Fallback to admin credentials from environment for backward compatibility
    const adminEmail = process.env.ADMIN_EMAIL || "admin@rangolijwellers.com";
    if (email === adminEmail && verifyAdminCredentials(email, password)) {
      await setSessionCookie({
        userId: 0,
        email: email,
        name: "Admin",
        role: "admin"
      });
      return jsonSuccess({ 
        user: {
          id: 0,
          email: email,
          name: "Admin",
          role: "admin"
        },
        message: "Login successful"
      });
    }

    return jsonError("Invalid credentials", 401);
  } catch (error) {
    console.error("Login error:", error);
    return jsonError("Login failed", 500);
  }
}
