<!--
SYNC IMPACT REPORT
==================
Version change: [TEMPLATE] → 1.0.0 (initial ratification — all placeholders filled)

Modified principles: N/A (first-time fill, no prior version)

Added sections:
  - Core Principles (5 principles defined)
  - Technology Stack
  - Development Workflow
  - Governance

Removed sections: N/A

Templates requiring updates:
  ✅ .specify/templates/plan-template.md — Constitution Check gate structure is compatible
  ✅ .specify/templates/spec-template.md — No principle-driven mandatory sections added
  ✅ .specify/templates/tasks-template.md — Phase/task structure aligned with principles
  ✅ No commands directory found — skipped

Follow-up TODOs:
  None — all placeholders resolved from codebase context.
-->

# NexusAdmin API Constitution

## Core Principles

### I. Fail-Fast Error Handling

All errors MUST propagate via `app_error_class` and be caught by the global
`error_handling_middleware` in `middlewares/error_handling_middleware.ts`.
Controllers and services MUST NOT call `res.status(...).json(...)` directly
for error responses. Every error path MUST use `next(new app_error_class(message, statusCode))`.
Bypassing this pipeline makes error behaviour unpredictable and breaks
client contracts.

### II. Validate at the Boundary

Every controller MUST validate incoming request data with `zod.safeParse()`
before any database or service interaction. Zod schemas MUST be defined at
the top of the controller file they serve. `ZodError` results MUST be
flattened with `.flatten()` to extract `fieldErrors` for the response body.
No raw or unvalidated data may reach the service or model layer.

### III. Pricing Engine Isolation

`services/pricing_service.ts` is the single authoritative source for all
quote calculations. The three quantity modes (fixed, area_based,
perimeter_based), waste factor multiplication (`material.wasteFactor`,
default 1.10), and the final price formula
`(totalMaterialCost + baseLaborCost) × (1 + profitMargin / 100)` MUST NOT
be replicated in controllers, models, or routes. Any change to pricing logic
MUST go through the service layer only.

### IV. Auth as Gate, Not Role

Authentication is all-or-nothing via JWT presence. Protected routes MUST use
`auth_middleware.ts`, which verifies the Bearer token with `JWT_SECRET` and
attaches `req.userId` via the `AuthRequest` interface. Authorization MUST NOT
introduce role-based checks without a documented governance amendment and a
migration plan for existing protected routes.

### V. Rate Limiting on All Routes

Every router MUST apply the base `rate_limiter` (100 req / 15 min). The login
route MUST additionally apply the stricter limiter (5 req / 50 sec). No route
may be added or modified to bypass rate limiting. CORS MUST remain restricted
to explicitly configured origins (currently `http://localhost:12000` and
`http://localhost:12001`).

## Technology Stack

- **Runtime**: Node.js v18+, TypeScript
- **Framework**: Express.js
- **Database**: MongoDB via Mongoose (Docker-managed in development)
- **Auth**: JWT (`jsonwebtoken`) signed with `JWT_SECRET`
- **Validation**: Zod (`safeParse` + `.flatten()`)
- **Image Storage**: Cloudinary via Multer + `CloudinaryStorage`
- **Password Hashing**: bcrypt, salt 10, applied in `pre('save')` hook on User model
- **Rate Limiting**: `express-rate-limit`
- No build, lint, or automated test scripts are configured. TypeScript compiler
  (`tsc`) is the primary correctness gate.

## Development Workflow

- MongoDB MUST be running before starting the API:
  `sudo docker-compose up -d`
- Dev server (hot-reload via ts-node-dev):
  `npm run devStart`
- First admin user (run once after DB is up and `.env` is configured):
  `npx ts-node scripts/create_admin.ts`
- Environment variables MUST be set in `.env` (copy from `.env.example`).
  The API will not start without `DATABASE_URL`, `JWT_SECRET`, and `PORT`.
  Cloudinary variables are required for any route that calls `upload.array()`.
- CORS is hardcoded in `app.ts`; origin changes MUST be made there explicitly.

## Governance

This constitution supersedes all informal conventions and implicit practices.
Amendments MUST include:

1. A description of which principle is changing and the motivation.
2. A migration note for any existing code affected.
3. A version increment following semantic versioning:
   - **MAJOR**: Backward-incompatible principle removal or redefinition.
   - **MINOR**: New principle or section added, or materially expanded guidance.
   - **PATCH**: Clarifications, wording fixes, non-semantic refinements.

All PRs MUST verify compliance with the Core Principles before merge.
Complexity not justified by a constitution principle MUST either be rejected
or documented under the Complexity Tracking table in the feature plan.
The `CLAUDE.md` file at the repository root is the runtime development
guidance reference; it MUST stay consistent with this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-04-25 | **Last Amended**: 2026-04-25
