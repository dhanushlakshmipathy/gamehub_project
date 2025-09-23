# GameHub (GameHub Project Skeleton)

This archive contains a minimal MERN skeleton for the GameHub project (backend + frontend).

## Quick start - Backend
1. `cd backend`
2. create `.env` from `.env.example` and fill values
3. `npm install`
4. `npm run dev` (or `npm start`)

To seed games (requires RAWG API key in .env):
`npm run seed`

## Quick start - Frontend
This uses parcel for simplicity.
1. `cd frontend`
2. `npm install`
3. `npm start`

Frontend expects backend at `http://localhost:5000`.

**Security note:** Don't commit `.env` containing secrets to public repos.

