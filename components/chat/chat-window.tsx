"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, X, Send, Paperclip, MoreVertical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { EmojiPicker } from "./emoji-picker"
import { TypingIndicator } from "./typing-indicator"
import { MessageReactions } from "./message-reactions"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
  avatar?: string
  reactions?: Array<{
    emoji: string
    count: number
    users: string[]
    userReacted: boolean
  }>
}

interface ChatWindowProps {
  chatId: number
  onBack: () => void
  onClose: () => void
}

export function ChatWindow({ chatId, onBack, onClose }: ChatWindowProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Alice Johnson",
      content: "Hey! How's the new feature coming along?",
      timestamp: "2:30 PM",
      isOwn: false,
      avatar: "/placeholder.svg?height=32&width=32",
      reactions: [{ emoji: "👍", count: 2, users: ["Bob", "Carol"], userReacted: false }],
    },
    {
      id: 2,
      sender: "You",
      content: "Going great! Just finished the UI components. Want to take a look?",
      timestamp: "2:32 PM",
      isOwn: true,
      reactions: [
        { emoji: "🚀", count: 1, users: ["Alice"], userReacted: false },
        { emoji: "👀", count: 1, users: ["Alice"], userReacted: false },
      ],
    },
    {
      id: 3,
      sender: "Alice Johnson",
      content: "Can you share a screenshot?",
      timestamp: "2:33 PM",
      isOwn: false,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      sender: "You",
      content: "Sure thing! Let me grab one now. The new animations look really smooth.",
      timestamp: "2:35 PM",
      isOwn: true,
    },
  ])
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Simulate typing indicator
  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingUsers(Math.random() > 0.7 ? ["Alice Johnson"] : [])
    }, 2000)
    return () => clearTimeout(timer)
  }, [messages])

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "You",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji)
  }

  const handleReactionAdd = (messageId: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || []
          const existingReaction = reactions.find((r) => r.emoji === emoji)

          if (existingReaction) {
            return {
              ...msg,
              reactions: reactions.map((r) =>
                r.emoji === emoji ? { ...r, count: r.count + 1, userReacted: true, users: [...r.users, "You"] } : r,
              ),
            }
          } else {
            return {
              ...msg,
              reactions: [...reactions, { emoji, count: 1, users: ["You"], userReacted: true }],
            }
          }
        }
        return msg
      }),
    )
  }

  const handleReactionRemove = (messageId: number, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || []
          return {
            ...msg,
            reactions: reactions
              .map((r) =>
                r.emoji === emoji
                  ? {
                      ...r,
                      count: Math.max(0, r.count - 1),
                      userReacted: false,
                      users: r.users.filter((u) => u !== "You"),
                    }
                  : r,
              )
              .filter((r) => r.count > 0),
          }
        }
        return msg
      }),
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-foreground">Alice Johnson</h3>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex group ${msg.isOwn ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-end space-x-2 max-w-[70%] ${msg.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {!msg.isOwn && (
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {msg.sender
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="space-y-1">
                  <div
                    className={`rounded-lg px-3 py-2 ${
                      msg.isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground/70"
                      }`}
                    >
                      {msg.timestamp}
                    </p>
                  </div>
                  {msg.reactions && msg.reactions.length > 0 && (
                    <MessageReactions
                      reactions={msg.reactions}
                      onReactionAdd={(emoji) => handleReactionAdd(msg.id, emoji)}
                      onReactionRemove={(emoji) => handleReactionRemove(msg.id, emoji)}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <AnimatePresence>{typingUsers.length > 0 && <TypingIndicator users={typingUsers} />}</AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-end space-x-2">
          <Button variant="ghost" size="sm" className="mb-2">
            <Paperclip className="h-4 w-4" />
          </Button>
          <div className="flex-1 space-y-2">
            <div className="relative">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                className="pr-12 min-h-[40px] resize-none"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            </div>
          </div>
          <Button onClick={handleSend} disabled={!message.trim()} size="sm" className="mb-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
