"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Home, MessageSquare, Users, Settings, Hash, Plus, ChevronLeft, Bell, LogOut } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/auth/login")
  }

  const channels = [
    { id: 1, name: "general", unread: 3 },
    { id: 2, name: "random", unread: 0 },
    { id: 3, name: "tech-talk", unread: 7 },
    { id: 4, name: "announcements", unread: 1 },
  ]

  const directMessages = [
    { id: 1, name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32", online: true, unread: 2 },
    { id: 2, name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32", online: false, unread: 0 },
    { id: 3, name: "Carol Davis", avatar: "/placeholder.svg?height=32&width=32", online: true, unread: 1 },
  ]

  return (
    <div
      className={cn(
        "bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-16",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {isOpen && <h1 className="font-montserrat font-black text-xl text-sidebar-foreground">ChatHub</h1>}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !isOpen && "rotate-180")} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <Home className="h-4 w-4" />
            {isOpen && <span className="ml-2">Home</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <MessageSquare className="h-4 w-4" />
            {isOpen && <span className="ml-2">Messages</span>}
            {isOpen && (
              <Badge variant="secondary" className="ml-auto">
                5
              </Badge>
            )}
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <Users className="h-4 w-4" />
            {isOpen && <span className="ml-2">People</span>}
          </Button>
          <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
            <Bell className="h-4 w-4" />
            {isOpen && <span className="ml-2">Notifications</span>}
            {isOpen && (
              <Badge variant="secondary" className="ml-auto">
                2
              </Badge>
            )}
          </Button>
        </div>

        {isOpen && (
          <>
            {/* Channels */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Channels</h3>
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
                        <AvatarImage src={dm.avatar || "/placeholder.svg"} />
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
        {user ? (
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} />
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
        ) : (
          <Button
            variant="ghost"
            onClick={() => router.push("/auth/login")}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  )
}
