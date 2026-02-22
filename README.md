# User Management

## Introduction

This repository contains a User Management application built with Nuxt (TypeScript) and Prisma. It includes authentication, role-based access control, and admin pages to manage users. The project uses Nitro for server routes and Prisma for database access.

## Project Structure

- `app/` — Nuxt app sources: `components`, `pages`, `layouts`, `middleware`, and assets.
- `server/` — API endpoints and server utilities (authentication, Prisma client).
- `prisma/` — Prisma schema (`schema.prisma`), seed script, and migrations.
- `public/` — Static assets.
- `.nuxt/` — Generated Nuxt build artifacts (do not commit changes here).
- `docker-compose.yaml`, `Dockerfile` — Container configuration for local or production deployments.
- `package.json`, `package-lock.json` — Node project configuration and lockfile.

## Requirements

- Node.js 18+ (recommended)
- npm (preferred)
- PostgreSQL (or another DB supported by Prisma) running and accessible via `DATABASE_URL`
- Docker (optional)

## Environment variables

Create a `.env` file at the project root by copying `.env example` and update the values:

- `DATABASE_URL` — e.g. `postgresql://user:password@localhost:5432/dbname`
- `NODE_ENV` — `development` or `production`
- `SECRET` (or other auth secrets) — used by the application for signing tokens

Never commit real secrets to the repository.

## Installation

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npx prisma generate
```

3. Apply migrations (development):

```bash
npx prisma migrate dev
```

Or deploy migrations for a production database:

```bash
npx prisma migrate deploy
```

4. Seed the database (if needed):

```bash
npx prisma db seed
```

## Running the application

Development:

```bash
npm run dev
```

This starts Nuxt in development mode (hot-reload). The frontend and server routes are served by Nitro.

Production (build and run):

```bash
npm run build
npm run preview
```

## Docker (optional)

Start using Docker Compose (ensure `.env` is configured):

```bash
docker compose up --build
```

## Prisma and Database

- Schema: `prisma/schema.prisma`
- Migrations: `prisma/migrations/`
- Seed script: `prisma/seed.ts`

Use `npx prisma studio` to inspect data locally:

```bash
npx prisma studio
```

## API Endpoints

User management endpoints use `/api/users` with separated CRUD files:

- `GET /api/users` — list users with role-based visibility
	- `SUPERADMIN` sees: `SUPERADMIN`, `MANAGER`, `PEGAWAI`
	- `MANAGER` sees: `MANAGER`, `PEGAWAI`
	- `PEGAWAI` sees: `PEGAWAI`
- `POST /api/users` — create user (superadmin only)
- `PUT /api/users/:id` — update user (superadmin only)
- `DELETE /api/users/:id` — delete user (superadmin only)

## Useful commands

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview built app
- `npx prisma generate` — Generate Prisma client
- `npx prisma migrate dev` — Create/apply migrations locally
- `npx prisma db seed` — Run seed script

## Troubleshooting

- If migrations fail, verify `DATABASE_URL` and the DB is reachable.
- After changing the Prisma schema, run `npx prisma generate`.
- Check server logs for Nitro endpoints under `server/` when API calls fail.

