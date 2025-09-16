import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes that require authentication
const protectedRoutes = ["/profile", "/courses", "/dashboard"];

// Define auth routes that should redirect to home if user is already logged in
const authRoutes = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const firebaseToken =
    request.cookies.get("__session")?.value ||
    request.cookies.get("firebase-auth-token")?.value ||
    request.cookies.get("auth-token")?.value;

  // For client-side Firebase auth, we can't reliably check auth state in middleware
  // So we'll let the client-side handle redirects for now
  // This middleware will mainly handle the auth routes to prevent logged-in users from accessing them

  // Handle auth routes (login/register) - redirect if already has any auth indicators
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    // Check for any potential auth indicators in cookies
    const hasAuthCookie =
      request.cookies.has("__session") ||
      request.cookies.has("firebase-auth-token") ||
      request.cookies.has("auth-token");

    if (hasAuthCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // For protected routes, we'll let the client-side AuthGuard handle the redirect
  // since Firebase auth state is not easily accessible in middleware
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
