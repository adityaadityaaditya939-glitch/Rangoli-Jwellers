# Rangoli Jwellers

Premium jewellery website for **Rangoli Jwellers**, Rohru, Himachal Pradesh.

## Tech Stack

- Next.js 15 + TypeScript + Tailwind CSS
- Neon PostgreSQL (via `@neondatabase/serverless`)
- JWT session cookie for admin auth
- CSV/Excel export for consultation leads

## Setup

1. Copy environment variables:

```bash
cp .env.example .env.local
```

2. Fill in `.env.local`:

- `DATABASE_URL` — Neon PostgreSQL connection string
- `JWT_SECRET` — long random secret
- `ADMIN_ID` / `ADMIN_PASSWORD` — staff login credentials
- `WHATSAPP_NUMBER` — e.g. `919876543210` (no + prefix)
- `SHOP_PHONE` — display/call number for the phone FAB

3. Install and run:

```bash
npm install
npm run dev
```

4. Initialize database tables (visit once after configuring Neon):

```
http://localhost:3000/api/setup
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Luxury homepage with all blueprint sections |
| `/catalog` | All jewellery listing |
| `/catalog/[id]` | Product detail + WhatsApp inquire |
| `/contact` | Book a design consultation form |
| `/login` | Staff login |
| `/admin` | Protected dashboard (middleware) |
| `/admin/products` | Add/edit/delete inventory |
| `/admin/leads` | View leads + export CSV/Excel |

## Images

Dummy product and section images live in `public/images/` and will be replaced with real shop photos later.
