import { Bell, Home, MessageCircle, Settings, Users } from "lucide-react";

export const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: `/profile`, label: "Profile", icon: Users },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/connections", label: "Connection", icon: Users },
    { href: "/notifications", label: "Notifications", icon: Bell, badge: 2 },
    { href: "/settings", label: "Settings", icon: Settings },
  ]





  export const StatusCodes = {
  // ✅ Success Responses
  OK: 200, // Successful request (GET, PUT, DELETE)
  CREATED: 201, // New resource created (POST, e.g., register user, create post)
  ACCEPTED: 202, // Request accepted but still processing (async tasks, queues)
  NO_CONTENT: 204, // Successful but no data to return (e.g., DELETE success)

  // ⚠️ Client Errors
  BAD_REQUEST: 400, // Invalid request (wrong body, params, query)
  UNAUTHORIZED: 401, // Not logged in / invalid token
  FORBIDDEN: 403, // Logged in but no permission (role-based access)
  NOT_FOUND: 404, // Resource not found (user, post, etc.)
  CONFLICT: 409, // Conflict in state (duplicate email, username, etc.)
  UNPROCESSABLE_ENTITY: 422, // Validation failed (zod, joi errors)

  // ❌ Server Errors
  INTERNAL_SERVER_ERROR: 500, // Unexpected server error (catch block fallback)
  NOT_IMPLEMENTED: 501, // API not implemented yet
  SERVICE_UNAVAILABLE: 503, // Server down or overloaded
  GATEWAY_TIMEOUT: 504, // Server took too long to respond
} as const;