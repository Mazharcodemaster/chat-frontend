import { Bell, Home, MessageCircle, Settings, Users } from "lucide-react";

export const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: `/profile`, label: "Profile", icon: Users },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/connections", label: "Connection", icon: Users },
    { href: "/notifications", label: "Notifications", icon: Bell, badge: 2 },
    { href: "/settings", label: "Settings", icon: Settings },
  ]