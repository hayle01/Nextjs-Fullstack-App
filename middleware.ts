import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  
  const userRole = (token?.user as any)?.role;

  const emailVerified = (token?.user as any)?.emailVerified; 



  const AUTH_PAGES = [
    "/auth/signin",
    "/auth/signup",
    "/auth/verify",
    "/auth/reset-password",
    "/auth/reset-password/verify",
    "/auth/reset-password/new-password",
  ];
  const DASHBOARD_USER_PATH = "/dashboard/user";

  if (AUTH_PAGES.includes(pathname) && token) {
      
    const isVerified = emailVerified !== null && emailVerified !== undefined;
    
    if (!isVerified && pathname !== "/auth/verify") {
        return NextResponse.redirect(new URL(`/auth/verify?email=${token.email}`, req.url));
    }
    
    if (isVerified) {
      return NextResponse.redirect(new URL(DASHBOARD_USER_PATH, req.url));
    }
  }

  
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    
    if (emailVerified === null && pathname !== "/auth/verify") {
      return NextResponse.redirect(new URL(`/auth/verify?email=${token.email}`, req.url));
    }

    if (pathname.startsWith("/dashboard/admin")) {
        if (userRole !== "admin") {
          return NextResponse.redirect(new URL(DASHBOARD_USER_PATH, req.url));
        }
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/:path*",
  ],
};