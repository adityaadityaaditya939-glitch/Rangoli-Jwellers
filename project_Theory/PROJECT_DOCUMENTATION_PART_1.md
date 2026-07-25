# Rangoli Jewellers Project Documentation - Part 1

## Project Overview

**Project Name:** Rangoli Exclusive (Rangoli Jewellers)  
**Location:** Rohru, Himachal Pradesh  
**Type:** Premium Jewellery E-commerce Website  

This is a full-stack web application built with modern web technologies to showcase and sell jewellery products online. The project includes both customer-facing features (product catalog, contact forms, WhatsApp integration) and admin features (product management, lead tracking, authentication).

---

## Technology Stack Overview

### Frontend Framework
- **Next.js 15.5.9** - A React framework for production-grade applications
- **React 19.1.0** - A JavaScript library for building user interfaces
- **TypeScript 5.9.2** - A typed superset of JavaScript that compiles to plain JavaScript

### Styling
- **Tailwind CSS 4.1.13** - A utility-first CSS framework for rapid UI development

### Backend & Database
- **Neon PostgreSQL** - A serverless PostgreSQL database (via @neondatabase/serverless)
- **Next.js API Routes** - Built-in API routes for backend functionality

### Authentication
- **JWT (JSON Web Tokens)** - For secure admin authentication using the jose library
- **HTTP-only cookies** - For secure session management

### File Upload
- **UploadThing** - A file upload service for handling product images

### Additional Libraries
- **Zod** - TypeScript-first schema validation
- **XLSX** - For Excel/CSV export functionality
- **dotenv** - Environment variable management

---

## Project Structure

```
Rangoli-Jwellers/
├── .env                          # Environment variables (not in git)
├── .env.example                  # Example environment variables template
├── .git/                         # Git version control
├── .gitignore                    # Files to exclude from git
├── .next/                        # Next.js build output (generated)
├── blue-print-images/            # Design mockups and reference images
├── node_modules/                 # Installed npm packages
├── public/                       # Static assets (images, fonts, etc.)
├── scripts/                      # Database initialization and migration scripts
├── src/                          # Source code directory
│   ├── app/                      # Next.js App Router pages and API routes
│   ├── components/               # Reusable React components
│   ├── lib/                      # Utility functions and configurations
│   └── middleware.ts             # Next.js middleware for authentication
├── package.json                  # Project dependencies and scripts
├── package-lock.json             # Locked dependency versions
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration for Tailwind
├── eslint.config.mjs             # ESLint linting configuration
└── README.md                     # Project documentation
```

---

## Configuration Files Explained

### 1. package.json

**Purpose:** Defines project metadata, dependencies, and npm scripts.

**Line-by-line explanation:**

```json
{
  "name": "rangoli-jwellers",
```
- **Line 2:** Sets the project name. This is used when publishing to npm and in error messages.

```json
  "version": "0.1.0",
```
- **Line 3:** Project version following semantic versioning (major.minor.patch). 0.1.0 indicates initial development version.

```json
  "private": true,
```
- **Line 4:** Prevents accidental publishing to npm registry. Important for private projects.

```json
  "scripts": {
```
- **Line 5:** Start of scripts section - defines command shortcuts for common tasks.

```json
    "dev": "next dev",
```
- **Line 6:** Development server command. Running `npm run dev` starts Next.js in development mode with hot-reloading.

```json
    "build": "next build",
```
- **Line 7:** Production build command. Creates optimized build in `.next/` directory for deployment.

```json
    "start": "next start",
```
- **Line 8:** Production server command. Starts the built application in production mode.

```json
    "lint": "eslint",
```
- **Line 9:** Linting command. Runs ESLint to check code quality and find potential errors.

```json
    "init-db": "tsx scripts/init-db.ts",
```
- **Line 10:** Database initialization script. Uses tsx (TypeScript executor) to run the database setup script.

```json
    "migrate-image-positioning": "tsx scripts/migrate-image-positioning.ts",
```
- **Line 11:** Migration script for updating image positioning in the database.

```json
    "seed-clothing": "tsx scripts/seed-clothing-products.ts"
```
- **Line 12:** Script to populate database with sample clothing products.

```json
  },
```
- **Line 13:** End of scripts section.

```json
  "dependencies": {
```
- **Line 14:** Start of production dependencies - packages needed for the application to run.

```json
    "@neondatabase/serverless": "^1.0.2",
```
- **Line 15:** Neon PostgreSQL serverless driver. The `@` indicates it's a scoped package. `^1.0.2` means any version >= 1.0.2 but < 2.0.0.

```json
    "@uploadthing/react": "^7.3.3",
```
- **Line 16:** React components for UploadThing file upload service.

```json
    "@vercel/analytics": "^2.0.1",
```
- **Line 17:** Vercel analytics for tracking website visitors and performance.

```json
    "@vercel/blob": "^2.6.1",
```
- **Line 18:** Vercel Blob storage for file storage (alternative to UploadThing).

```json
    "dotenv": "^17.4.2",
```
- **Line 19:** Loads environment variables from .env file into process.env.

```json
    "jose": "^6.1.0",
```
- **Line 20:** JavaScript Object Signing and Encryption library for JWT token creation and verification.

```json
    "next": "15.5.9",
```
- **Line 21:** Next.js framework. Exact version (no `^`) ensures consistency across environments.

```json
    "react": "^19.1.0",
```
- **Line 22:** React library for building user interfaces.

```json
    "react-dom": "^19.1.0",
```
- **Line 23:** React DOM for rendering React components to the DOM.

```json
    "uploadthing": "^7.7.4",
```
- **Line 24:** UploadThing SDK for file uploads.

```json
    "xlsx": "^0.18.5",
```
- **Line 25:** Library for reading and writing Excel files (for lead export).

```json
    "zod": "^4.1.12"
```
- **Line 26:** Schema validation library for TypeScript.

```json
  },
```
- **Line 27:** End of dependencies section.

```json
  "devDependencies": {
```
- **Line 28:** Start of development dependencies - packages only needed during development.

```json
    "@eslint/eslintrc": "^3.3.1",
```
- **Line 29:** ESLint configuration package.

```json
    "@tailwindcss/postcss": "^4.1.13",
```
- **Line 30:** Tailwind CSS PostCSS plugin for processing CSS.

```json
    "@types/node": "^20.19.17",
```
- **Line 31:** TypeScript type definitions for Node.js built-in modules.

```json
    "@types/react": "^19.1.13",
```
- **Line 32:** TypeScript type definitions for React.

```json
    "@types/react-dom": "^19.1.9",
```
- **Line 33:** TypeScript type definitions for React DOM.

```json
    "eslint": "^9.36.0",
```
- **Line 34:** ESLint linting tool for JavaScript/TypeScript.

```json
    "eslint-config-next": "15.5.6",
```
- **Line 35:** ESLint configuration for Next.js projects.

```json
    "tailwindcss": "^4.1.13",
```
- **Line 36:** Tailwind CSS framework.

```json
    "tsx": "^4.22.4",
```
- **Line 37:** TypeScript executor - runs TypeScript files directly without compilation.

```json
    "typescript": "^5.9.2"
```
- **Line 38:** TypeScript compiler.

```json
  }
}
```
- **Lines 39-40:** End of devDependencies and end of package.json.

---

### 2. tsconfig.json

**Purpose:** TypeScript compiler configuration.

**Line-by-line explanation:**

```json
{
  "compilerOptions": {
```
- **Lines 1-2:** Start of TypeScript compiler options.

```json
    "target": "ES2017",
```
- **Line 3:** Specifies ECMAScript target version. ES2017 (ES8) includes async/await, shared memory, etc.

```json
    "lib": ["dom", "dom.iterable", "esnext"],
```
- **Line 4:** Library files to include. 
  - `dom`: Browser DOM APIs
  - `dom.iterable`: Iterable DOM APIs
  - `esnext`: Latest ECMAScript features

```json
    "allowJs": true,
```
- **Line 5:** Allows JavaScript files to be imported in TypeScript projects.

```json
    "skipLibCheck": true,
```
- **Line 6:** Skips type checking of declaration files (.d.ts) for faster compilation.

```json
    "strict": true,
```
- **Line 7:** Enables all strict type-checking options (noImplicitAny, strictNullChecks, etc.).

```json
    "noEmit": true,
```
- **Line 8:** Prevents compiler from emitting output files (Next.js handles this).

```json
    "esModuleInterop": true,
```
- **Line 9:** Enables import of CommonJS modules as ES6 modules.

```json
    "module": "esnext",
```
- **Line 10:** Module code generation. ESNext allows using latest module features.

```json
    "moduleResolution": "bundler",
```
- **Line 11:** Module resolution strategy. "bundler" is for modern bundlers like Next.js.

```json
    "resolveJsonModule": true,
```
- **Line 12:** Allows importing JSON files as modules.

```json
    "isolatedModules": true,
```
- **Line 13:** Ensures each file can be transpiled independently (required by some tools).

```json
    "jsx": "preserve",
```
- **Line 14:** Preserves JSX syntax for Next.js to handle (instead of transforming to React.createElement).

```json
    "incremental": true,
```
- **Line 15:** Enables incremental compilation for faster subsequent builds.

```json
    "plugins": [{ "name": "next" }],
```
- **Line 16:** Next.js TypeScript plugin for enhanced editor support.

```json
    "paths": { "@/*": ["./src/*"] }
```
- **Line 17:** Path aliases. Allows importing from `@/components` instead of `../components`.

```json
  },
```
- **Line 18:** End of compiler options.

```json
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
```
- **Line 19:** Files to include in compilation. All .ts/.tsx files plus Next.js type files.

```json
  "exclude": ["node_modules", "previous-project"]
```
- **Line 20:** Files/directories to exclude from compilation.

```json
}
```
- **Line 21:** End of tsconfig.json.

---

### 3. next.config.ts

**Purpose:** Next.js framework configuration.

**Line-by-line explanation:**

```typescript
import type { NextConfig } from "next";
```
- **Line 1:** Imports NextConfig type from Next.js for type safety.

```typescript
const nextConfig: NextConfig = {
```
- **Line 3:** Creates configuration object with NextConfig type.

```typescript
  images: {
```
- **Line 4:** Starts image optimization configuration.

```typescript
    remotePatterns: [
```
- **Line 5:** Defines allowed remote image domains for Next.js Image component.

```typescript
      {
        protocol: "https",
        hostname: "utfs.io",
      },
```
- **Lines 6-9:** Allows images from utfs.io (UploadThing's CDN) over HTTPS.

```typescript
      {
        protocol: "https",
        hostname: "ufs.sh",
      },
```
- **Lines 10-13:** Allows images from ufs.sh (another UploadThing domain).

```typescript
      {
        protocol: "https",
        hostname: "*.ufs.sh",
      },
```
- **Lines 14-17:** Allows images from any subdomain of ufs.sh using wildcard pattern.

```typescript
    ],
```
- **Line 18:** End of remotePatterns array.

```typescript
  },
```
- **Line 19:** End of images configuration.

```typescript
};
```
- **Line 20:** End of configuration object.

```typescript
export default nextConfig;
```
- **Line 22:** Exports configuration as default for Next.js to use.

---

### 4. .env.example

**Purpose:** Template for environment variables (copy to .env.local and fill in actual values).

**Line-by-line explanation:**

```env
DATABASE_URL=postgresql://neondb_owner:npg_fH8l2gdeAtTQ@ep-soft-surf-aoxpz4u8-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```
- **Line 1:** PostgreSQL connection string for Neon database.
  - `postgresql://` - Protocol
  - `neondb_owner:npg_fH8l2gdeAtTQ@` - Username:password
  - `ep-soft-surf-aoxpz4u8-pooler.c-2.ap-southeast-1.aws.neon.tech` - Database host
  - `/neondb` - Database name
  - `?sslmode=require&channel_binding=require` - Connection parameters (SSL required)

```env
JWT_SECRET=your-long-random-secret-here
```
- **Line 2:** Secret key for signing JWT tokens. Should be a long, random string in production.

```env
ADMIN_EMAIL=admin@rangolijwellers.com
```
- **Line 3:** Admin login email for accessing protected admin routes.

```env
ADMIN_PASSWORD=change-me-in-production
```
- **Line 4:** Admin login password. Must be changed in production for security.

```env
WHATSAPP_NUMBER=+919805837108
```
- **Line 5:** WhatsApp number for customer inquiries (used in "Chat on WhatsApp" buttons).

```env
SHOP_PHONE=+919805837108
```
- **Line 6:** Shop phone number for display and click-to-call functionality.

```env
UPLOADTHING_TOKEN=eyJhcGlLZXkiOiJza19saXZlX2QwMmM2ZTM4MmY3MGJlYzdiZjZiYzE5ZjNhOWIzOWVhOGI0ODlhMDEzNjBlMzIzMWQyM2JlMDRkNjM1ODFlZWUiLCJhcHBJZCI6IjMybHFuOWxyMWoiLCJyZWdpb25zIjpbInNlYTEiXX0=
```
- **Line 7:** UploadThing API token for file upload functionality.

---

## Key Concepts Explained

### What is Next.js?
Next.js is a React framework that provides:
- **Server-Side Rendering (SSR):** Renders pages on the server for better SEO and performance
- **Static Site Generation (SSG):** Pre-builds pages at build time
- **API Routes:** Built-in backend API endpoints
- **File-based Routing:** Automatic routing based on file structure
- **Image Optimization:** Automatic image optimization and serving

### What is TypeScript?
TypeScript is a typed superset of JavaScript that:
- Adds static type checking to catch errors before runtime
- Provides better IDE support with autocomplete and refactoring
- Compiles to plain JavaScript that runs in any browser
- Makes large codebases more maintainable

### What is Tailwind CSS?
Tailwind CSS is a utility-first CSS framework that:
- Provides low-level utility classes for rapid UI development
- Eliminates the need to write custom CSS
- Enables consistent design systems
- Highly customizable and performant

### What is Neon PostgreSQL?
Neon is a serverless PostgreSQL database that:
- Provides automatic scaling
- Offers branching for development/testing
- Has a generous free tier
- Connects via standard PostgreSQL protocol

### What is JWT Authentication?
JWT (JSON Web Token) authentication:
- Uses stateless tokens for authentication
- Tokens are signed with a secret key
- Can be stored in HTTP-only cookies for security
- Eliminates need for server-side session storage

---

## Development Workflow

### Setting Up the Project

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Rangoli-Jwellers
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This reads `package.json` and installs all listed dependencies in `node_modules/`.

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with actual values.

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Starts Next.js development server at http://localhost:3000

5. **Initialize database:**
   Visit http://localhost:3000/api/setup once to create database tables.

### Building for Production

1. **Build the application:**
   ```bash
   npm run build
   ```
   Creates optimized production build in `.next/` directory.

2. **Start production server:**
   ```bash
   npm start
   ```
   Serves the built application.

---

## Project Routes Overview

Based on the directory structure, the application has these main routes:

### Public Routes
- `/` - Homepage with luxury jewellery showcase
- `/catalog` - Product listing page
- `/catalog/[id]` - Individual product detail page
- `/contact` - Contact/consultation booking form
- `/login` - Admin login page
- `/signup` - User registration (if applicable)

### Admin Routes (Protected)
- `/admin` - Admin dashboard
- `/admin/products` - Product management (CRUD operations)
- `/admin/leads` - Lead management and export

### API Routes
- `/api/setup` - Database initialization
- `/api/auth/*` - Authentication endpoints
- `/api/products/*` - Product CRUD operations
- `/api/leads/*` - Lead management
- And other API endpoints for various features

---

## Summary of Part 1

In Part 1, we covered:
1. **Project overview** - A premium jewellery e-commerce website for Rangoli Exclusive
2. **Technology stack** - Modern full-stack with Next.js, TypeScript, PostgreSQL, and various supporting libraries
3. **Project structure** - Organized directory layout separating concerns
4. **Configuration files** - Detailed explanation of package.json, tsconfig.json, next.config.ts, and .env.example
5. **Key concepts** - Understanding the major technologies used
6. **Development workflow** - How to set up and run the project
7. **Route overview** - High-level view of application structure

**Next in Part 2:** Database setup, models, and schema definitions.

---

*This documentation is designed to help you understand every aspect of the Rangoli Jewellers project for technical interviews. Each part builds upon the previous one, providing comprehensive coverage of the entire codebase.*
