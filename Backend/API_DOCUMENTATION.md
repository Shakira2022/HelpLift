# HelpLift Backend API

The backend is Express + Mongoose. Set `MONGO_URI` in `Backend/.env`, then run `npm start`.

## Database
MongoDB (via Mongoose), hosted on MongoDB Atlas (shared cluster: `Cluster0`, database: `helplift`).

## Authentication
- `POST /api/users/register` — giver/organization registration. If no password is supplied, the API returns a one-time generated `temporaryPassword`.
- `POST /api/users/verify` — verify an email token.
- `POST /api/users/login` — returns JWT access token and records a device session.
- `POST /api/users/logout` — revoke current session.
- `POST /api/users/forgot-password` — issue a reset token (development transport; connect an email provider for production delivery).
- `POST /api/users/reset-password` — reset using token.
- `POST /api/users/change-password` — authenticated password change.
- `GET/PUT /api/users/me` — read/update authenticated profile, role profile, settings and preferences.
- `POST /api/users/sessions/revoke` — revoke one or all other sessions.

Example authenticated request:
```
PUT /api/givers/64f2a1b3c9d8e7f6a5b4c3d2
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

Token is returned from `/api/users/login` or `/api/users/register`.

All `/api/platform/*` routes require `Authorization: Bearer <token>`.

## Giver operations
- `GET /api/platform/needs`
- `POST /api/platform/needs/:id/save`
- `GET/POST /api/platform/interests`
- `GET/POST /api/platform/contributions`
- `GET/POST/PUT /api/platform/gift-offerings`
- `GET/POST /api/platform/messages`
- `GET /api/platform/notifications`
- `POST /api/platform/notifications/:id/read`
- `POST /api/platform/notifications/read-all`

## Organization operations
- `GET/POST/PUT/DELETE /api/platform/needs`
- `GET /api/platform/interests`
- `PUT /api/platform/interests/:id/status`
- `GET /api/platform/contributions`
- `PUT /api/platform/contributions/:id/status`
- `GET /api/platform/gift-offerings`
- `POST /api/platform/gift-offerings/:id/match`
- messaging, notifications, profile/settings and support tickets as above.

## Admin operations
- `GET /api/platform/admin/users`
- `PUT /api/platform/admin/users/:id/status`
- `GET /api/platform/admin/organizations`
- `POST /api/platform/admin/organizations/:id/approval`
- `POST /api/platform/needs/:id/approval`
- `POST /api/platform/gift-offerings/:id/approval`
- `GET/POST/PUT/DELETE /api/platform/categories`
- `GET/PUT /api/platform/tickets`
- `GET /api/platform/admin/activity`

## Unified dashboard
`GET /api/platform/dashboard` returns role-specific, MongoDB-backed dashboard data for giver, organization, or admin.

## Auth route reference

### Register
`POST /api/users/register`

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "admin | giver | organization"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "user": { "id": "...", "name": "...", "email": "...", "role": "..." }
}
```

### Login
`POST /api/users/login`

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": { "id": "...", "name": "...", "email": "...", "role": "..." }
}
```

---

## Organization Routes

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|--------------|
| POST | /api/organizations | No (public register) | Create organization |
| GET | /api/organizations | No | List all organizations |
| GET | /api/organizations/:id | No | Get one organization |
| PUT | /api/organizations/:id | Yes | Update organization |
| DELETE | /api/organizations/:id | Yes (admin) | Delete organization |

**Organization object:**
```json
{
  "name": "string",
  "type": "string",
  "description": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "isVerified": false
}
```

---

## Giver Routes

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|--------------|
| POST | /api/givers | No | Create giver |
| GET | /api/givers | No | List all givers |
| GET | /api/givers/:id | No | Get one giver |
| PUT | /api/givers/:id | Yes | Update giver |
| DELETE | /api/givers/:id | Yes (admin) | Delete giver |

**Giver object:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "type": "Individual | Business"
}
```

---

## Error format
Errors use `{ "success": false, "message": "...", "details": [...] }` with appropriate HTTP status codes. Duplicate keys are `409`, validation is `400`, authentication is `401`, authorization is `403`, missing records are `404`.

---

## Environment Variables

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?appName=Cluster0
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Note:** `.env` is git-ignored and never committed. Ask a teammate for the shared `MONGO_URI` and `JWT_SECRET` values rather than creating a separate database user unless instructed.