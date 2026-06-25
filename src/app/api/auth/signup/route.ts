import { getDb, type User } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { jsonError, jsonSuccess } from "@/lib/api-utils";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    const sql = getDb();
    
    // Check if user already exists
    const existing = await sql`
      SELECT id FROM users WHERE email = ${validatedData.email}
    `;
    
    if (existing.length > 0) {
      return jsonError("Email already registered", 400);
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(validatedData.password);
    
    const result = await sql`
      INSERT INTO users (email, password, name, role)
      VALUES (${validatedData.email}, ${hashedPassword}, ${validatedData.name}, 'user')
      RETURNING id, email, name, role
    `;

    const user = result[0] as User;
    
    return jsonSuccess({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      message: "Account created successfully"
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return jsonError(error.errors[0].message, 400);
    }
    console.error("Signup error:", error);
    return jsonError("Signup failed", 500);
  }
}