# Forecourt POS

React frontend and NestJS backend for a petrol station point-of-sale system.

## Run locally

Requires Node.js 20+ and npm.

```bash
npm install
npm run dev:backend
npm run dev:frontend
```

Open `http://localhost:5173`.

The backend runs on `http://localhost:3000` and exposes:

- `GET /pos/fuels`
- `POST /pos/sales/quote`

Fuel prices are maintained by the backend in Kenyan shillings:

- Super Petrol: Ksh 214.03/L
- Diesel: Ksh 217.86/L
- Kerosene: Ksh 191.38/L
