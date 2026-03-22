# Monorepo

A full-stack TypeScript monorepo managed with [Turborepo](https://turbo.build/) and [pnpm](https://pnpm.io/) workspaces.

## Architecture

### Apps

| App | Framework | Port | Purpose |
|-----|-----------|------|---------|
| `apps/web` | Next.js | 3000 | Public-facing website (SSR, SEO) |
| `apps/admin` | React + Vite | 3001 | Admin dashboard (tables, permissions) |
| `apps/api` | Express | 4000 | Backend API (business logic, webhooks) |
| `apps/mobile` | Expo | — | Mobile app (iOS, Android) |

### Packages

| Package | Purpose |
|---------|---------|
| `packages/database` | Supabase client initialization, schema types, CRUD operations |
| `packages/shared` | Shared types, utilities, constants |
| `packages/ui` | Shared React component library (Button, Card, Input) |
| `packages/tsconfig` | Shared TypeScript configurations |

### Key Principles

- **No cross-app imports**: Apps must never import directly from other apps. All shared code lives in `packages/`.
- **Database-first**: New features start with schema changes in `packages/database`.
- **RLS-aware**: All database operations consider Supabase Row Level Security policies.
- **Platform-safe**: `packages/ui` uses DOM-based React components for web; `apps/mobile` uses React Native components only — no DOM API mixing.
- **TypeScript strict mode** across all packages and apps.

## Getting Started

```bash
# Install dependencies
pnpm install

# Run all apps in development
pnpm dev

# Build all packages and apps
pnpm build

# Lint all packages and apps
pnpm lint
```

## Environment Variables

Copy `.env.example` to `.env` in the root directory and in each app directory, then fill in values:

```
NEXT_PUBLIC_SUPABASE_URL=     # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY=    # Supabase service role key (server-side only)
DATABASE_URL=                 # Direct database connection URL
```