# HelpLift Backend API Documentation

## Base URL
http://localhost:5000/api

## Database
MongoDB (via Mongoose), hosted on MongoDB Atlas (shared cluster: `Cluster0`, database: `helplift`).

## Authentication
Protected routes require a JWT in the request header:

```
PUT /api/givers/64f2a1b3c9d8e7f6a5b4c3d2
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

Token is returned from `/api/users/login` or `/api/users/register`.

---

## Auth Routes

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

## Error Responses

All errors follow this shape:
```json
{ "message": "Description of what went wrong" }
```

| Status | Meaning |
|--------|---------|
| 400 | Bad request / validation error |
| 401 | Missing or invalid token |
| 403 | Authenticated but not authorized (wrong role) |
| 404 | Resource not found |
| 500 | Server error |

---

## Environment Variables

```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?appName=Cluster0
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Note:** `.env` is git-ignored and never committed. Ask a teammate for the shared `MONGO_URI` and `JWT_SECRET` values rather than creating a separate database user unless instructed.