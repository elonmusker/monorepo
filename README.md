# Monorepo

A full-stack monorepo managed with [Turborepo](https://turbo.build/), containing four applications and two shared packages.

## Structure

```
monorepo/
├── apps/
│   ├── admin/     # React + Vite admin dashboard
│   ├── web/       # Next.js 15 (App Router) website
│   ├── mobile/    # React Native + Expo mobile app
│   └── api/       # Express.js REST API
└── packages/
    ├── ui/        # Shared React UI components
    ├── db/        # Supabase CRUD operations
    └── tsconfig/  # Shared TypeScript configurations
```

## Apps

| App    | Framework                 | Port | Description                        |
|--------|---------------------------|------|------------------------------------|
| api    | Express.js + TypeScript   | 3001 | REST API backed by Supabase        |
| web    | Next.js 15 (App Router)   | 3000 | Public-facing website              |
| admin  | React + Vite              | 3002 | Admin dashboard                    |
| mobile | React Native + Expo       | —    | iOS/Android mobile application     |

## Packages

| Package    | Description                                      |
|------------|--------------------------------------------------|
| `@repo/ui` | Shared React UI components (Button, Card, Input, Badge) |
| `@repo/db` | Supabase client and repository classes (users, posts) |
| `@repo/tsconfig` | Shared TypeScript configurations         |

## Prerequisites

- Node.js >= 18
- npm >= 9
- A [Supabase](https://supabase.com) project

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the `.env.example` file in each app to `.env.local` and fill in your values:

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
cp apps/admin/.env.example apps/admin/.env
cp apps/mobile/.env.example apps/mobile/.env
```

### 3. Set up Supabase

Create the following tables in your Supabase project:

```sql
-- Users table
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  avatar_url text,
  role text not null default 'user' check (role in ('admin', 'user')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Posts table
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  published boolean not null default false,
  author_id uuid not null references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### 4. Run all apps in development

```bash
npm run dev
```

Or run individual apps:

```bash
# API server
cd apps/api && npm run dev

# Next.js web
cd apps/web && npm run dev

# React admin
cd apps/admin && npm run dev

# Mobile (Expo)
cd apps/mobile && npm run dev
```

## Available Scripts

| Script       | Description                           |
|--------------|---------------------------------------|
| `npm run dev`   | Start all apps in development mode |
| `npm run build` | Build all apps and packages        |
| `npm run lint`  | Lint all apps and packages         |

## API Endpoints

### Users
| Method | Path              | Description          |
|--------|-------------------|----------------------|
| GET    | /api/users        | List all users       |
| GET    | /api/users/:id    | Get user by ID       |
| POST   | /api/users        | Create a user        |
| PATCH  | /api/users/:id    | Update a user        |
| DELETE | /api/users/:id    | Delete a user        |

### Posts
| Method | Path                    | Description          |
|--------|-------------------------|----------------------|
| GET    | /api/posts              | List posts           |
| GET    | /api/posts/:id          | Get post by ID       |
| POST   | /api/posts              | Create a post        |
| PATCH  | /api/posts/:id          | Update a post        |
| POST   | /api/posts/:id/publish  | Publish a post       |
| DELETE | /api/posts/:id          | Delete a post        |