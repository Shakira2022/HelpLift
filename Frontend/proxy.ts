import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME, type UserRole } from "@/lib/session";

// Where each role lands after login / when redirected away from a page
// they don't have access to.
const ROLE_HOME: Record<UserRole, string> = {
  giver: "/givers-dashboard",
  organization: "/organisation-dashboard",
  admin: "/admin-dashboard",
};

// Routes that require a signed-in session. `roles` restricts a route to
// specific roles — omit it for routes any logged-in user can reach
// (e.g. /profile).
const PROTECTED_ROUTES: { prefix: string; roles?: UserRole[] }[] = [
  { prefix: "/givers-dashboard", roles: ["giver"] },
  { prefix: "/organisation-dashboard", roles: ["organization"] },
  { prefix: "/admin-dashboard", roles: ["admin"] },
  { prefix: "/profile" },
];

// Routes a signed-in user shouldn't see again — send them to their
// dashboard instead of showing the login/register form.
const AUTH_ROUTES = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  const matchedProtectedRoute = PROTECTED_ROUTES.find((route) =>
    pathname.startsWith(route.prefix)
  );

  if (matchedProtectedRoute) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const allowedRoles = matchedProtectedRoute.roles;
    if (allowedRoles && !allowedRoles.includes(session.role)) {
      // Logged in, but the wrong role for this route (e.g. a giver
      // hitting /admin-dashboard directly) — bounce to their own home
      // rather than showing a generic 403.
      return NextResponse.redirect(new URL(ROLE_HOME[session.role], request.url));
    }
  }

  if (session && AUTH_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL(ROLE_HOME[session.role], request.url));
  }

  return NextResponse.next();
}

// Only run middleware where it can actually change the outcome — this
// keeps every other request (marketing pages, static assets, etc.)
// on the fast path with zero overhead.
export const config = {
  matcher: [
    "/givers-dashboard/:path*",
    "/organisation-dashboard/:path*",
    "/admin-dashboard/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
