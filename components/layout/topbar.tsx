"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MessageSquare, Bell, Sun, Moon, Plus } from "lucide-react"
import { useTheme } from "next-themes"

interface TopBarProps {
  onChatToggle: () => void
}

export function TopBar({ onChatToggle }: TopBarProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="h-16 border-b border-border bg-background px-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search messages, people, or channels..." className="pl-10 bg-muted/50" />
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 flex-1 justify-end">
        <Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
          >
            3
          </Badge>
        </Button>

        <Button variant="ghost" size="sm" onClick={onChatToggle} className="relative">
          <MessageSquare className="h-4 w-4" />
          <Badge
            variant="secondary"
            className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center"
          >
            5
          </Badge>
        </Button>
      </div>
    </header>
  )
}
