# Rangoli Jewellers Project Documentation - Part 3

## Backend API Routes and Server Setup

In Part 3, we'll explore the backend API architecture, authentication system, validation schemas, and how the application handles HTTP requests and business logic.

---

## Next.js API Routes Overview

### What are API Routes?

Next.js API Routes allow you to create API endpoints as part of your Next.js application. They are server-side functions that handle HTTP requests (GET, POST, PUT, DELETE) and return responses.

**Key Benefits:**
- **Serverless:** No need to set up a separate server
- **Integrated:** API and frontend in the same codebase
- **Type-safe:** Full TypeScript support
- **Edge-ready:** Can run on Vercel Edge Functions

**File-based Routing:**
- Files in `src/app/api/` directory become API endpoints
- `route.ts` file defines HTTP method handlers
- Dynamic routes use `[param]` syntax (e.g., `[id]`)

---

## API Utilities (src/lib/api-utils.ts)

### Helper Functions for API Responses

**Line-by-line explanation:**

```typescript
import { NextResponse } from "next/server";
```
- **Line 1:** Imports NextResponse from Next.js for creating HTTP responses.
  - `NextResponse`: Provides methods to create responses with proper headers, status codes, and JSON bodies

```typescript
import type { SessionUser } from "./auth";
```
- **Line 2:** Imports SessionUser type from auth module for type annotations.

```typescript
export function jsonError(message: string, status = 400) {
```
- **Line 4:** Exports function to create error responses.
  - `message: string`: Error message to send to client
  - `status = 400`: HTTP status code (default 400 Bad Request)

```typescript
  return NextResponse.json({ error: message }, { status });
```
- **Line 5:** Creates JSON response with error object and status code.
  - `{ error: message }`: JSON body with error property
  - `{ status }`: Sets HTTP status code

```typescript
}
```
- **Line 6:** End of jsonError function.

**Usage Example:**
```typescript
return jsonError("Invalid credentials", 401);
// Returns: { "error": "Invalid credentials" } with status 401
```

---

```typescript
export function jsonSuccess<T>(data: T, status = 200) {
```
- **Line 8:** Exports generic function for success responses.
  - `<T>`: Generic type parameter - data can be any type
  - `data: T`: The data to return in response
  - `status = 200`: HTTP status code (default 200 OK)

```typescript
  return NextResponse.json(data, { status });
```
- **Line 9:** Creates JSON response with data and status code.

```typescript
}
```
- **Line 10:** End of jsonSuccess function.

**Usage Example:**
```typescript
return jsonSuccess({ products: [...] }, 200);
// Returns: { "products": [...] } with status 200
```

**Generic Type Explanation:**
- `<T>` allows the function to work with any data type
- TypeScript infers the type from the argument passed
- Provides type safety - compiler checks data matches expected type

---

```typescript
export function requireAuth(user: SessionUser | null) {
```
- **Line 12:** Exports authentication guard function.
  - `user: SessionUser | null`: User object or null if not authenticated

```typescript
  if (!user) {
```
- **Line 13:** Checks if user is null (not authenticated).

```typescript
    return jsonError("Unauthorized", 401);
```
- **Line 14:** Returns 401 Unauthorized error if not authenticated.

```typescript
  }
```
- **Line 15:** End of if block.

```typescript
  return null;
```
- **Line 16:** Returns null if user is authenticated (no error).

```typescript
}
```
- **Line 17:** End of requireAuth function.

**Usage Pattern:**
```typescript
const session = await getSession();
const authError = requireAuth(session);
if (authError) return authError;
// Continue with authenticated logic
```

---

```typescript
export function sanitizeString(value: string, maxLength = 500) {
```
- **Line 19:** Exports string sanitization function.
  - `value: string`: Input string to sanitize
  - `maxLength = 500`: Maximum allowed length (default 500)

```typescript
  return value.trim().slice(0, maxLength);
```
- **Line 20:** 
  - `.trim()`: Removes whitespace from both ends
  - `.slice(0, maxLength)`: Truncates to maxLength characters

```typescript
}
```
- **Line 21:** End of sanitizeString function.

**Security Purpose:**
- Prevents excessively long strings
- Removes leading/trailing whitespace
- Protects against potential injection attacks

---

## Authentication System (src/lib/auth.ts)

### JWT-based Authentication

**Line-by-line explanation:**

```typescript
import { SignJWT, jwtVerify } from "jose";
```
- **Line 1:** Imports JWT functions from jose library.
  - `SignJWT`: Creates and signs JWT tokens
  - `jwtVerify`: Verifies JWT tokens and extracts payload

```typescript
import { cookies } from "next/headers";
```
- **Line 2:** Imports cookies function from Next.js for cookie management.

```typescript
const COOKIE_NAME = "rangoli_session";
```
- **Line 4:** Constant for session cookie name.

```typescript
const SESSION_MAX_AGE = 60 * 60 * 8;
```
- **Line 5:** Session duration in seconds (8 hours).
  - `60 * 60 * 8`: 60 seconds × 60 minutes × 8 hours = 28,800 seconds

---

### SessionUser Interface

```typescript
export interface SessionUser {
```
- **Line 7:** Exports interface defining session user structure.

```typescript
  userId: number;
```
- **Line 8:** User's database ID.

```typescript
  email: string;
```
- **Line 9:** User's email address.

```typescript
  name: string;
```
- **Line 10:** User's full name.

```typescript
  role: string;
```
- **Line 11:** User's role (admin, user, etc.).

```typescript
}
```
- **Line 12:** End of SessionUser interface.

**Purpose:** Defines the shape of user data stored in JWT token.

---

### Secret Key Function

```typescript
function getSecret() {
```
- **Line 14:** Private function to get JWT secret key.

```typescript
  const secret = process.env.JWT_SECRET;
```
- **Line 15:** Retrieves JWT_SECRET from environment variables.

```typescript
  if (!secret) {
```
- **Line 16:** Checks if secret is missing.

```typescript
    throw new Error("JWT_SECRET is not configured");
```
- **Line 17:** Throws error if secret not configured (security requirement).

```typescript
  }
```
- **Line 18:** End of if block.

```typescript
  return new TextEncoder().encode(secret);
```
- **Line 19:** Encodes secret string to Uint8Array (required by jose).
  - `TextEncoder()`: Browser API for encoding strings
  - `.encode(secret)`: Converts string to bytes

```typescript
}
```
- **Line 20:** End of getSecret function.

**Security Note:** JWT secret must be:
- Long and random
- Kept secret (never in source code)
- Same across all server instances

---

### Create Session Token

```typescript
export async function createSessionToken(user: SessionUser) {
```
- **Line 22:** Exports async function to create JWT token.
  - `user: SessionUser`: User data to encode in token

```typescript
  return new SignJWT({ 
```
- **Line 23:** Creates new SignJWT instance with payload.

```typescript
    userId: user.userId,
    email: user.email,
    name: user.name,
    role: user.role 
```
- **Lines 24-27:** Payload data to encode in token.

```typescript
  })
```
- **Line 28:** End of payload object.

```typescript
    .setProtectedHeader({ alg: "HS256" })
```
- **Line 29:** Sets JWT header with algorithm.
  - `alg: "HS256"`: HMAC SHA-256 algorithm for signing

```typescript
    .setIssuedAt()
```
- **Line 30:** Sets "iat" (issued at) claim to current time.

```typescript
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
```
- **Line 31:** Sets "exp" (expiration) claim.
  - `${SESSION_MAX_AGE}s`: Expiration in seconds (e.g., "28800s")

```typescript
    .sign(getSecret());
```
- **Line 32:** Signs token with secret key and returns it.

```typescript
}
```
- **Line 33:** End of createSessionToken function.

**JWT Structure:**
```
Header.Payload.Signature
```
- **Header:** Algorithm and token type
- **Payload:** User data and claims (iat, exp)
- **Signature:** Cryptographic signature for verification

---

### Set Session Cookie

```typescript
export async function setSessionCookie(user: SessionUser) {
```
- **Line 35:** Exports async function to set session cookie.

```typescript
  const token = await createSessionToken(user);
```
- **Line 36:** Creates JWT token for the user.

```typescript
  const cookieStore = await cookies();
```
- **Line 37:** Gets Next.js cookie store.

```typescript
  cookieStore.set(COOKIE_NAME, token, {
```
- **Line 38:** Sets cookie with name, value, and options.

```typescript
    httpOnly: true,
```
- **Line 39:** HTTP-only cookie (not accessible via JavaScript).
  - **Security:** Prevents XSS attacks from stealing tokens

```typescript
    secure: process.env.NODE_ENV === "production",
```
- **Line 40:** Secure flag (HTTPS only in production).
  - **Security:** Prevents token transmission over HTTP

```typescript
    sameSite: "lax",
```
- **Line 41:** SameSite policy for CSRF protection.
  - `"lax"`: Allows cookies on same-site and top-level navigations

```typescript
    maxAge: SESSION_MAX_AGE,
```
- **Line 42:** Cookie lifetime in seconds.

```typescript
    path: "/",
```
- **Line 43:** Cookie path (available on all routes).

```typescript
  });
```
- **Line 44:** End of cookie options.

```typescript
}
```
- **Line 45:** End of setSessionCookie function.

**Cookie Security Best Practices:**
- **httpOnly:** Prevents JavaScript access (XSS protection)
- **secure:** HTTPS only in production (man-in-the-middle protection)
- **sameSite:** CSRF protection
- **maxAge:** Automatic expiration

---

### Clear Session Cookie

```typescript
export async function clearSessionCookie() {
```
- **Line 47:** Exports async function to clear session cookie (logout).

```typescript
  const cookieStore = await cookies();
```
- **Line 48:** Gets cookie store.

```typescript
  cookieStore.delete(COOKIE_NAME);
```
- **Line 49:** Deletes the session cookie.

```typescript
}
```
- **Line 50:** End of clearSessionCookie function.

---

### Get Session

```typescript
export async function getSession(): Promise<SessionUser | null> {
```
- **Line 52:** Exports async function to get current session.
  - Returns SessionUser if authenticated, null otherwise

```typescript
  const cookieStore = await cookies();
```
- **Line 53:** Gets cookie store.

```typescript
  const token = cookieStore.get(COOKIE_NAME)?.value;
```
- **Line 54:** 
  - `.get(COOKIE_NAME)`: Gets cookie by name
  - `?.value`: Optional chaining - gets value if cookie exists
  - Returns undefined if cookie doesn't exist

```typescript
  if (!token) return null;
```
- **Line 55:** Returns null if no token (not authenticated).

```typescript
  try {
```
- **Line 57:** Begins try block for token verification.

```typescript
    const { payload } = await jwtVerify(token, getSecret());
```
- **Line 58:** Verifies JWT token and extracts payload.
  - `jwtVerify`: Decodes and verifies signature
  - `getSecret()`: Secret key for verification
  - Returns `{ payload }` with decoded data

```typescript
    return { 
```
- **Line 59:** Begins return object.

```typescript
      userId: payload.userId as number,
```
- **Line 60:** Extracts userId from payload with type assertion.

```typescript
      email: payload.email as string,
```
- **Line 61:** Extracts email.

```typescript
      name: payload.name as string,
```
- **Line 62:** Extracts name.

```typescript
      role: payload.role as string 
```
- **Line 63:** Extracts role.

```typescript
    };
```
- **Line 64:** End of return object.

```typescript
  } catch {
```
- **Line 65:** Catches verification errors (invalid token, expired, etc.).

```typescript
    return null;
```
- **Line 66:** Returns null if verification fails.

```typescript
  }
```
- **Line 67:** End of try-catch.

```typescript
}
```
- **Line 68:** End of getSession function.

**Error Handling:** Catches:
- Invalid token signature
- Expired tokens
- Malformed tokens
- Any other verification errors

---

### Verify Session Token

```typescript
export async function verifySessionToken(token: string): Promise<SessionUser | null> {
```
- **Line 70:** Exports function to verify a token string directly.
  - Used when token is passed directly (not from cookie)

```typescript
  try {
```
- **Line 71:** Begins try block.

```typescript
    const { payload } = await jwtVerify(token, getSecret());
```
- **Line 72:** Verifies token.

```typescript
    return { 
      userId: payload.userId as number,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string 
    };
```
- **Lines 73-78:** Returns session user object.

```typescript
  } catch {
```
- **Line 79:** Catches errors.

```typescript
    return null;
```
- **Line 80:** Returns null on failure.

```typescript
  }
```
- **Line 81:** End of try-catch.

```typescript
}
```
- **Line 82:** End of verifySessionToken function.

---

### Hash Password

```typescript
export async function hashPassword(password: string): Promise<string> {
```
- **Line 84:** Exports async function to hash password.

```typescript
  const encoder = new TextEncoder();
```
- **Line 85:** Creates text encoder.

```typescript
  const data = encoder.encode(password + "rangoli_salt");
```
- **Line 86:** Encodes password with salt.

```typescript
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
```
- **Line 87:** Creates SHA-256 hash.

```typescript
  const hashArray = Array.from(new Uint8Array(hashBuffer));
```
- **Line 88:** Converts to array.

```typescript
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
```
- **Line 89:** Converts to hex string.

```typescript
}
```
- **Line 90:** End of hashPassword function.

---

### Verify Password

```typescript
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
```
- **Line 92:** Exports async function to verify password against hash.

```typescript
  const newHash = await hashPassword(password);
```
- **Line 93:** Hashes the input password.

```typescript
  return newHash === hashedPassword;
```
- **Line 94:** Compares hashes (constant-time comparison in production).

```typescript
}
```
- **Line 95:** End of verifyPassword function.

**Security Note:** In production, use bcrypt or argon2 instead of simple SHA-256 for better security.

---

### Verify Admin Credentials

```typescript
export function verifyAdminCredentials(email: string, password: string) {
```
- **Line 97:** Exports function to verify admin credentials from environment.

```typescript
  const expectedEmail = process.env.ADMIN_EMAIL;
```
- **Line 98:** Gets expected email from environment.

```typescript
  const expectedPassword = process.env.ADMIN_PASSWORD;
```
- **Line 99:** Gets expected password from environment.

```typescript
  if (!expectedEmail || !expectedPassword) {
```
- **Line 101:** Checks if credentials are configured.

```typescript
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be configured");
```
- **Line 102:** Throws error if not configured.

```typescript
  }
```
- **Line 103:** End of if block.

```typescript
  return email === expectedEmail && password === expectedPassword;
```
- **Line 105:** Returns true if credentials match.

```typescript
}
```
- **Line 106:** End of verifyAdminCredentials function.

```typescript
export { COOKIE_NAME };
```
- **Line 108:** Exports cookie name constant for use in middleware.

---

## Validation Schemas (src/lib/validations.ts)

### Zod Validation Library

**Line-by-line explanation:**

```typescript
import { z } from "zod";
```
- **Line 1:** Imports Zod library for schema validation.
  - **Zod:** TypeScript-first schema validation library
  - Provides runtime type checking and inference

---

### Login Schema

```typescript
export const loginSchema = z.object({
```
- **Line 3:** Exports login validation schema.

```typescript
  adminId: z.string().min(1, "Admin ID is required"),
```
- **Line 4:** 
  - `z.string()`: Must be a string
  - `.min(1, "Admin ID is required")`: Minimum 1 character with error message

```typescript
  password: z.string().min(1, "Password is required"),
```
- **Line 5:** Password must be at least 1 character.

```typescript
});
```
- **Line 6:** End of schema.

---

### Consultation Schema

```typescript
export const consultationSchema = z.object({
```
- **Line 8:** Exports consultation form validation schema.

```typescript
  name: z.string().min(2, "Name is required"),
```
- **Line 9:** Name must be at least 2 characters.

```typescript
  mobile: z.string().min(10, "Valid mobile number is required"),
```
- **Line 10:** Mobile must be at least 10 characters.

```typescript
  budget: z.string().optional(),
```
- **Line 11:** Budget is optional string.

```typescript
  metalPreference: z.string().optional(),
```
- **Line 12:** Metal preference is optional.

```typescript
  notes: z.string().optional(),
```
- **Line 13:** Notes are optional.

```typescript
  source: z.string().optional(),
```
- **Line 14:** Source is optional.

```typescript
});
```
- **Line 15:** End of schema.

---

### Product Schema

```typescript
export const productSchema = z.object({
```
- **Line 17:** Exports product validation schema.

```typescript
  name: z.string().min(1, "Product name is required"),
```
- **Line 18:** Name is required.

```typescript
  description: z.string().optional(),
```
- **Line 19:** Description is optional.

```typescript
  price: z.number().min(0, "Price must be 0 or greater"),
```
- **Line 20:** Price must be a number >= 0.

```typescript
  category: z.string().min(1, "Category is required"),
```
- **Line 21:** Category is required.

```typescript
  metal: z.string().optional(),
```
- **Line 22:** Metal is optional.

```typescript
  gender: z.string().optional(),
```
- **Line 23:** Gender is optional.

```typescript
  imageUrl: z.string().optional(),
```
- **Line 24:** Image URL is optional.

```typescript
  stock: z.number().int().min(0).default(1),
```
- **Line 25:** 
  - `.int()`: Must be integer
  - `.min(0)`: Must be >= 0
  - `.default(1)`: Defaults to 1 if not provided

```typescript
  isFeatured: z.boolean().default(false),
```
- **Line 26:** Featured flag, defaults to false.

```typescript
  soldOut: z.boolean().default(false),
```
- **Line 27:** Sold out flag, defaults to false.

```typescript
  isNew: z.boolean().default(false),
```
- **Line 28:** New flag, defaults to false.

```typescript
  imagePositionX: z.number().min(0).max(100).optional(),
```
- **Line 29:** X position between 0-100, optional.

```typescript
  imagePositionY: z.number().min(0).max(100).optional(),
```
- **Line 30:** Y position between 0-100, optional.

```typescript
  imageScale: z.number().min(10).max(300).optional(),
```
- **Line 31:** Scale between 10-300, optional.

```typescript
  images: z.array(z.object({
```
- **Line 32:** Array of additional images.

```typescript
    imageUrl: z.string().optional(),
```
- **Line 33:** Image URL is optional.

```typescript
    colorName: z.string().optional(),
```
- **Line 34:** Color name is optional.

```typescript
    isPrimary: z.boolean().default(false),
```
- **Line 35:** Primary flag, defaults to false.

```typescript
  })).optional(),
```
- **Line 36:** End of array object, optional.

```typescript
});
```
- **Line 37:** End of product schema.

---

### Type Inference

```typescript
export type LoginInput = z.infer<typeof loginSchema>;
```
- **Line 39:** Infers TypeScript type from schema.
  - `z.infer`: Automatically creates type matching schema
  - `typeof loginSchema`: Gets the schema type

```typescript
export type ConsultationInput = z.infer<typeof consultationSchema>;
```
- **Line 40:** Infers consultation input type.

```typescript
export type ProductInput = z.infer<typeof productSchema>;
```
- **Line 41:** Infers product input type.

**Type Inference Benefit:** Ensures TypeScript types always match validation schemas automatically.

---

## Authentication API Routes

### Login Route (src/app/api/auth/login/route.ts)

**Line-by-line explanation:**

```typescript
import { getDb, type User } from "@/lib/db";
```
- **Line 1:** Imports database functions and User type.

```typescript
import { verifyAdminCredentials, verifyPassword, setSessionCookie } from "@/lib/auth";
```
- **Line 2:** Imports authentication functions.

```typescript
import { jsonError, jsonSuccess } from "@/lib/api-utils";
```
- **Line 3:** Imports API response helpers.

```typescript
import { z } from "zod";
```
- **Line 4:** Imports Zod for validation.

```typescript
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
```
- **Lines 6-9:** Defines login validation schema.

```typescript
export async function POST(request: Request) {
```
- **Line 11:** Exports POST handler for login endpoint.

```typescript
  try {
```
- **Line 12:** Begins try block.

```typescript
    const body = await request.json();
```
- **Line 13:** Parses request body as JSON.

```typescript
    const parsed = loginSchema.safeParse(body);
```
- **Line 14:** Validates body against schema.
  - `safeParse`: Returns `{ success: true, data }` or `{ success: false, error }`
  - Doesn't throw errors, returns result object

```typescript
    if (!parsed.success) {
```
- **Line 16:** Checks if validation failed.

```typescript
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
```
- **Line 17:** Returns validation error message.

```typescript
    }
```
- **Line 18:** End of if block.

```typescript
    const { email, password } = parsed.data;
```
- **Line 20:** Extracts validated email and password.

```typescript
    // First check if it's a regular user in the database
    const sql = getDb();
```
- **Lines 22-23:** Gets database connection.

```typescript
    const users = await sql`
      SELECT id, email, password, name, role FROM users WHERE email = ${email}
    `;
```
- **Lines 24-26:** Queries database for user with matching email.

```typescript
    if (users.length > 0) {
```
- **Line 28:** Checks if user found in database.

```typescript
      const user = users[0] as User;
```
- **Line 29:** Casts first result to User type.

```typescript
      const isValid = await verifyPassword(password, user.password);
```
- **Line 30:** Verifies password against stored hash.

```typescript
      if (isValid) {
```
- **Line 32:** Checks if password is valid.

```typescript
        await setSessionCookie({
```
- **Line 33:** Sets session cookie.

```typescript
          userId: user.id,
          email: user.email,
          name: user.name,
          role: user.role
```
- **Lines 34-37:** User data for session.

```typescript
        });
```
- **Line 38:** End of setSessionCookie call.

```typescript
        return jsonSuccess({ 
```
- **Line 39:** Returns success response.

```typescript
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          },
```
- **Lines 40-44:** User object in response.

```typescript
          message: "Login successful"
```
- **Line 45:** Success message.

```typescript
        });
```
- **Line 46:** End of jsonSuccess call.

```typescript
      }
```
- **Line 47:** End of if valid block.

```typescript
      return jsonError("Invalid credentials", 401);
```
- **Line 50:** Returns error if password invalid.

```typescript
    }
```
- **Line 51:** End of if user found block.

```typescript
    // Fallback to admin credentials from environment for backward compatibility
    const adminEmail = process.env.ADMIN_EMAIL || "admin@rangolijwellers.com";
```
- **Line 54:** Gets admin email from environment or uses default.

```typescript
    if (email === adminEmail && verifyAdminCredentials(email, password)) {
```
- **Line 55:** Checks against environment admin credentials.

```typescript
      await setSessionCookie({
        userId: 0,
        email: email,
        name: "Admin",
        role: "admin"
      });
```
- **Lines 56-61:** Sets session for environment admin.

```typescript
      return jsonSuccess({ 
        user: {
          id: 0,
          email: email,
          name: "Admin",
          role: "admin"
        },
        message: "Login successful"
      });
```
- **Lines 62-69:** Returns success response.

```typescript
    }
```
- **Line 70:** End of if admin block.

```typescript
    return jsonError("Invalid credentials", 401);
```
- **Line 73:** Returns error if no match found.

```typescript
  } catch (error) {
```
- **Line 74:** Catches unexpected errors.

```typescript
    console.error("Login error:", error);
```
- **Line 75:** Logs error.

```typescript
    return jsonError("Login failed", 500);
```
- **Line 76:** Returns server error.

```typescript
  }
}
```
- **Lines 77-78:** End of try-catch and function.

**Login Flow:**
1. Validate input with Zod
2. Check database for user
3. If found, verify password hash
4. If valid, create session cookie
5. Fallback to environment admin for backward compatibility

---

### Logout Route (src/app/api/auth/logout/route.ts)

```typescript
import { clearSessionCookie } from "@/lib/auth";
import { jsonSuccess } from "@/lib/api-utils";

export async function POST() {
  await clearSessionCookie();
  return jsonSuccess({ ok: true });
}
```

**Explanation:**
- **Line 1:** Imports clearSessionCookie function
- **Line 2:** Imports jsonSuccess helper
- **Line 4:** POST handler for logout
- **Line 5:** Clears the session cookie
- **Line 6:** Returns success response

**Usage:** Client sends POST to `/api/auth/logout` to end session.

---

### Get Current User Route (src/app/api/auth/me/route.ts)

```typescript
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
```

**Explanation:**
- **Line 1:** Imports getSession function
- **Line 4:** GET handler for current user
- **Line 6:** Gets current session from cookie
- **Line 7-9:** Returns 401 if not authenticated
- **Lines 11-17:** Returns user data if authenticated

**Usage:** Client calls `/api/auth/me` to check authentication status and get user info.

---

## Products API Routes

### Products List Route (src/app/api/products/route.ts)

**GET Handler - Fetch Products**

```typescript
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
```
- **Lines 6-8:** 
  - Creates URL object from request URL
  - Extracts searchParams (query parameters)

```typescript
    const category = searchParams.get("category");
```
- **Line 9:** Gets category query parameter.

```typescript
    const featured = searchParams.get("featured");
```
- **Line 10:** Gets featured query parameter.

```typescript
    const type = searchParams.get("type"); // 'jewellery' or 'clothing'
```
- **Line 11:** Gets type query parameter.

```typescript
    const admin = searchParams.get("admin"); // 'true' for admin dashboard
```
- **Line 12:** Gets admin query parameter.

```typescript
    const sql = getDb();
```
- **Line 13:** Gets database connection.

```typescript
    let rows: Product[];
```
- **Line 15:** Declares rows variable with Product[] type.

```typescript
    if (category && category !== "all") {
```
- **Line 16:** Checks if category filter is applied.

```typescript
      // For traditional-wears, sort by id ASC to maintain seed order
      if (category === "traditional-wears") {
        rows = await sql`
          SELECT * FROM products
          WHERE category = ${category}
          ORDER BY id ASC
        ` as Product[];
```
- **Lines 18-23:** Special sorting for traditional-wears to maintain seed order.

```typescript
      } else {
        rows = await sql`
          SELECT * FROM products
          WHERE category = ${category}
          ORDER BY created_at DESC
        ` as Product[];
```
- **Lines 24-29:** Default sorting by creation date (newest first).

```typescript
      }
```
- **Line 30:** End of category if block.

```typescript
    } else if (featured === "true") {
```
- **Line 31:** Checks if featured filter is applied.

```typescript
      rows = await sql`
        SELECT * FROM products
        WHERE is_featured = true
        ORDER BY created_at DESC
      ` as Product[];
```
- **Lines 32-36:** Fetches only featured products.

```typescript
    } else if (type === "clothing") {
```
- **Line 37:** Checks if type is clothing.

```typescript
      // Only clothing categories
      rows = await sql`
        SELECT * FROM products
        WHERE category IN ('lehenga', 'suits', 'saree', 'sarees', 'lehengas', 'kurtis', 'sherwanis', 'traditional-wears', 'sadri', 'dhatu', 'rejta')
        ORDER BY created_at DESC
      ` as Product[];
```
- **Lines 38-43:** Fetches only clothing categories.

```typescript
    } else if (admin === "true") {
```
- **Line 44:** Checks if admin request.

```typescript
      // Admin dashboard: return all products
      rows = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
      ` as Product[];
```
- **Lines 45-49:** Fetches all products for admin.

```typescript
    } else {
```
- **Line 50:** Default case (no filters).

```typescript
      // Default: exclude clothing categories (jewellery)
      rows = await sql`
        SELECT * FROM products
        WHERE category NOT IN ('lehenga', 'suits', 'saree', 'sarees', 'lehengas', 'kurtis', 'sherwanis', 'traditional-wears', 'sadri', 'dhatu', 'rejta', 'traditional-first')
        ORDER BY created_at DESC
      ` as Product[];
```
- **Lines 51-56:** Fetches only jewellery (excludes clothing).

```typescript
    }
```
- **Line 57:** End of if-else chain.

```typescript
    // Fetch product images for each product
    const productIds = rows.map((p) => p.id);
```
- **Line 60:** Extracts all product IDs.

```typescript
    let images: ProductImage[] = [];
```
- **Line 61:** Declares images array.

```typescript
    if (productIds.length > 0) {
```
- **Line 62:** Checks if there are products.

```typescript
      images = await sql`
        SELECT * FROM product_images
        WHERE product_id = ANY(${productIds})
        ORDER BY is_primary DESC, id ASC
      ` as ProductImage[];
```
- **Lines 63-67:** 
  - `ANY(${productIds})`: PostgreSQL syntax for "IN" array
  - Sorts by primary flag first, then by ID

```typescript
    }
```
- **Line 68:** End of if block.

```typescript
    // Group images by product_id
    const imagesByProduct: Record<number, ProductImage[]> = {};
```
- **Line 71:** Creates object to group images by product ID.
  - `Record<number, ProductImage[]>`: Object with number keys and ProductImage[] values

```typescript
    for (const img of images) {
```
- **Line 72:** Iterates through all images.

```typescript
      if (!imagesByProduct[img.product_id]) {
        imagesByProduct[img.product_id] = [];
      }
```
- **Lines 73-75:** Initializes array for product if not exists.

```typescript
      imagesByProduct[img.product_id].push(img);
```
- **Line 76:** Adds image to product's array.

```typescript
    }
```
- **Line 77:** End of for loop.

```typescript
    // Attach images to products
    const productsWithImages = rows.map((p) => ({
```
- **Line 80:** Maps products to include images.

```typescript
      ...p,
```
- **Line 81:** Spreads product properties.

```typescript
      images: imagesByProduct[p.id] || []
```
- **Line 82:** Adds images array (empty if none).

```typescript
    }));
```
- **Line 83:** End of map.

```typescript
    return jsonSuccess({ products: productsWithImages });
```
- **Line 85:** Returns products with images.

```typescript
  } catch (error) {
    console.error("Products fetch error:", error);
    return jsonError("Failed to fetch products", 500);
  }
}
```
- **Lines 86-89:** Error handling.

**Query Parameters:**
- `?category=gold` - Filter by category
- `?featured=true` - Get featured products
- `?type=clothing` - Get clothing only
- `?admin=true` - Get all products (admin)

---

**POST Handler - Create Product**

```typescript
export async function POST(request: Request) {
  const session = await getSession();
  const authError = requireAuth(session);
  if (authError) return authError;
```
- **Lines 92-95:** 
  - Gets session
  - Checks authentication
  - Returns error if not authenticated

```typescript
  try {
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }
```
- **Lines 97-103:** Validates input with Zod schema.

```typescript
    const data = parsed.data;
    const sql = getDb();
```
- **Lines 105-106:** Extracts validated data and gets DB connection.

```typescript
    const rows = await sql`
      INSERT INTO products (name, description, price, category, metal, gender, image_url, stock, is_featured, sold_out, is_new, image_position_x, image_position_y, image_scale)
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
        ${data.soldOut},
        ${data.isNew},
        ${data.imagePositionX ?? 50},
        ${data.imagePositionY ?? 50},
        ${data.imageScale ?? 100}
      )
      RETURNING *
    `;
```
- **Lines 108-127:** 
  - Inserts product with sanitized values
  - `??` operator provides defaults if undefined
  - `RETURNING *` returns inserted row

```typescript
    const product = rows[0];
```
- **Line 129:** Gets inserted product.

```typescript
    // Handle multiple images with color options
    if (body.images && Array.isArray(body.images) && body.images.length > 0) {
```
- **Line 132:** Checks if additional images provided.

```typescript
      for (const img of body.images) {
```
- **Line 133:** Iterates through images.

```typescript
        // Only insert if imageUrl is provided and not empty
        if (img.imageUrl && img.imageUrl.trim()) {
```
- **Lines 134-135:** Validates image URL.

```typescript
          await sql`
            INSERT INTO product_images (product_id, image_url, color_name, is_primary)
            VALUES (
              ${product.id},
              ${sanitizeString(img.imageUrl, 500)},
              ${img.colorName ? sanitizeString(img.colorName, 50) : null},
              ${img.isPrimary || false}
            )
          `;
```
- **Lines 136-144:** Inserts additional image.

```typescript
        }
```
- **Line 145:** End of if block.

```typescript
      }
```
- **Line 146:** End of for loop.

```typescript
    }
```
- **Line 147:** End of images if block.

```typescript
    return jsonSuccess({ product }, 201);
```
- **Line 149:** Returns created product with 201 status.

```typescript
  } catch (error) {
    console.error("Product create error:", error);
    return jsonError("Failed to create product", 500);
  }
}
```
- **Lines 150-153:** Error handling.

---

### Single Product Route (src/app/api/products/[id]/route.ts)

**GET Handler - Fetch Single Product**

```typescript
type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
```
- **Lines 6-10:** 
  - Next.js 15 requires params to be a Promise
  - Awaits params to get id
  - `_request`: Underscore prefix indicates unused parameter

```typescript
    const sql = getDb();
    const rows = await sql`SELECT * FROM products WHERE id = ${Number(id)}`;
```
- **Lines 11-12:** Queries product by ID (converts string to number).

```typescript
    if (rows.length === 0) {
      return jsonError("Product not found", 404);
    }
```
- **Lines 14-16:** Returns 404 if product not found.

```typescript
    return jsonSuccess({ product: rows[0] });
```
- **Line 18:** Returns product.

```typescript
  } catch (error) {
    console.error("Product fetch error:", error);
    return jsonError("Failed to fetch product", 500);
  }
}
```
- **Lines 19-22:** Error handling.

---

**PUT Handler - Update Product**

```typescript
export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getSession();
  const authError = requireAuth(session);
  if (authError) return authError;
```
- **Lines 25-28:** Authentication check.

```typescript
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      console.error("Validation error:", parsed.error.issues);
      const errorDetails = parsed.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join(', ');
      return jsonError(`Validation failed: ${errorDetails}`);
    }
```
- **Lines 30-39:** Validation with detailed error messages.

```typescript
    const data = parsed.data;
    const sql = getDb();
```
- **Lines 41-42:** Get data and DB connection.

```typescript
    const rows = await sql`
      UPDATE products SET
        name = ${sanitizeString(data.name, 255)},
        description = ${data.description ? sanitizeString(data.description, 2000) : null},
        price = ${data.price},
        category = ${sanitizeString(data.category, 50)},
        metal = ${data.metal ? sanitizeString(data.metal, 50) : null},
        gender = ${data.gender ? sanitizeString(data.gender, 20) : null},
        image_url = ${data.imageUrl ? sanitizeString(data.imageUrl, 500) : null},
        stock = ${data.stock},
        is_featured = ${data.isFeatured},
        sold_out = ${data.soldOut},
        is_new = ${data.isNew},
        image_position_x = ${data.imagePositionX ?? 50},
        image_position_y = ${data.imagePositionY ?? 50},
        image_scale = ${data.imageScale ?? 100},
        updated_at = NOW()
      WHERE id = ${Number(id)}
      RETURNING *
    `;
```
- **Lines 44-62:** Updates product with sanitized values and timestamp.

```typescript
    if (rows.length === 0) {
      return jsonError("Product not found", 404);
    }
```
- **Lines 65-67:** Returns 404 if not found.

```typescript
    return jsonSuccess({ product: rows[0] });
```
- **Line 69:** Returns updated product.

```typescript
  } catch (error) {
    console.error("Product update error:", error);
    return jsonError("Failed to update product", 500);
  }
}
```
- **Lines 70-73:** Error handling.

---

**DELETE Handler - Delete Product**

```typescript
export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  const authError = requireAuth(session);
  if (authError) return authError;
```
- **Lines 76-79:** Authentication check.

```typescript
  try {
    const { id } = await params;
    const sql = getDb();
    await sql`DELETE FROM products WHERE id = ${Number(id)}`;
```
- **Lines 81-84:** Deletes product by ID.

```typescript
    return jsonSuccess({ ok: true });
```
- **Line 85:** Returns success.

```typescript
  } catch (error) {
    console.error("Product delete error:", error);
    return jsonError("Failed to delete product", 500);
  }
}
```
- **Lines 86-89:** Error handling.

---

## Consultations API Route (src/app/api/consultations/route.ts)

**POST Handler - Create Consultation**

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = consultationSchema.safeParse(body);

    if (!parsed.success) {
      return jsonError(parsed.error.issues[0]?.message || "Invalid input");
    }
```
- **Lines 6-13:** Validates input.

```typescript
    const { name, mobile, budget, metalPreference, notes, source } = parsed.data;
    const sql = getDb();
```
- **Lines 15-16:** Extracts data and gets DB connection.

```typescript
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
```
- **Lines 18-29:** Inserts consultation with sanitized values.

```typescript
    return jsonSuccess({ consultation: rows[0] }, 201);
```
- **Line 31:** Returns created consultation with 201 status.

```typescript
  } catch (error) {
    console.error("Consultation error:", error);
    return jsonError("Failed to submit consultation", 500);
  }
}
```
- **Lines 32-35:** Error handling.

---

**GET Handler - Fetch Consultations (Admin Only)**

```typescript
export async function GET() {
  const session = await getSession();
  const authError = requireAuth(session);
  if (authError) return authError;
```
- **Lines 38-41:** Authentication check.

```typescript
  try {
    const sql = getDb();
    const rows = await sql`
      SELECT id, name, mobile, budget, metal_preference, notes, source, created_at
      FROM consultations
      ORDER BY created_at DESC
    `;
```
- **Lines 43-49:** Fetches all consultations ordered by date.

```typescript
    return jsonSuccess({ consultations: rows });
```
- **Line 50:** Returns consultations.

```typescript
  } catch (error) {
    console.error("Consultations fetch error:", error);
    return jsonError("Failed to fetch consultations", 500);
  }
}
```
- **Lines 51-54:** Error handling.

---

## API Routes Summary

### Authentication Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/auth/login` | POST | Login user | No |
| `/api/auth/logout` | POST | Logout user | No |
| `/api/auth/me` | GET | Get current user | No (returns 401 if not auth) |

### Product Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/products` | GET | List products | No |
| `/api/products` | POST | Create product | Yes |
| `/api/products/[id]` | GET | Get single product | No |
| `/api/products/[id]` | PUT | Update product | Yes |
| `/api/products/[id]` | DELETE | Delete product | Yes |

### Consultation Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/consultations` | POST | Create consultation | No |
| `/api/consultations` | GET | List consultations | Yes |

### Database Endpoints

| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `/api/setup` | GET | Initialize database | No |
| `/api/setup` | POST | Initialize/reset database | No |

---

## Key Backend Concepts

### 1. RESTful API Design
- **GET:** Retrieve data
- **POST:** Create data
- **PUT:** Update data
- **DELETE:** Remove data

### 2. Authentication Flow
1. User submits credentials
2. Server validates against database
3. Server creates JWT token
4. Server sets HTTP-only cookie
5. Client includes cookie in subsequent requests
6. Server verifies token on protected routes

### 3. Input Validation
- **Zod schemas:** Define expected input structure
- **Runtime validation:** Catch invalid data before processing
- **Sanitization:** Clean strings to prevent injection

### 4. Error Handling
- **Try-catch blocks:** Catch unexpected errors
- **Consistent responses:** Use jsonError/jsonSuccess helpers
- **Logging:** Console errors for debugging
- **Status codes:** Appropriate HTTP status codes

### 5. Security Best Practices
- **Parameterized queries:** Prevent SQL injection
- **HTTP-only cookies:** Prevent XSS token theft
- **Input sanitization:** Clean user input
- **Authentication guards:** Protect sensitive endpoints

### 6. Dynamic Routes
- **`[id]` syntax:** Creates dynamic route segments
- **Params as Promise:** Next.js 15 requires awaiting params
- **Type conversion:** Convert string params to numbers

---

## Summary of Part 3

In Part 3, we covered:
1. **Next.js API Routes** - Serverless API architecture
2. **API Utilities** - Helper functions for consistent responses
3. **JWT Authentication** - Token-based auth with cookies
4. **Session Management** - Cookie-based session handling
5. **Password Hashing** - Security for user credentials
6. **Zod Validation** - Runtime type validation
7. **Authentication Routes** - Login, logout, and user info
8. **Product CRUD** - Create, read, update, delete operations
9. **Consultation API** - Lead submission and retrieval
10. **Security Practices** - Input sanitization, SQL injection prevention

**Next in Part 4:** Frontend components and pages - how the React UI interacts with these APIs.

---

*This documentation provides comprehensive understanding of the backend API layer for technical interviews. Each endpoint is explained with security considerations and best practices.*
