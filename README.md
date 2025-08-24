# Navrang Garba APIs (Express + Prisma + Razorpay UPI)

Minimal BookMyShow-style flow without auth & seat selection.

## Features
- Events and per-day inventory (capacity + availableTickets)
- Create booking → generate Razorpay Order (UPI-ready)
- Webhook verifies signature, marks payment SUCCESS, decrements tickets atomically & confirms booking
- Health check & simple validation

## Quick Start
```bash
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

### Test
- `GET /health`
- `GET /events`
- `GET /events/:id/days`
- `POST /bookings`
```json
{
"name": "Ishan",
"email": "ishan@example.com",
"phone": "+919876543210",
"eventDayId": 1,
"tickets": 2
}
```
→ returns `{ bookingId, razorpayOrder }` for frontend checkout.


- Set Razorpay webhook to `POST /payments/razorpay/webhook`.


## Notes
- Amounts are in **paise** to avoid float errors.
- Inventory is decremented **only on successful payment** via atomic SQL update.
- Add email sending (src/utils/email.js) & QR ticketing later if needed.
```
---


## .gitignore
```
node_modules
.env
.env.local
.prisma
