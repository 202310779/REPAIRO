import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Route configurations
const PUBLIC_ROUTES = ["/", "/login", "/api/auth/login", "/api/auth/register"];

const API_ROUTES = ["/api/auth/me", "/api/auth/profile", "/api/repairs"];

const USER_ROUTES = ["/dashboard"];

const TECHNICIAN_ROUTES = ["/technician"];

// Security headers
const SECURITY_HEADERS = {
  "X-DNS-Prefetch-Control": "on",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

/**
 * Verify JWT token using jose library
 * @param {string} token - JWT token to verify
 * @returns {Promise<{userId: string, role: string} | null>} Decoded token payload or null
 */
async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const userId = payload.userId || payload.id || payload.sub;
    const role = payload.role || "user";

    if (!userId) return null;

    return { userId, role };
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return null;
  }
}

/**
 * Check if route matches pattern
 * @param {string} pathname - Current pathname
 * @param {string[]} routes - Array of route patterns
 * @returns {boolean} True if route matches
 */
function matchesRoute(pathname, routes) {
  return routes.some((route) => {
    if (route === pathname) return true;
    if (route.endsWith("*")) {
      return pathname.startsWith(route.slice(0, -1));
    }
    if (pathname.startsWith(route + "/")) return true;
    return false;
  });
}

/**
 * Main middleware function
 * @param {Request} request - Incoming request
 * @returns {Promise<NextResponse>} Response
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    (pathname.includes(".") && !pathname.includes("/api/"))
  ) {
    return NextResponse.next();
  }

  // Clone the response to add headers
  const response = NextResponse.next();

  // Add security headers to all responses
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Allow public routes without authentication
  if (matchesRoute(pathname, PUBLIC_ROUTES)) {
    return response;
  }

  // Extract token from cookie or Authorization header
  let token = request.cookies.get("token")?.value;

  if (!token) {
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  // Development bypass token
  if (token === "dev-token") {
    console.warn("⚠️  Using dev-token bypass - not for production!");
    return response;
  }

  // No token found - redirect to login or return 401 for API routes
  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Unauthorized - No token provided" },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token
  const decoded = await verifyToken(token);

  if (!decoded) {
    // Invalid token - clear cookie and redirect/return error
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.cookies.delete("token");
    return redirectResponse;
  }

  // Add user info to request headers for API routes
  if (pathname.startsWith("/api/")) {
    response.headers.set("X-User-Id", decoded.userId);
    response.headers.set("X-User-Role", decoded.role);
  }

  // Role-based route protection
  const { role } = decoded;

  // Technician routes - only for technicians
  if (matchesRoute(pathname, TECHNICIAN_ROUTES)) {
    if (role !== "technician" && role !== "admin") {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Forbidden - Technician access required" },
          { status: 403 }
        );
      }
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // User routes - redirect technicians to their dashboard
  if (matchesRoute(pathname, USER_ROUTES)) {
    if (role === "technician") {
      return NextResponse.redirect(new URL("/technician", request.url));
    }
  }

  // Prevent authenticated users from accessing login page
  if (pathname === "/login") {
    const dashboardUrl =
      role === "technician"
        ? new URL("/technician", request.url)
        : new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
