import { NextResponse, NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  // ✅ Get cookie safely
  const token = request.cookies.get("refresh_token")?.value

  
  // If no token found, redirect to login
  if (!token) {
    console.log("No refresh_token found", request.url)
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Otherwise, allow access
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/about/:path*",
    "/chat/:path*",
    "/connections/:path*",
    "/notifications/:path*",
    "/profile/:path*",
    "/settings/:path*"],
}
