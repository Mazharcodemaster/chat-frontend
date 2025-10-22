"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { PostsFeed } from "@/components/posts/posts-feed"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { selectUser } from "@/store/slice/userSlice"
import { useAppDispatch, useAppSelector } from "@/store/storeHooks"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const userData = useAppSelector(selectUser);

  if (!userData) {
    router.push("/auth/login");
  }

  console.log('userData',userData);
  

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
