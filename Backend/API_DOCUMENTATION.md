# HelpLift Backend API

The backend is Express + Mongoose. Set `MONGO_URI` in `Backend/.env`, then run `npm start`.

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

## Error format
Errors use `{ "success": false, "message": "...", "details": [...] }` with appropriate HTTP status codes. Duplicate keys are `409`, validation is `400`, authentication is `401`, authorization is `403`, missing records are `404`.
