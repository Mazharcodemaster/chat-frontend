"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Bell, Mail, MessageSquare, Users, Heart } from "lucide-react"

export function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      messages: true,
      mentions: true,
      follows: false,
      likes: false,
      comments: true,
    },
    push: {
      messages: true,
      mentions: true,
      follows: true,
      likes: false,
      comments: true,
    },
    inApp: {
      messages: true,
      mentions: true,
      follows: true,
      likes: true,
      comments: true,
    },
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleToggle = (category: keyof typeof notifications, setting: string) => {
    setNotifications((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting as keyof (typeof prev)[typeof category]],
      },
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Settings saved",
        description: "Your notification preferences have been updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const NotificationSection = ({
    title,
    description,
    icon,
    category,
  }: {
    title: string
    description: string
    icon: React.ReactNode
    category: keyof typeof notifications
  }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor={`${category}-messages`}>Direct Messages</Label>
          </div>
          <Switch
            id={`${category}-messages`}
            checked={notifications[category].messages}
            onCheckedChange={() => handleToggle(category, "messages")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor={`${category}-mentions`}>Mentions</Label>
          </div>
          <Switch
            id={`${category}-mentions`}
            checked={notifications[category].mentions}
            onCheckedChange={() => handleToggle(category, "mentions")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor={`${category}-follows`}>New Followers</Label>
          </div>
          <Switch
            id={`${category}-follows`}
            checked={notifications[category].follows}
            onCheckedChange={() => handleToggle(category, "follows")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor={`${category}-likes`}>Likes</Label>
          </div>
          <Switch
            id={`${category}-likes`}
            checked={notifications[category].likes}
            onCheckedChange={() => handleToggle(category, "likes")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor={`${category}-comments`}>Comments</Label>
          </div>
          <Switch
            id={`${category}-comments`}
            checked={notifications[category].comments}
            onCheckedChange={() => handleToggle(category, "comments")}
          />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <NotificationSection
        title="Email Notifications"
        description="Receive notifications via email"
        icon={<Mail className="h-5 w-5" />}
        category="email"
      />

      <NotificationSection
        title="Push Notifications"
        description="Receive push notifications on your devices"
        icon={<Bell className="h-5 w-5" />}
        category="push"
      />

      <NotificationSection
        title="In-App Notifications"
        description="Receive notifications within the application"
        icon={<Bell className="h-5 w-5" />}
        category="inApp"
      />

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </div>
  )
}
