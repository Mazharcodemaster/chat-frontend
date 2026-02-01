import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const isAuthRoute = req.nextUrl.pathname.startsWith("/auth");

  if (!refreshToken && !isAuthRoute) {
    return NextResponse.redirect(
      new URL("/auth/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat/:path*",
    "/profile/:path*",
    "/connections/:path*",
    "/notifications/:path*",
    "/settings/:path*",
  ],
};
