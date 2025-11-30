import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  console.log("Middleware token:", token);
  const pathname = req.nextUrl.pathname;
  console.log("Middleware pathname:", pathname);

  // Auth pages (cannot access when logged-in)
  const authPages = [
    "/auth/signin",
    "/auth/signup",
    "/auth/verify",
    "/auth/reset-password",
  ];

  if (authPages.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard/user", req.url));
  }

  // Protected dashboard pages (must be logged-in)
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Admin-only pages
  if (pathname.startsWith("/dashboard/admin") && token?.role  !== "admin") {
    return NextResponse.redirect(new URL("/dashboard/user", req.url));
  }

  return NextResponse.next();
}

// Match all routes where this middleware runs
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
  ],
};
