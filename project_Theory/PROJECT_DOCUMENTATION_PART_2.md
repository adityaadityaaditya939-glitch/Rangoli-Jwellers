# Rangoli Jewellers Project Documentation - Part 2

## Database Setup and Models

In Part 2, we'll dive deep into the database architecture, schema design, initialization scripts, and TypeScript data models used in the Rangoli Jewellers project.

---

## Database Overview

### Database Technology: Neon PostgreSQL

**Neon PostgreSQL** is a serverless PostgreSQL database that provides:
- **Serverless Architecture:** Automatically scales based on demand
- **Branching:** Create isolated database copies for development/testing
- **HTTP API:** Can be accessed via HTTP (no persistent connection needed)
- **Free Tier:** Generous free tier for small projects
- **PostgreSQL Compatible:** Uses standard PostgreSQL protocol and SQL

### Why PostgreSQL?

PostgreSQL is chosen because it:
- Supports complex queries and relationships
- Has excellent data integrity features
- Supports JSON data types for flexibility
- Is widely used and well-documented
- Provides ACID compliance for reliable transactions

---

## Database Connection (src/lib/db.ts)

### Database Connection Function

**Line-by-line explanation:**

```typescript
import { neon } from "@neondatabase/serverless";
```
- **Line 1:** Imports the `neon` function from the @neondatabase/serverless package. This is the Neon PostgreSQL driver that allows connecting to Neon databases via HTTP.

```typescript
export function getDb() {
```
- **Line 3:** Exports a function named `getDb` that returns a database connection instance. This function is used throughout the application to get a database connection.

```typescript
  const url = process.env.DATABASE_URL;
```
- **Line 4:** Retrieves the DATABASE_URL from environment variables. `process.env` is a Node.js object containing environment variables.

```typescript
  if (!url) {
    throw new Error("DATABASE_URL is not configured");
  }
```
- **Lines 5-7:** Checks if the DATABASE_URL is missing. If not configured, throws an error to prevent the application from running without a database connection.

```typescript
  return neon(url);
```
- **Line 8:** Creates and returns a Neon database connection using the connection URL. The `neon` function returns a connection object that can execute SQL queries.

```typescript
}
```
- **Line 9:** End of getDb function.

**Key Concept:** This pattern of getting a database connection from environment variables is a best practice for:
- **Security:** Keeps credentials out of source code
- **Flexibility:** Allows different databases for development/staging/production
- **Portability:** Makes the application easy to deploy anywhere

---

## Database Schema Design

### Database Initialization Function

```typescript
export async function initDatabase() {
```
- **Line 11:** Exports an async function that initializes the database by creating all required tables and seeding initial data.

```typescript
  const sql = getDb();
```
- **Line 12:** Gets a database connection using the getDb function defined earlier.

```typescript
  await sql`
```
- **Line 14:** Begins a SQL query using Neon's tagged template literal syntax. The `sql` tag allows writing SQL queries with automatic parameter escaping to prevent SQL injection.

---

### Table 1: Users Table

```typescript
    CREATE TABLE IF NOT EXISTS users (
```
- **Line 15:** Creates a table named `users` if it doesn't already exist. `IF NOT EXISTS` prevents errors if the table is already created.

```typescript
      id SERIAL PRIMARY KEY,
```
- **Line 16:** 
  - `id`: Column name for the primary key
  - `SERIAL`: Auto-incrementing integer (PostgreSQL automatically assigns 1, 2, 3, ...)
  - `PRIMARY KEY`: Uniquely identifies each row; enforces uniqueness and creates an index

```typescript
      email VARCHAR(255) UNIQUE NOT NULL,
```
- **Line 17:**
  - `email`: Column name for user email
  - `VARCHAR(255)`: Variable-length string up to 255 characters
  - `UNIQUE`: Ensures no two users have the same email
  - `NOT NULL`: Email is required (cannot be empty)

```typescript
      password VARCHAR(255) NOT NULL,
```
- **Line 18:**
  - `password`: Column for hashed password
  - `VARCHAR(255)`: String up to 255 characters for hashed password
  - `NOT NULL`: Password is required

```typescript
      name VARCHAR(255) NOT NULL,
```
- **Line 19:**
  - `name`: Column for user's full name
  - `VARCHAR(255)`: String up to 255 characters
  - `NOT NULL`: Name is required

```typescript
      role VARCHAR(20) DEFAULT 'user',
```
- **Line 20:**
  - `role`: Column for user role (admin, user, etc.)
  - `VARCHAR(20)`: String up to 20 characters
  - `DEFAULT 'user'`: If no role is specified, defaults to 'user'

```typescript
      created_at TIMESTAMPTZ DEFAULT NOW()
```
- **Line 21:**
  - `created_at`: Timestamp when the user was created
  - `TIMESTAMPTZ`: Timestamp with time zone (stores timezone info)
  - `DEFAULT NOW()`: Automatically sets to current time when row is created

```typescript
    )
```
- **Line 22:** End of users table definition.

**Purpose of Users Table:** Stores authentication and authorization information for:
- Admin users who can access the admin dashboard
- Future customer accounts (if customer login is added)

---

### Table 2: Products Table

```typescript
  await sql`
    CREATE TABLE IF NOT EXISTS products (
```
- **Lines 25-26:** Creates the products table for storing jewellery and clothing inventory.

```typescript
      id SERIAL PRIMARY KEY,
```
- **Line 27:** Auto-incrementing primary key for each product.

```typescript
      name VARCHAR(255) NOT NULL,
```
- **Line 28:** Product name (required).

```typescript
      description TEXT,
```
- **Line 29:** 
  - `description`: Detailed product description
  - `TEXT`: Variable-length string with no maximum length (for long descriptions)

```typescript
      price DECIMAL(12, 2) NOT NULL,
```
- **Line 30:**
  - `price`: Product price
  - `DECIMAL(12, 2)`: Fixed-point number with 12 total digits, 2 after decimal point
  - Example: Can store values from -9999999999.99 to 9999999999.99
  - Perfect for currency to avoid floating-point rounding errors

```typescript
      category VARCHAR(50) NOT NULL,
```
- **Line 31:** Product category (gold, diamond, silver, lehenga, saree, suits, etc.).

```typescript
      metal VARCHAR(50),
```
- **Line 32:** Type of metal (Gold, Silver, Diamond) - nullable for clothing items.

```typescript
      gender VARCHAR(20),
```
- **Line 33:** Target gender (women, men, unisex) - nullable.

```typescript
      image_url VARCHAR(500) NOT NULL,
```
- **Line 34:** URL or path to the product image (required).

```typescript
      stock INTEGER DEFAULT 1,
```
- **Line 35:**
  - `stock`: Available quantity in inventory
  - `INTEGER`: Whole number
  - `DEFAULT 1`: Defaults to 1 if not specified

```typescript
      is_featured BOOLEAN DEFAULT false,
```
- **Line 36:**
  - `is_featured`: Flag to highlight featured products on homepage
  - `BOOLEAN`: True/false value
  - `DEFAULT false`: Not featured by default

```typescript
      sold_out BOOLEAN DEFAULT false,
```
- **Line 37:** Flag to mark products as sold out.

```typescript
      is_new BOOLEAN DEFAULT false,
```
- **Line 38:** Flag to mark new arrivals.

```typescript
      image_position_x DECIMAL(5, 2) DEFAULT 50,
```
- **Line 39:**
  - `image_position_x`: Horizontal position for image cropping/positioning (0-100%)
  - `DECIMAL(5, 2)`: 5 total digits, 2 after decimal (e.g., 50.00)
  - `DEFAULT 50`: Centers image horizontally by default

```typescript
      image_position_y DECIMAL(5, 2) DEFAULT 50,
```
- **Line 40:** Vertical position for image cropping/positioning (0-100%).

```typescript
      image_scale DECIMAL(5, 2) DEFAULT 100,
```
- **Line 41:** Image zoom scale (100 = normal size).

```typescript
      created_at TIMESTAMPTZ DEFAULT NOW(),
```
- **Line 42:** Timestamp when product was added.

```typescript
      updated_at TIMESTAMPTZ DEFAULT NOW()
```
- **Line 43:** Timestamp when product was last modified.

```typescript
    )
```
- **Line 44:** End of products table definition.

**Purpose of Products Table:** Stores all inventory including:
- Jewellery items (gold, silver, diamond)
- Traditional clothing (sarees, lehengas, suits, sadri, dhatu, rejta)
- Image positioning data for optimal display
- Stock and availability status

---

### Table 3: Consultations Table

```typescript
  await sql`
    CREATE TABLE IF NOT EXISTS consultations (
```
- **Lines 47-48:** Creates table for storing design consultation requests.

```typescript
      id SERIAL PRIMARY KEY,
```
- **Line 49:** Auto-incrementing primary key.

```typescript
      name VARCHAR(255) NOT NULL,
```
- **Line 50:** Customer's name (required).

```typescript
      mobile VARCHAR(20) NOT NULL,
```
- **Line 51:** Customer's phone number (required).

```typescript
      budget VARCHAR(100),
```
- **Line 52:** Customer's budget range (e.g., "50000-100000").

```typescript
      metal_preference VARCHAR(50),
```
- **Line 53:** Preferred metal type (gold, silver, etc.).

```typescript
      notes TEXT,
```
- **Line 54:** Additional notes or requirements from customer.

```typescript
      source VARCHAR(50) DEFAULT 'website',
```
- **Line 55:** How the customer found the shop (website, referral, walk-in, etc.).

```typescript
      created_at TIMESTAMPTZ DEFAULT NOW()
```
- **Line 56:** When the consultation was requested.

```typescript
    )
```
- **Line 57:** End of consultations table definition.

**Purpose of Consultations Table:** Captures leads from:
- Website contact forms
- Design consultation requests
- Customer inquiries
- Helps track potential sales opportunities

---

### Table 4: Product Images Table

```typescript
  await sql`
    CREATE TABLE IF NOT EXISTS product_images (
```
- **Lines 60-61:** Creates table for additional product images (one product can have multiple images).

```typescript
      id SERIAL PRIMARY KEY,
```
- **Line 62:** Auto-incrementing primary key.

```typescript
      product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
```
- **Line 63:**
  - `product_id`: Foreign key linking to the products table
  - `INTEGER`: Whole number matching product.id type
  - `REFERENCES products(id)`: Establishes relationship to products table
  - `ON DELETE CASCADE`: If a product is deleted, all its images are automatically deleted

**Foreign Key Concept:** 
- Ensures referential integrity - can't have an image for a non-existent product
- `ON DELETE CASCADE` automatically cleans up related records

```typescript
      image_url VARCHAR(500) NOT NULL,
```
- **Line 64:** URL or path to the additional image.

```typescript
      color_name VARCHAR(50),
```
- **Line 65:** Name of the color variant (e.g., "Gold", "Rose Gold", "Silver").

```typescript
      is_primary BOOLEAN DEFAULT false,
```
- **Line 66:** Marks which image is the primary/featured image for the product.

```typescript
      created_at TIMESTAMPTZ DEFAULT NOW()
```
- **Line 67:** When the image was added.

```typescript
    )
```
- **Line 68:** End of product_images table definition.

**Purpose of Product Images Table:** Supports:
- Multiple images per product (different angles, color variants)
- Color variant management
- Primary image selection for catalog display

---

## Database Seeding Logic

### Check and Seed Default Admin

```typescript
  const userCount = await sql`SELECT COUNT(*)::int AS count FROM users`;
```
- **Line 71:** Counts the number of users in the database.
  - `COUNT(*)`: Counts all rows
  - `::int`: Casts the result to integer (PostgreSQL syntax)
  - `AS count`: Names the result column "count"

```typescript
  if ((userCount[0]?.count as number) === 0) {
```
- **Line 72:** Checks if the users table is empty.
  - `userCount[0]`: Gets the first (and only) row from the result
  - `?.count`: Optional chaining - safely accesses count property
  - `as number`: Type assertion for TypeScript
  - `=== 0`: Checks if count is zero

```typescript
    // @ts-expect-error Neon type compatibility issue
    await seedDefaultAdmin(sql);
```
- **Lines 73-74:** If no users exist, creates the default admin user.
  - `@ts-expect-error`: Tells TypeScript to ignore expected type error
  - `seedDefaultAdmin(sql)`: Calls function to create admin user

---

### Check and Seed Products

```typescript
  const count = await sql`SELECT COUNT(*)::int AS count FROM products`;
```
- **Line 77:** Counts the number of products in the database.

```typescript
  if ((count[0]?.count as number) === 0) {
```
- **Line 78:** Checks if products table is empty.

```typescript
    // @ts-expect-error Neon type compatibility issue
    await seedProducts(sql);
```
- **Lines 79-80:** If no products exist, seeds sample products.

```typescript
  }
}
```
- **Lines 81-82:** End of initDatabase function.

**Seeding Pattern:** This pattern ensures:
- Database is only seeded once (on first initialization)
- Existing data is not overwritten
- Idempotent operation - can be run multiple times safely

---

## Reset Products Function

```typescript
export async function resetProducts() {
```
- **Line 84:** Exports function to reset/reseed products (useful for development).

```typescript
  const sql = getDb();
```
- **Line 85:** Gets database connection.

```typescript
  await sql`DELETE FROM products`;
```
- **Line 86:** Deletes all products from the table.
  - `DELETE FROM products`: Removes all rows
  - No WHERE clause means delete everything

```typescript
  // @ts-expect-error Neon type compatibility issue
  await seedProducts(sql);
```
- **Lines 87-88:** Reseeds products with sample data.

```typescript
}
```
- **Line 89:** End of resetProducts function.

**Use Case:** Useful during development when:
- Product schema changes
- Need fresh sample data
- Testing with clean state

---

## Admin User Seeding

```typescript
async function seedDefaultAdmin(sql: ReturnType<typeof neon>) {
```
- **Line 91:** Private function to create default admin user.
  - `sql: ReturnType<typeof neon>`: Type annotation - sql parameter is the return type of neon function

```typescript
  const adminEmail = process.env.ADMIN_EMAIL || "admin@rangolijwellers.com";
```
- **Line 92:** Gets admin email from environment or uses default.
  - `||`: Logical OR - uses right side if left side is falsy

```typescript
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
```
- **Line 93:** Gets admin password from environment or uses default.

```typescript
  const hashedPassword = await hashPassword(adminPassword);
```
- **Line 94:** Hashes the password before storing (security best practice).

```typescript
  await sql`
```
- **Line 96:** Begins SQL INSERT query.

```typescript
    INSERT INTO users (email, password, name, role)
```
- **Line 97:** Specifies which columns to insert into.

```typescript
    VALUES (
```
- **Line 98:** Begins VALUES clause.

```typescript
      ${adminEmail},
```
- **Line 99:** Parameterized value for email (Neon automatically escapes this to prevent SQL injection).

```typescript
      ${hashedPassword},
```
- **Line 100:** Parameterized value for hashed password.

```typescript
      'Admin User',
```
- **Line 101:** Static string for admin name.

```typescript
      'admin'
```
- **Line 102:** Static string for role.

```typescript
    )
```
- **Line 103:** End of VALUES clause.

```typescript
  `;
```
- **Line 104:** End of SQL query.

```typescript
}
```
- **Line 105:** End of seedDefaultAdmin function.

**Security Note:** Passwords are hashed before storage, never stored in plain text.

---

## Password Hashing Function

```typescript
async function hashPassword(password: string): Promise<string> {
```
- **Line 107:** Function to hash passwords using SHA-256.
  - `password: string`: Input parameter - plain text password
  - `Promise<string>`: Returns a Promise that resolves to hashed string

```typescript
  // Simple hash for demo - in production use bcrypt
```
- **Line 108:** Comment noting this is a simple hash for demonstration. Production should use bcrypt or argon2.

```typescript
  const encoder = new TextEncoder();
```
- **Line 109:** Creates a TextEncoder to convert string to bytes.

```typescript
  const data = encoder.encode(password + "rangoli_salt");
```
- **Line 110:** 
  - Encodes password + salt to bytes
  - Salt adds randomness to prevent rainbow table attacks
  - "rangoli_salt" is a simple salt (should be random in production)

```typescript
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
```
- **Line 111:** 
  - `crypto.subtle.digest`: Web Crypto API for hashing
  - `'SHA-256'`: Hashing algorithm
  - `data`: Input bytes to hash
  - Returns an ArrayBuffer containing the hash

```typescript
  const hashArray = Array.from(new Uint8Array(hashBuffer));
```
- **Line 112:** Converts ArrayBuffer to regular JavaScript array of numbers.

```typescript
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
```
- **Line 113:** Converts array of numbers to hexadecimal string.
  - `b.toString(16)`: Converts byte to hex string
  - `.padStart(2, '0')`: Ensures 2 digits (e.g., "0a" not "a")
  - `.join('')`: Joins all hex digits into one string

```typescript
}
```
- **Line 114:** End of hashPassword function.

**Hashing vs Encryption:**
- **Hashing:** One-way function, cannot reverse (used for passwords)
- **Encryption:** Two-way function, can decrypt (used for data)

---

## Product Seeding Function

```typescript
async function seedProducts(sql: ReturnType<typeof neon>) {
```
- **Line 116:** Function to seed sample products into database.

```typescript
  const samples = [];
```
- **Line 117:** Creates empty array to hold sample product data.

```typescript
  // Gold products
  for (let i = 38; i >= 1; i--) {
```
- **Lines 119-120:** Loop to create 38 gold jewellery products.
  - `i = 38`: Start at 38
  - `i >= 1`: Continue while i is greater than or equal to 1
  - `i--`: Decrement i each iteration

```typescript
    samples.push({
```
- **Line 121:** Adds product object to samples array.

```typescript
      name: "Gold Jewellery",
```
- **Line 122:** Product name.

```typescript
      description: "",
```
- **Line 123:** Empty description.

```typescript
      price: 0,
```
- **Line 124:** Price set to 0 (placeholder).

```typescript
      category: "gold",
```
- **Line 125:** Category is "gold".

```typescript
      metal: "Gold",
```
- **Line 126:** Metal type is "Gold".

```typescript
      gender: "women",
```
- **Line 127:** Target gender is women.

```typescript
      image: `/images/Gold_gdq/gp_${i}.jpg`,
```
- **Line 128:** Image path with dynamic filename using template literal.
  - `` ` ``: Template literal allows embedding expressions
  - `${i}`: Inserts the loop variable into the string
  - Result: "/images/Gold_gdq/gp_38.jpg", "/images/Gold_gdq/gp_37.jpg", etc.

```typescript
    });
```
- **Line 129:** End of object and push call.

```typescript
  }
```
- **Line 130:** End of gold products loop.

**Pattern Explanation:** This loop generates 38 gold product entries with images named gp_1.jpg through gp_38.jpg.

---

### Diamond Products Seeding

```typescript
  // Diamond products
  const diamondImages = [
```
- **Lines 132-133:** Array of diamond product image filenames.

```typescript
    "DSC01494.jpg",
    "DSC01517.jpg",
    "DSC01551.jpg",
    "DSC01552.jpg",
    "DSC01555.jpg",
    "DSC01558.jpg",
    "DSC01561.jpg"
```
- **Lines 134-140:** List of 7 diamond product image filenames.

```typescript
  ];
```
- **Line 141:** End of array.

```typescript
  for (const img of diamondImages) {
```
- **Line 142:** Iterates through each image filename in the array.
  - `for...of`: Loop through iterable (array)
  - `const img`: Each element assigned to img variable

```typescript
    samples.push({
```
- **Line 143:** Adds diamond product to samples array.

```typescript
      name: "Diamond Jewellery",
      description: "",
      price: 0,
      category: "diamond",
      metal: "Diamond",
      gender: "women",
      image: `/images/Diamond_products/${img}`,
```
- **Lines 144-150:** Diamond product properties with dynamic image path.

```typescript
    });
```
- **Line 151:** End of object.

```typescript
  }
```
- **Line 152:** End of diamond loop.

---

### Silver Products Seeding

```typescript
  // Silver products
  const silverImages = [
```
- **Lines 154-155:** Array of silver product image filenames.

```typescript
    "DSC01538.jpg",
    "DSC01539.jpg",
    "DSC01588.jpg",
    "DSC08341.jpg",
    "DSC08447.jpg",
    "DSC08448.jpg",
    "DSC08449.jpg",
    "DSC08450.jpg",
    "DSC08452.jpg",
    "DSC08453.jpg",
    "DSC08454.jpg",
    "DSC08455.jpg"
```
- **Lines 156-167:** List of 12 silver product image filenames.

```typescript
  ];
```
- **Line 168:** End of array.

```typescript
  for (const img of silverImages) {
```
- **Line 169:** Iterates through silver images.

```typescript
    samples.push({
      name: "Silver Jewellery",
      description: "",
      price: 0,
      category: "silver",
      metal: "Silver",
      gender: "women",
      image: `/images/Silver_Products/${img}`,
    });
```
- **Lines 170-178:** Silver product properties.

```typescript
  }
```
- **Line 179:** End of silver loop.

---

### Clothing Products Seeding

```typescript
  // Clothing products
  const clothingProducts = [
```
- **Lines 181-182:** Array of clothing product objects.

```typescript
    { name: "Pahari Traditional Dress", category: "traditional-wears", image: "/images/Clothes/Traditional_firstPhoto.jpg.jpg", gender: "women" },
```
- **Line 183:** Traditional dress product with all properties in one object.

```typescript
    { name: "Pink Lehenga", category: "lehenga", image: "/images/Clothes/Lehenga_2.jpg.jpg", gender: "women" },
```
- **Line 184:** Lehenga product.

```typescript
    { name: "Sadri Saree", category: "saree", image: "/images/Clothes/Saree_2.jpg.jpg", gender: "women" },
```
- **Line 185:** Saree product.

```typescript
    { name: "Elegant Suit", category: "suits", image: "/images/Clothes/Suit.jpg", gender: "women" },
```
- **Line 186:** Suit product.

```typescript
    { name: "Traditional Lehenga", category: "lehenga", image: "/images/Clothing_collection_Lehanga.jpg", gender: "women" },
```
- **Line 187:** Another lehenga.

```typescript
    { name: "Traditional Saree", category: "saree", image: "/images/Clothing_collecting_Saare.jpg", gender: "women" },
```
- **Line 188:** Another saree.

```typescript
    { name: "Traditional Suit", category: "suits", image: "/images/Clothing_collection_Suit.jpg", gender: "women" },
```
- **Line 189:** Another suit.

```typescript
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_2.jpg.jpg", gender: "women" },
```
- **Line 190:** Suit variant 2.

```typescript
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_3.jpg.jpg", gender: "women" },
```
- **Line 191:** Suit variant 3.

```typescript
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_4.jpg.jpg", gender: "women" },
```
- **Line 192:** Suit variant 4.

```typescript
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_5.jpg.jpg", gender: "women" },
```
- **Line 193:** Suit variant 5.

```typescript
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_6.jpg.jpg", gender: "women" },
```
- **Line 194:** Suit variant 6.

```typescript
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_7.jpg.jpg", gender: "women" },
```
- **Line 195:** Suit variant 7.

```typescript
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_8.jpg.jpg", gender: "women" },
```
- **Line 196:** Suit variant 8.

```typescript
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_9.jpg.jpg", gender: "women" },
```
- **Line 197:** Suit variant 9.

```typescript
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_10.jpg.jpg", gender: "women" },
```
- **Line 198:** Suit variant 10.

```typescript
    { name: "Suit", category: "suits", image: "/images/Clothes/Suit_11.jpg.jpg", gender: "women" },
```
- **Line 199:** Suit variant 11.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_1.jpg.jpg", gender: "women" },
```
- **Line 200:** Sadri traditional wear variant 1.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_2.jpg.jpg", gender: "women" },
```
- **Line 201:** Sadri variant 2.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_3.jpg.jpg", gender: "women" },
```
- **Line 202:** Sadri variant 3.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_4.jpg.jpg", gender: "women" },
```
- **Line 203:** Sadri variant 4.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_5.jpg.jpg", gender: "women" },
```
- **Line 204:** Sadri variant 5.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_6.jpg.jpg", gender: "women" },
```
- **Line 205:** Sadri variant 6.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_7.jpg.jpg", gender: "women" },
```
- **Line 206:** Sadri variant 7.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_8.jpg.jpg", gender: "women" },
```
- **Line 207:** Sadri variant 8.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_9.jpg.jpg", gender: "women" },
```
- **Line 208:** Sadri variant 9.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_10.jpg.jpg", gender: "women" },
```
- **Line 209:** Sadri variant 10.

```typescript
    { name: "Sadri", category: "sadri", image: "/images/Clothes/Traditional_10.1.jpg.jpg", gender: "women" },
```
- **Line 210:** Sadri variant 10.1.

```typescript
    { name: "Dhatu", category: "dhatu", image: "/images/Clothes/Traditional_11.jpg.jpg", gender: "women" },
```
- **Line 211:** Dhatu traditional wear variant 1.

```typescript
    { name: "Dhatu", category: "dhatu", image: "/images/Clothes/Traditional_12.jpg.jpg", gender: "women" },
```
- **Line 212:** Dhatu variant 2.

```typescript
    { name: "Dhatu", category: "dhatu", image: "/images/Clothes/Traditional_13.jpg.jpg", gender: "women" },
```
- **Line 213:** Dhatu variant 3.

```typescript
    { name: "Dhatu", category: "dhatu", image: "/images/Clothes/Traditional_14.jpg.jpg", gender: "women" },
```
- **Line 214:** Dhatu variant 4.

```typescript
    { name: "Dhatu", category: "dhatu", image: "/images/Clothes/Traditional_15.jpg.jpg", gender: "women" },
```
- **Line 215:** Dhatu variant 5.

```typescript
    { name: "Dhatu", category: "dhatu", image: "/images/Clothes/Traditional_16.jpg.jpg", gender: "women" },
```
- **Line 216:** Dhatu variant 6.

```typescript
    { name: "Dhatu", category: "dhatu", image: "/images/Clothes/Traditional_17.jpg.jpg", gender: "women" },
```
- **Line 217:** Dhatu variant 7.

```typescript
    { name: "Dhatu", category: "dhatu", image: "/images/Clothes/Traditional_18.jpg.jpg", gender: "women" },
```
- **Line 218:** Dhatu variant 8.

```typescript
    { name: "Dhatu", category: "dhatu", image: "/images/Clothes/Traditional_19.jpg.jpg", gender: "women" },
```
- **Line 219:** Dhatu variant 9.

```typescript
    { name: "Dhatu", category: "dhatu", image: "/images/Clothes/Traditional_20.jpg.jpg", gender: "women" },
```
- **Line 220:** Dhatu variant 10.

```typescript
    { name: "Rejta", category: "rejta", image: "/images/Clothes/Traditional_21.jpg.jpg", gender: "women" },
```
- **Line 221:** Rejta traditional wear variant 1.

```typescript
    { name: "Rejta", category: "rejta", image: "/images/Clothes/Traditional_22.jpg.jpg", gender: "women" },
```
- **Line 222:** Rejta variant 2.

```typescript
    { name: "Rejta", category: "rejta", image: "/images/Clothes/Traditional_23.jpg.jpg", gender: "women" },
```
- **Line 223:** Rejta variant 3.

```typescript
    { name: "Rejta", category: "rejta", image: "/images/Clothes/Traditional_24.jpg.jpg", gender: "women" },
```
- **Line 224:** Rejta variant 4.

```typescript
    { name: "Rejta", category: "rejta", image: "/images/Clothes/Traditional_25.jpg.jpg", gender: "women" },
```
- **Line 225:** Rejta variant 5.

```typescript
    { name: "Rejta", category: "rejta", image: "/images/Clothes/Traditional_26.jpg.jpg", gender: "women" },
```
- **Line 226:** Rejta variant 6.

```typescript
    { name: "Rejta", category: "rejta", image: "/images/Clothes/Traditional_27.jpg.jpg", gender: "women" },
```
- **Line 227:** Rejta variant 7.

```typescript
    { name: "Rejta", category: "rejta", image: "/images/Clothes/Traditional_28.jpg.jpg", gender: "women" },
```
- **Line 228:** Rejta variant 8.

```typescript
  ];
```
- **Line 229:** End of clothingProducts array.

```typescript
  for (const item of clothingProducts) {
```
- **Line 230:** Iterates through clothing products.

```typescript
    samples.push({
```
- **Line 231:** Adds clothing product to samples.

```typescript
      name: item.name,
```
- **Line 232:** Uses name from clothing product object.

```typescript
      description: "",
```
- **Line 233:** Empty description.

```typescript
      price: 0,
```
- **Line 234:** Price 0.

```typescript
      category: item.category,
```
- **Line 235:** Uses category from object.

```typescript
      metal: null,
```
- **Line 236:** Metal is null (not applicable for clothing).

```typescript
      gender: item.gender,
```
- **Line 237:** Uses gender from object.

```typescript
      image: item.image,
```
- **Line 238:** Uses image path from object.

```typescript
    });
```
- **Line 239:** End of object.

```typescript
  }
```
- **Line 240:** End of clothing loop.

---

### Insert Sample Products

```typescript
  for (const item of samples) {
```
- **Line 242:** Iterates through all sample products (gold, diamond, silver, clothing).

```typescript
    await sql`
```
- **Line 243:** Begins INSERT query.

```typescript
      INSERT INTO products (name, description, price, category, metal, gender, image_url, stock, is_featured)
```
- **Line 244:** Specifies columns to insert.

```typescript
      VALUES (
```
- **Line 245:** Begins VALUES clause.

```typescript
        ${item.name},
```
- **Line 246:** Parameterized name.

```typescript
        ${item.description},
```
- **Line 247:** Parameterized description.

```typescript
        ${item.price},
```
- **Line 248:** Parameterized price.

```typescript
        ${item.category},
```
- **Line 249:** Parameterized category.

```typescript
        ${item.metal},
```
- **Line 250:** Parameterized metal (can be null).

```typescript
        ${item.gender},
```
- **Line 251:** Parameterized gender.

```typescript
        ${item.image},
```
- **Line 252:** Parameterized image URL.

```typescript
        ${Math.floor(Math.random() * 3) + 1},
```
- **Line 253:** Random stock between 1 and 3.
  - `Math.random()`: Returns 0 to 1 (exclusive)
  - `* 3`: Scales to 0 to 3 (exclusive)
  - `Math.floor()`: Rounds down to integer (0, 1, or 2)
  - `+ 1`: Shifts to 1, 2, or 3

```typescript
        ${Math.random() > 0.5}
```
- **Line 254:** Random boolean (true or false).
  - `Math.random() > 0.5`: 50% chance of being true
  - Results in random featured status

```typescript
      )
```
- **Line 255:** End of VALUES.

```typescript
    `;
```
- **Line 256:** End of SQL query.

```typescript
  }
```
- **Line 257:** End of insertion loop.

```typescript
}
```
- **Line 258:** End of seedProducts function.

---

## TypeScript Interfaces

### Product Interface

```typescript
export interface Product {
```
- **Line 260:** Exports TypeScript interface for Product type.
  - `interface`: Defines the shape of an object
  - `export`: Makes it available to other files

```typescript
  id: number;
```
- **Line 261:** Product ID (number type).

```typescript
  name: string;
```
- **Line 262:** Product name (string type).

```typescript
  description: string | null;
```
- **Line 263:** Description can be string or null (union type).

```typescript
  price: number;
```
- **Line 264:** Price (number type).

```typescript
  category: string;
```
- **Line 265:** Category (string type).

```typescript
  metal: string | null;
```
- **Line 266:** Metal can be string or null.

```typescript
  gender: string | null;
```
- **Line 267:** Gender can be string or null.

```typescript
  image_url: string;
```
- **Line 268:** Image URL (string type).

```typescript
  stock: number;
```
- **Line 269:** Stock quantity (number type).

```typescript
  is_featured: boolean;
```
- **Line 270:** Featured flag (boolean type).

```typescript
  sold_out: boolean;
```
- **Line 271:** Sold out flag (boolean type).

```typescript
  is_new: boolean;
```
- **Line 272:** New arrival flag (boolean type).

```typescript
  image_position_x: number;
```
- **Line 273:** Image horizontal position (number type).

```typescript
  image_position_y: number;
```
- **Line 274:** Image vertical position (number type).

```typescript
  image_scale: number;
```
- **Line 275:** Image scale (number type).

```typescript
  created_at: string;
```
- **Line 276:** Creation timestamp (string type - ISO 8601 format).

```typescript
  updated_at: string;
```
- **Line 277:** Update timestamp (string type).

```typescript
}
```
- **Line 278:** End of Product interface.

**Purpose of Interface:** Provides type safety - TypeScript will check that any object labeled as Product has all these properties with correct types.

---

### Consultation Interface

```typescript
export interface Consultation {
```
- **Line 280:** Exports interface for Consultation type.

```typescript
  id: number;
```
- **Line 281:** Consultation ID.

```typescript
  name: string;
```
- **Line 282:** Customer name.

```typescript
  mobile: string;
```
- **Line 283:** Customer phone number.

```typescript
  budget: string | null;
```
- **Line 284:** Budget range (optional).

```typescript
  metal_preference: string | null;
```
- **Line 285:** Metal preference (optional).

```typescript
  notes: string | null;
```
- **Line 286:** Additional notes (optional).

```typescript
  source: string;
```
- **Line 287:** Lead source.

```typescript
  created_at: string;
```
- **Line 288:** Creation timestamp.

```typescript
}
```
- **Line 289:** End of Consultation interface.

---

### ProductImage Interface

```typescript
export interface ProductImage {
```
- **Line 291:** Exports interface for ProductImage type.

```typescript
  id: number;
```
- **Line 292:** Image ID.

```typescript
  product_id: number;
```
- **Line 293:** Reference to product ID.

```typescript
  image_url: string;
```
- **Line 294:** Image URL.

```typescript
  color_name: string | null;
```
- **Line 295:** Color variant name (optional).

```typescript
  is_primary: boolean;
```
- **Line 296:** Primary image flag.

```typescript
  created_at: string;
```
- **Line 297:** Creation timestamp.

```typescript
}
```
- **Line 298:** End of ProductImage interface.

---

### User Interface

```typescript
export interface User {
```
- **Line 300:** Exports interface for User type.

```typescript
  id: number;
```
- **Line 301:** User ID.

```typescript
  email: string;
```
- **Line 302:** User email.

```typescript
  password: string;
```
- **Line 303:** Hashed password.

```typescript
  name: string;
```
- **Line 304:** User name.

```typescript
  role: string;
```
- **Line 305:** User role (admin, user).

```typescript
  created_at: string;
```
- **Line 306:** Creation timestamp.

```typescript
}
```
- **Line 307:** End of User interface.

---

## Database Initialization Script (scripts/init-db.ts)

```typescript
import { config } from "dotenv";
```
- **Line 1:** Imports dotenv config function to load environment variables.

```typescript
import { initDatabase } from "../src/lib/db";
```
- **Line 2:** Imports the initDatabase function from the db module.

```typescript
config();
```
- **Line 4:** Loads environment variables from .env file into process.env.

```typescript
async function main() {
```
- **Line 6:** Defines main async function.

```typescript
  console.log("Initializing database...");
```
- **Line 7:** Logs progress message to console.

```typescript
  try {
```
- **Line 8:** Begins try block for error handling.

```typescript
    await initDatabase();
```
- **Line 9:** Calls initDatabase function to create tables and seed data.

```typescript
    console.log("Database initialized successfully!");
```
- **Line 10:** Logs success message.

```typescript
    process.exit(0);
```
- **Line 11:** Exits process with success code (0).

```typescript
  } catch (error) {
```
- **Line 12:** Catches any errors that occur.

```typescript
    console.error("Failed to initialize database:", error);
```
- **Line 13:** Logs error message.

```typescript
    process.exit(1);
```
- **Line 14:** Exits process with error code (1).

```typescript
  }
```
- **Line 15:** End of try-catch block.

```typescript
}
```
- **Line 16:** End of main function.

```typescript
main();
```
- **Line 18:** Calls main function to execute the script.

**Usage:** Run with `npm run init-db` to initialize database from command line.

---

## Database Setup API Route (src/app/api/setup/route.ts)

```typescript
import { initDatabase, resetProducts } from "@/lib/db";
```
- **Line 1:** Imports database functions.
  - `@/`: Path alias for src/ directory (configured in tsconfig.json)

```typescript
import { jsonError, jsonSuccess } from "@/lib/api-utils";
```
- **Line 2:** Imports utility functions for consistent API responses.

```typescript
export async function GET() {
```
- **Line 4:** Exports GET handler for /api/setup route.
  - Next.js API routes use HTTP method functions (GET, POST, PUT, DELETE)

```typescript
  try {
```
- **Line 5:** Begins try block.

```typescript
    await initDatabase();
```
- **Line 6:** Initializes database.

```typescript
    return jsonSuccess({ ok: true, message: "Database initialized" });
```
- **Line 7:** Returns success response with JSON.

```typescript
  } catch (error) {
```
- **Line 8:** Catches errors.

```typescript
    console.error("Setup error:", error);
```
- **Line 9:** Logs error to console.

```typescript
    return jsonError("Database setup failed", 500);
```
- **Line 10:** Returns error response with 500 status code.

```typescript
  }
}
```
- **Lines 11-12:** End of GET handler.

```typescript
export async function POST(request: Request) {
```
- **Line 14:** Exports POST handler.
  - `request: Request`: Next.js passes the HTTP request object

```typescript
  try {
```
- **Line 15:** Begins try block.

```typescript
    const body = await request.json().catch(() => ({}));
```
- **Line 16:** Parses request body as JSON.
  - `request.json()`: Reads and parses JSON body
  - `.catch(() => ({}))`: If parsing fails, returns empty object

```typescript
    if (body.reset === true) {
```
- **Line 18:** Checks if reset flag is set in request body.

```typescript
      await resetProducts();
```
- **Line 19:** Resets products (deletes and reseeds).

```typescript
      return jsonSuccess({ ok: true, message: "Products reset with new images" });
```
- **Line 20:** Returns success response.

```typescript
    }
```
- **Line 21:** End of if block.

```typescript
    await initDatabase();
```
- **Line 23:** If not reset, just initialize database.

```typescript
    return jsonSuccess({ ok: true, message: "Database initialized" });
```
- **Line 24:** Returns success response.

```typescript
  } catch (error) {
```
- **Line 25:** Catches errors.

```typescript
    console.error("Setup error:", error);
```
- **Line 26:** Logs error.

```typescript
    return jsonError("Database setup failed", 500);
```
- **Line 27:** Returns error response.

```typescript
  }
}
```
- **Lines 28-29:** End of POST handler.

**Usage:** 
- Visit `http://localhost:3000/api/setup` (GET) to initialize database
- Send POST to same endpoint with `{ "reset": true }` to reset products

---

## Database Schema Summary

### Tables Overview

| Table | Purpose | Key Features |
|-------|---------|--------------|
| `users` | Authentication | Email uniqueness, role-based access |
| `products` | Inventory | Multi-category, image positioning, stock tracking |
| `consultations` | Lead management | Customer inquiries, budget tracking |
| `product_images` | Multi-image support | Foreign key with CASCADE, color variants |

### Relationships

- **product_images → products**: One-to-many (one product has many images)
- **CASCADE delete**: Deleting a product automatically deletes its images

### Data Types Used

- **SERIAL**: Auto-incrementing integers for IDs
- **VARCHAR(n)**: Variable-length strings with max length
- **TEXT**: Unlimited length strings (descriptions, notes)
- **DECIMAL(p,s)**: Fixed-point numbers (prices, positioning)
- **INTEGER**: Whole numbers (stock, foreign keys)
- **BOOLEAN**: True/false values (flags)
- **TIMESTAMPTZ**: Timestamps with timezone

---

## Key Database Concepts

### 1. Primary Keys
- Uniquely identify each row
- Auto-increment with SERIAL
- Used for relationships and lookups

### 2. Foreign Keys
- Link tables together
- Enforce referential integrity
- CASCADE deletes for cleanup

### 3. Indexes
- Automatically created on primary keys
- Speed up queries
- UNIQUE constraint creates index

### 4. Default Values
- Provide fallback values
- Reduce required fields
- Common for timestamps and flags

### 5. NOT NULL Constraints
- Ensure required fields have values
- Prevent incomplete data
- Improve data quality

### 6. Parameterized Queries
- Prevent SQL injection
- Automatic escaping by Neon
- Safe user input handling

---

## Summary of Part 2

In Part 2, we covered:
1. **Database Technology** - Neon PostgreSQL and its advantages
2. **Database Connection** - How the app connects to the database
3. **Database Schema** - Four tables with detailed column explanations
4. **Table Relationships** - Foreign keys and CASCADE deletes
5. **Data Seeding** - Automatic population of sample data
6. **Password Hashing** - Security best practices for authentication
7. **TypeScript Interfaces** - Type definitions for all data models
8. **Initialization Scripts** - Command-line and API-based database setup
9. **SQL Concepts** - Data types, constraints, and query patterns

**Next in Part 3:** Backend API routes and server setup - how the application handles HTTP requests and business logic.

---

*This documentation provides a comprehensive understanding of the database layer for technical interviews. Each component is explained in detail to help you articulate database design decisions and implementation details.*
