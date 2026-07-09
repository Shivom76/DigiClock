<<<<<<< HEAD
# DigiClock
A digital clock as a web app that includes a digital clock and a stopwatch in which a session can be stored, through a database.
=======
# Chronolog — Digital Clock & Stopwatch

Implementation of the project described in Chapter 4: a React/Tailwind
frontend, an Express/Mongoose backend, and MongoDB for session storage.

## Folder structure

```
client/
  src/
    components/   Clock.jsx, Stopwatch.jsx, SessionCard.jsx, Navbar.jsx
    pages/         Dashboard.jsx, Login.jsx
    services/      api.js (Axios client)
server/
  controllers/    sessionController.js (CRUD logic)
  routes/         sessionRoutes.js
  models/         Session.js (Mongoose schema)
  middleware/     errorHandler.js
  config/         db.js (MongoDB connection)
  index.js        app entry point
```

## Running it

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # edit MONGO_URI if needed
npm run dev             # or: npm start
```

Requires a MongoDB instance reachable at `MONGO_URI` (local `mongod`, or a
free Atlas cluster). The API listens on `http://localhost:5000`.

### 2. Frontend

```bash
cd client
npm install
npm run dev
```

Opens at `http://localhost:5173`. It talks to the API at
`http://localhost:5000/api` by default — override with a `VITE_API_URL`
env var if your backend runs elsewhere.

## How it maps to the spec

- **4.1 Modules** — one file per module: `Clock.jsx` (digital clock),
  `Stopwatch.jsx` (start/pause/reset/lap), `sessionController.js` +
  `Session.js` (session management), the `client/` tree (UI), and
  `server/` (backend API).
- **4.2 Algorithms** — the clock uses `Date()` + `setInterval()`; the
  stopwatch uses `setInterval()`/`clearInterval()` driven off
  `performance.now()` so pausing/resuming stays accurate; CRUD is handled
  by Express routes calling Mongoose methods.
- **4.3 Database design** — `Session.js` defines `duration`, `laps`,
  `notes`, and `recordedAt`, plus Mongo's own `_id` as the session ID.
- **4.4 Implementation details** — React + Tailwind on the frontend,
  Node/Express + Mongoose on the backend, Axios for HTTP, and
  `useState`/`useEffect`/`useRef` for state and real-time updates.

## Notes

- `Login.jsx` is a lightweight "operator name" gate stored in
  `localStorage` — the spec doesn't define a User model or auth
  endpoints, so this isn't real authentication. Swap in a proper
  `/api/auth` route + `User` schema if you need real login.
- Lap times store both the cumulative `lapTime` and the `splitTime`
  since the previous lap, so the UI can show both without recomputing.
>>>>>>> 3f5b1b4 (Submitting all files)
