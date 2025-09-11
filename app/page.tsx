"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { MainLayout } from "@/components/layout/main-layout"
import { PostsFeed } from "@/components/posts/posts-feed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-montserrat font-black text-primary">Welcome to ChatHub</CardTitle>
            <CardDescription>
              Connect, chat, and share with your team in a modern communication platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button asChild className="w-full">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <MainLayout>
      <div className="flex-1 flex">
        <main className="flex-1 flex flex-col">
          <PostsFeed />
        </main>
      </div>
    </MainLayout>
  )
}
