"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { X, Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ChatWindow } from "./chat-window"
import { motion } from "framer-motion"

interface ChatPanelProps {
  onClose: () => void
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const chats = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "Hey! How's the new feature coming along?",
      timestamp: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Team General",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "Meeting starts in 10 minutes",
      timestamp: "5m ago",
      unread: 0,
      online: false,
      isGroup: true,
    },
    {
      id: 3,
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "Thanks for the code review!",
      timestamp: "1h ago",
      unread: 1,
      online: false,
    },
    {
      id: 4,
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "The design looks amazing! 🎨",
      timestamp: "2h ago",
      unread: 0,
      online: true,
    },
    {
      id: 5,
      name: "Dev Team",
      avatar: "/placeholder.svg?height=32&width=32",
      lastMessage: "Sprint planning tomorrow at 9 AM",
      timestamp: "3h ago",
      unread: 3,
      online: false,
      isGroup: true,
    },
  ]

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <motion.div
      initial={{ x: 320 }}
      animate={{ x: 0 }}
      exit={{ x: 320 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="w-80 border-l border-border bg-background flex flex-col h-full"
    >
      {selectedChat ? (
        <ChatWindow chatId={selectedChat} onBack={() => setSelectedChat(null)} onClose={onClose} />
      ) : (
        <>
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-foreground">Messages</h2>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {filteredChats.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">No conversations found</div>
            ) : (
              filteredChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ backgroundColor: "var(--muted)" }}
                  className="p-3 cursor-pointer border-b border-border/50 transition-colors"
                  onClick={() => setSelectedChat(chat.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {chat.isGroup
                            ? "#"
                            : chat.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {chat.online && !chat.isGroup && (
                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground truncate">{chat.name}</h3>
                        <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        {chat.unread > 0 && (
                          <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </>
      )}
    </motion.div>
  )
}
