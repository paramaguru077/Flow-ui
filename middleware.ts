import { NextResponse, NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/customer", "/products", "/brands", "/orders"];

export function middleware(req: NextRequest) {
  const sessionCookie = getSessionCookie(req);
  const { pathname } = req.nextUrl;

  if (sessionCookie) {
    // If already logged in, prevent access to sign-in/sign-up
    if (pathname === "/sign-in" || pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/customer", req.url));
    }
  } else {
    // If not logged in, block access to protected routes
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/customer/:path*",
    "/products/:path*",
    "/brands/:path*",
    "/orders/:path*",
  ],
};
