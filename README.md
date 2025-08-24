# Garba Night Backend


Express + Prisma + Neon DB config. Ready to deploy.


### Setup
```bash
git clone <this-repo>
cd garba-night-backend
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run dev
```


Deploy to [Railway](https://railway.app), [Render](https://render.com), or [Vercel functions](https://vercel.com/docs/functions). Use [Neon](https://neon.tech) for free Postgres DB.

