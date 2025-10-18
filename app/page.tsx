"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { PostsFeed } from "@/components/posts/posts-feed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {

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
