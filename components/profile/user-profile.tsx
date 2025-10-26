"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  UserPlus,
  MoreHorizontal,
  MapPin,
  Calendar,
  LinkIcon,
  Users,
  Heart,
  MessageCircle,
} from "lucide-react"
import { PostCard } from "@/components/posts/post-card"

interface UserProfileProps {
  username: string
}

export function UserProfile({ username }: UserProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  // Mock user data
  const user = {
    id: 1,
    name: "Alice Johnson",
    username: "@alice",
    avatar: "/placeholder.svg?height=120&width=120",
    bio: "Senior Frontend Developer at TechCorp. Passionate about creating beautiful user experiences and building amazing products. Love React, TypeScript, and modern web technologies.",
    location: "San Francisco, CA",
    website: "https://alice-johnson.dev",
    joinedDate: "March 2022",
    verified: true,
    followers: 1234,
    following: 567,
    posts: 89,
    isOnline: true,
  }

  const userPosts = [
    {
      id: 1,
      author: {
        name: user.name,
        avatar: user.avatar,
        username: user.username,
        verified: user.verified,
      },
      content:
        "Just shipped a new feature for our chat platform! Real-time typing indicators are now live. What do you think?",
      timestamp: "2 hours ago",
      reactions: [
        { emoji: "👍", count: 12, userReacted: true },
        { emoji: "🚀", count: 8, userReacted: false },
        { emoji: "❤️", count: 5, userReacted: false },
      ],
      comments: [
        {
          id: 1,
          author: {
            name: "Bob Smith",
            avatar: "/placeholder.svg?height=32&width=32",
            username: "@bob",
          },
          content: "This is amazing! Great work.",
          timestamp: "1 hour ago",
          likes: 3,
          userLiked: false,
        },
      ],
      image: "/feature-screenshot.png",
      likes: 25,
      userLiked: false,
      userBookmarked: true,
      views: 156,
      tags: ["feature", "chat", "realtime"],
    },
    {
      id: 2,
      author: {
        name: user.name,
        avatar: user.avatar,
        username: user.username,
        verified: user.verified,
      },
      content:
        "Working on some exciting new animations for our message bubbles. The micro-interactions really make a difference!",
      timestamp: "1 day ago",
      reactions: [
        { emoji: "👍", count: 15, userReacted: false },
        { emoji: "🎨", count: 6, userReacted: true },
        { emoji: "✨", count: 9, userReacted: false },
      ],
      comments: [],
      likes: 30,
      userLiked: true,
      userBookmarked: false,
      views: 203,
      tags: ["animation", "ux", "design"],
    },
  ]

  const userActivity = [
    { type: "like", content: "Liked Bob's post about React performance", timestamp: "2 hours ago" },
    { type: "comment", content: "Commented on Carol's design showcase", timestamp: "4 hours ago" },
    { type: "follow", content: "Started following @designguru", timestamp: "1 day ago" },
    { type: "post", content: "Shared a new post about TypeScript tips", timestamp: "2 days ago" },
  ]

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 md:h-32 md:w-32">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 border-4 border-background rounded-full" />
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant={isFollowing ? "outline" : "default"}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="flex items-center space-x-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>{isFollowing ? "Following" : "Follow"}</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <MessageSquare className="h-4 w-4" />
                    <span>Message</span>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-2xl font-montserrat font-black">{user.name}</h1>
                    {user.verified && (
                      <Badge variant="secondary" className="text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-2">{user.username}</p>
                  <p className="text-foreground leading-relaxed">{user.bio}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {user.location && (
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.website && (
                    <div className="flex items-center space-x-1">
                      <LinkIcon className="h-4 w-4" />
                      <a
                        href={user.website}
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {user.website.replace("https://", "")}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {user.joinedDate}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex space-x-6">
                  <div className="text-center">
                    <div className="font-semibold text-lg">{user.posts}</div>
                    <div className="text-sm text-muted-foreground">Posts</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{user.followers.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-lg">{user.following}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6 mt-6">
            {userPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50">
                    <div className="mt-1">
                      {activity.type === "like" && <Heart className="h-4 w-4 text-red-500" />}
                      {activity.type === "comment" && <MessageCircle className="h-4 w-4 text-blue-500" />}
                      {activity.type === "follow" && <Users className="h-4 w-4 text-green-500" />}
                      {activity.type === "post" && <MessageSquare className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Skills & Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["React", "TypeScript", "Next.js", "Node.js", "GraphQL", "UI/UX Design"].map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="font-medium">Senior Frontend Developer</h4>
                    <p className="text-sm text-muted-foreground">TechCorp • 2022 - Present</p>
                  </div>
                  <div>
                    <h4 className="font-medium">Frontend Developer</h4>
                    <p className="text-sm text-muted-foreground">StartupXYZ • 2020 - 2022</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
