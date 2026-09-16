# HelpLift - Backend Setup

The existing HelpLift UI/layout has been preserved. The added work is backend/API/session/database logic plus wiring for the existing actions.

## 1. Add MongoDB

Create `Backend/.env` from `Backend/.env.example` and replace only the MongoDB value with your own MongoDB Atlas/local MongoDB connection string:

```env
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/helplift?retryWrites=true&w=majority
JWT_SECRET=dev-jwt-secret-change-me
PORT=5000
FRONTEND_URL=http://localhost:3000
```

For local development the JWT/session fallback values will run, but replace them before deployment.

## 2. Install and run backend

```powershell
cd Backend
npm install
npm start
```

Health check: `http://localhost:5000/health`

## 3. Install and run frontend

Open a second terminal:

```powershell
cd Frontend
copy .env.local.example .env.local
npm install
npm run dev
```

Frontend: `http://localhost:3000`

## 4. First admin account

If your MongoDB does not already contain an admin, create one once:

```powershell
cd Backend
npm run create-admin -- admin@example.com StrongPassword123! "HelpLift Admin"
```

Then use `/admin-login`.

## Registration note

The existing registration GUI did not contain a password field and was intentionally not redesigned. To preserve that GUI, the backend generates a strong temporary password when registering from the current form. The browser displays it once after successful registration. The account can then sign in with that temporary password.

## What is now persisted

MongoDB models/routes now cover users, giver profiles, organizations, needs, interests, contributions/donations, gift offerings, messages, notifications, categories, support tickets, sessions, and activity/audit logs.

Role checks and validation are enforced server-side. Giver, organization, and admin actions are routed through the backend rather than relying only on local mock state.
