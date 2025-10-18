"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, UserPlus, Share2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Notification {
  id: number
  type: "like" | "comment" | "follow" | "share"
  user: {
    name: string
    avatar: string
  }
  action: string
  timestamp: string
  read: boolean
}

export default function NotificationsPage() {
  const router = useRouter()

 
  const notifications: Notification[] = [
    {
      id: 1,
      type: "like",
      user: { name: "Alice Johnson", avatar: "/alice-portrait.png" },
      action: "liked your post",
      timestamp: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "comment",
      user: { name: "Bob Smith", avatar: "/thoughtful-man-in-park.png" },
      action: "commented on your post",
      timestamp: "15 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "follow",
      user: { name: "Carol Davis", avatar: "/carol-portrait.png" },
      action: "started following you",
      timestamp: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "like",
      user: { name: "David Chen", avatar: "/david-statue.png" },
      action: "liked your post",
      timestamp: "3 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "share",
      user: { name: "Emma Wilson", avatar: "/emma-portrait.png" },
      action: "shared your post",
      timestamp: "5 hours ago",
      read: true,
    },
  ]

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-5 w-5 text-rose-500" />
      case "comment":
        return <MessageCircle className="h-5 w-5 text-cyan-500" />
      case "follow":
        return <UserPlus className="h-5 w-5 text-cyan-500" />
      case "share":
        return <Share2 className="h-5 w-5 text-cyan-500" />
      default:
        return null
    }
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1">Stay updated with your activity</p>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                className={cn(
                  "p-4 transition-colors",
                  !notification.read ? "bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-900" : "",
                )}
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {notification.user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type)}
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">{notification.user.name}</span>
                        <span className="text-muted-foreground"> {notification.action}</span>
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                  </div>

                  <Button variant="ghost" size="sm" className="flex-shrink-0 text-muted-foreground hover:text-rose-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No notifications yet</p>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

import { cn } from "@/lib/utils"
