"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopBar } from "./topbar"
import { ChatPanel } from "../chat/chat-panel"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onChatToggle={() => setIsChatOpen(!isChatOpen)} />
        <div className="flex-1 flex min-h-0">
          {children}

          {/* Chat Panel */}
          {isChatOpen && <ChatPanel onClose={() => setIsChatOpen(false)} />}
        </div>
      </div>
    </div>
  )
}
