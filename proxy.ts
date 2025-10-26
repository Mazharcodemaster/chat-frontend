import { NextResponse, NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  // ✅ Get cookie safely
  const token = request.cookies.get("refresh_token")?.value

  console.log("Token:", token)

  // If no token found, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Otherwise, allow access
  return NextResponse.next()
}

export const config = {
  matcher: "/about/:path*",
}
