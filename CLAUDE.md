# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

REST API for NexusAdmin - a pricing engine and administrative system that calculates furniture quotes based on customer-supplied dimensions and a bill of materials defined per product.

## Commands

**Start dev server** (hot-reload via ts-node-dev):
```bash
npm run devStart
```

**Start MongoDB** (required before running the API):
```bash
sudo docker-compose up -d
```

**Create first admin user** (run once after DB is up and `.env` is configured):
```bash
npx ts-node scripts/create_admin.ts
```

There is no build, lint, or test script configured.

## Environment Variables

Copy `.env.example` to `.env`. Required variables:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | MongoDB connection string (e.g. `mongodb://root:examplepassword@localhost:27017/landing-page?authSource=admin`) |
| `JWT_SECRET` | Secret for signing JWT tokens |
| `PORT` | Server port (default 3001) |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Required for product photo upload; routes that call `upload.array()` will fail without these |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Used only by the admin creation script |

CORS allows only `http://localhost:12000` and `http://localhost:12001` (hardcoded in [app.ts](app.ts)).

## Architecture

**Entry point flow:** `server.ts` loads dotenv, connects Mongoose, starts Express using the app exported from `app.ts`.

**Request flow:** `app.ts` → `routes/` → `controllers/` → `models/` or `services/`

### Routes & access control

| Prefix | File | Auth required |
|---|---|---|
| `/api/auth` | [routes/auth_routes.ts](routes/auth_routes.ts) | Only `PATCH /updatepsw/:id` |
| `/api/products` | [routes/product_routes.ts](routes/product_routes.ts) | Only write operations and `POST /quote/:id` is public |
| `/api/materials` | [routes/material_routes.ts](routes/material_routes.ts) | All routes (router-level middleware) |

All routers apply `rate_limiter` (100 req / 15 min). The login route adds an extra stricter limiter (5 req / 50 sec).

### Pricing engine

[services/pricing_service.ts](services/pricing_service.ts) is the core domain logic. A product stores a `components` array, where each component references a `Material` and defines how its quantity is computed:

- `fixed` — constant quantity regardless of dimensions
- `area_based` — quantity × (height × width in m²)
- `perimeter_based` — quantity × (2 × (height + width) in metres)

Each component's raw consumption is multiplied by `material.wasteFactor` (default 1.10). Final price = `(totalMaterialCost + baseLaborCost) × (1 + profitMargin / 100)`.

### Error handling pattern

Throw `new app_error_class(message, statusCode)` from any controller or service. The global `error_handling_middleware` in [middlewares/error_handling_middleware.ts](middlewares/error_handling_middleware.ts) catches it and returns a JSON response. Never call `res.status(...).json(...)` directly for errors — always use `next(new app_error_class(...))`.

### Validation pattern

Every controller validates with `zod.safeParse()` before touching the database. Zod schemas are defined at the top of each controller file. Use `.flatten()` on `ZodError` to extract `fieldErrors` for the response body.

### Authentication

[middlewares/auth_middleware.ts](middlewares/auth_middleware.ts) extracts the Bearer token from `Authorization` header, verifies it with `JWT_SECRET`, and attaches `req.userId`. The `AuthRequest` interface extends `Request` to expose `userId`.

### Image upload

[controllers/config/multer.ts](controllers/config/multer.ts) configures Multer with `CloudinaryStorage`. Uploaded files are stored in Cloudinary folder `nexus-admin-produtos`. The `file.path` returned by Cloudinary is the public URL stored in `product.photos`.

### Models

- **User** ([models/user_schema.ts](models/user_schema.ts)) — `pre('save')` hook hashes password with bcrypt (salt 10). No role field; authorization is all-or-nothing via JWT presence.
- **Material** ([models/material_schema.ts](models/material_schema.ts)) — `category` and `unit` are enum-constrained. `wasteFactor` defaults to 1.10.
- **Product** ([models/product_schema.ts](models/product_schema.ts)) — embeds `constraints` (min/max height/width/depth in mm) and `components` (sub-documents without `_id`, referencing Material by ObjectId).

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at [specs/002-admin-panel-jwt/plan.md](specs/002-admin-panel-jwt/plan.md)
<!-- SPECKIT END -->
