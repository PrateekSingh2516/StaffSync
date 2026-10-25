# StaffSync

## Local development

Requirements: Node.js, npm, and a reachable MongoDB database (local MongoDB or
MongoDB Atlas).

1. Create `Server/.env` from `Server/.env.example`. Set `MONGO_URI` and replace
   `JWT_SECRET` with a long, random value. Never commit `.env`.
2. In one terminal, start the API:

   ```sh
   cd Server
   npm install
   npm run dev
   ```

   The API waits for MongoDB before listening on `PORT` (5000 by default).
   `GET /health` returns HTTP 200 only when the database is connected.
3. In another terminal, copy `Client/.env.example` to `Client/.env` and set
   `VITE_API_URL` to the API origin. The current server configuration uses port
   8000; use `http://localhost:8000` for that setup. Then start the frontend:

   ```sh
   cd Client
   npm install
   npm run dev
   ```

   The example uses `http://localhost:5000`, matching the server's default
   when `PORT` is not set. Use the origin only (no `/api` suffix), then restart
   Vite after changing it.

## Validation

From `Client/`, run `npm run build` and `npm run lint`. From `Server/`, run
`node --check index.js` and `node --check config/db.js`. For an integration
check, start the server and request `http://localhost:5000/health`.

## Deployment

- Configure the server's `MONGO_URI`, a unique strong `JWT_SECRET`, `PORT`
  (provided by many hosts), and `CLIENT_ORIGIN` in the host's secret/environment
  settings. `CLIENT_ORIGIN` is a comma-separated list of allowed frontend
  origins. Do not deploy development secrets or commit `.env` files.
- Configure `VITE_API_URL` to the deployed API origin before building the
  frontend. Vite embeds this value into the build, so rebuild after changing it.
- Deploy the `Client/dist` output to a static host and configure SPA fallback
  routing to `index.html`. Deploy `Server/` as a Node.js service with
  `npm install` and `npm start`; expose `/health` as its readiness check.
- For MongoDB Atlas, ensure the database user and network access rules permit
  connections from the server host.
