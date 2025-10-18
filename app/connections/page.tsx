"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserPlus, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function ConnectionsPage() {

  const people = [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "/alice-portrait.png",
      role: "Product Designer",
      online: true,
      isConnected: false,
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "/thoughtful-man-in-park.png",
      role: "Full Stack Developer",
      online: true,
      isConnected: true,
    },
    {
      id: 3,
      name: "Carol Davis",
      avatar: "/carol-portrait.png",
      role: "UX Researcher",
      online: false,
      isConnected: true,
    },
    {
      id: 4,
      name: "David Wilson",
      avatar: "/david-statue.png",
      role: "Backend Engineer",
      online: true,
      isConnected: false,
    },
    {
      id: 5,
      name: "Emma Brown",
      avatar: "/emma-portrait.png",
      role: "Product Manager",
      online: false,
      isConnected: false,
    },
    {
      id: 6,
      name: "Frank Miller",
      avatar: "/frank.jpg",
      role: "DevOps Engineer",
      online: true,
      isConnected: true,
    },
  ]

  return (
    <MainLayout>
      <main className="flex-1 flex flex-col overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-montserrat font-black text-foreground">People & Connections</h1>
            <p className="text-muted-foreground mt-2">Discover and connect with team members</p>
          </div>

          {/* People Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {people.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={person.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {person.online && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="font-semibold text-foreground">{person.name}</h3>
                      <p className="text-sm text-muted-foreground">{person.role}</p>
                    </div>

                    {/* Status Badge */}
                    <Badge variant={person.online ? "default" : "secondary"}>
                      {person.online ? "Online" : "Offline"}
                    </Badge>

                    {/* Actions */}
                    <div className="flex gap-2 w-full pt-2">
                      {person.isConnected ? (
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                      ) : (
                        <Button size="sm" className="flex-1">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </MainLayout>
  )
}
