# HelpLift Backend API Documentation

## Base URL
http://localhost:5000/api

## Authentication
Protected routes require a JWT in the request header:

PUT /api/givers/64f2a1b3c9d8e7f6a5b4c3d2
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json


Token is returned from `/auth/login` or `/auth/register`.

---

## Auth Routes

### Register
`POST /auth/register`

**Body:**
```json
{
  "role": "organization | giver | admin",
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response (201):**
```json
{
  "token": "jwt_token_here",
  "user": { "id": "...", "email": "...", "role": "..." }
}
```

### Login
`POST /auth/login`

**Body:**
```json
{
  "email": "string",
  "password": "string",
  "role": "organization | giver | admin"
}
```

**Response (200):** same shape as register.

---

## Organization Routes

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|--------------|
| POST | /organizations | No (public register) | Create organization |
| GET | /organizations | No | List all organizations |
| GET | /organizations/:id | No | Get one organization |
| PUT | /organizations/:id | Yes | Update organization |
| DELETE | /organizations/:id | Yes (admin) | Delete organization |

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
| POST | /givers | No | Create giver |
| GET | /givers | No | List all givers |
| GET | /givers/:id | No | Get one giver |
| PUT | /givers/:id | Yes | Update giver |
| DELETE | /givers/:id | Yes (admin) | Delete giver |

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

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000