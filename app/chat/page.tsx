"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChatWindow } from "@/components/chat/chat-window"

export default function ChatPage() {

  

  return (
    <MainLayout>
      <main className="flex-1 flex flex-col">
        <ChatWindow chatId={1} onBack={() => console.log("Back")} onClose={() => console.log("Close")} />
      </main>
    </MainLayout>
  )
}
