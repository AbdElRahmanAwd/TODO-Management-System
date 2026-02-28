# TODO Management System

## Live

|          | URL                                                |
| -------- | -------------------------------------------------- |
| Frontend | https://todo-management-system-sooty.vercel.app/   |
| Backend  | https://todo-management-system-backend.vercel.app/ |

## Environment Variables

Each folder has a `.env.example` — copy it and fill in your values before running:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Setup

Install [pnpm](https://pnpm.io/installation) first, then run in each folder:

```bash
# Backend
cd backend
pnpm i

# Frontend
cd frontend
pnpm i
```

## Run locally

```bash
# Backend
cd backend
pnpm dev

# Frontend
cd frontend
pnpm dev
```

## Tech Stack

**Backend**

- Node.js + Express + TypeScript
- TypeORM + PostgreSQL
- JWT Authentication (bcryptjs + jsonwebtoken)
- Deployed on Vercel

**Frontend**

- React 19 + TypeScript + Vite
- Redux Toolkit
- PrimeReact + Bootstrap
- Deployed on Vercel
