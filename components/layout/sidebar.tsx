"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Users,
  Settings,
  Hash,
  Plus,
  ChevronLeft,
  Bell,
  LogOut,
  FileText,
  MessageCircle,
} from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

// ✅ Static user data
const user = {
  firstName: "John",
  lastName: "Doe",
  avatar: "/placeholder.svg?height=32&width=32",
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  // ✅ Dummy logout for now
  const handleLogout = () => {
    console.log("User logged out")
    router.push("/auth/login")
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: `/profile/${user.firstName.toLowerCase()}`, label: "Profile", icon: Users },
    { href: "/chat", label: "Chat", icon: MessageCircle },
    { href: "/connections", label: "Connection", icon: Users },
    { href: "/notifications", label: "Notifications", icon: Bell, badge: 2 },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  const channels = [
    { id: 1, name: "general", unread: 3 },
    { id: 2, name: "random", unread: 0 },
    { id: 3, name: "tech-talk", unread: 7 },
    { id: 4, name: "announcements", unread: 1 },
  ]

  const directMessages = [
    { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg", online: true, unread: 2 },
    { id: 2, name: "Bob Smith", avatar: "/placeholder.svg", online: false, unread: 0 },
    { id: 3, name: "Carol Davis", avatar: "/placeholder.svg", online: true, unread: 1 },
  ]

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {isOpen && (
            <h1 className="font-montserrat font-black text-xl text-sidebar-foreground">
              ChatHub
            </h1>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                !isOpen && "rotate-180"
              )}
            />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1 mb-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent",
                    isActive && "bg-sidebar-accent"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {isOpen && <span className="ml-2">{item.label}</span>}
                  {isOpen && item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            )
          })}
        </div>

        {isOpen && (
          <>
            {/* Channels */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Channels
                </h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-1">
                {channels.map((channel) => (
                  <Button
                    key={channel.id}
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <Hash className="h-4 w-4" />
                    <span className="ml-2">{channel.name}</span>
                    {channel.unread > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {channel.unread}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Direct Messages */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Direct Messages
                </h3>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-1">
                {directMessages.map((dm) => (
                  <Button
                    key={dm.id}
                    variant="ghost"
                    className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <div className="relative">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={dm.avatar} />
                        <AvatarFallback>
                          {dm.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {dm.online && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-sidebar rounded-full" />
                      )}
                    </div>
                    <span className="ml-2 truncate">{dm.name}</span>
                    {dm.unread > 0 && (
                      <Badge variant="secondary" className="ml-auto">
                        {dm.unread}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* User Profile */}
      <div className="p-2 border-t border-sidebar-border">
        <div className="space-y-2">
          <Link href={`/profile/${user.firstName.toLowerCase()}`}>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.firstName[0]}
                  {user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              {isOpen && (
                <div className="ml-2 flex-1 text-left">
                  <div className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="text-xs text-muted-foreground">Online</div>
                </div>
              )}
              {isOpen && <Settings className="h-4 w-4 ml-auto" />}
            </Button>
          </Link>

          {isOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
