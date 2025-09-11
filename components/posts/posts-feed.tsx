"use client"

import { useState } from "react"
import { PostCard } from "./post-card"
import { PostComposer } from "./post-composer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Clock, Users } from "lucide-react"

const mockPosts = [
  {
    id: 1,
    author: {
      name: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "@alice",
      verified: true,
    },
    content:
      "Just shipped a new feature for our chat platform! Real-time typing indicators are now live. The user experience feels so much more responsive now. What do you think about real-time features in chat apps?",
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
        content: "This is amazing! The typing indicators make such a difference.",
        timestamp: "1 hour ago",
        likes: 3,
        userLiked: false,
      },
      {
        id: 2,
        author: {
          name: "Carol Davis",
          avatar: "/placeholder.svg?height=32&width=32",
          username: "@carol",
        },
        content: "Love the smooth animations! Great work on the UX.",
        timestamp: "45 minutes ago",
        likes: 2,
        userLiked: true,
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
      name: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "@bob",
    },
    content:
      "Working on some exciting new animations for our message bubbles. The micro-interactions really make a difference in user experience! Here's a sneak peek at what we're building.",
    timestamp: "4 hours ago",
    reactions: [
      { emoji: "👍", count: 15, userReacted: false },
      { emoji: "🎨", count: 6, userReacted: true },
      { emoji: "✨", count: 9, userReacted: false },
    ],
    comments: [
      {
        id: 3,
        author: {
          name: "Alice Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
          username: "@alice",
        },
        content: "The attention to detail is incredible! Can't wait to see this in production.",
        timestamp: "3 hours ago",
        likes: 5,
        userLiked: false,
      },
    ],
    likes: 30,
    userLiked: true,
    userBookmarked: false,
    views: 203,
    tags: ["animation", "ux", "design"],
  },
  {
    id: 3,
    author: {
      name: "Carol Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      username: "@carol",
    },
    content:
      "Great team meeting today! Love how collaborative our development process has become. Looking forward to the next sprint and all the exciting features we're planning!",
    timestamp: "6 hours ago",
    reactions: [
      { emoji: "👍", count: 20, userReacted: true },
      { emoji: "💪", count: 8, userReacted: false },
      { emoji: "🎉", count: 4, userReacted: false },
    ],
    comments: [],
    likes: 18,
    userLiked: false,
    userBookmarked: false,
    views: 89,
    tags: ["team", "collaboration", "sprint"],
  },
]

export function PostsFeed() {
  const [activeTab, setActiveTab] = useState("recent")
  const [posts] = useState(mockPosts)

  const sortedPosts = [...posts].sort((a, b) => {
    switch (activeTab) {
      case "trending":
        return b.likes + b.views - (a.likes + a.views)
      case "following":
        return b.author.verified === true ? 1 : -1
      default:
        return b.id - a.id
    }
  })

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Feed Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-montserrat font-black text-foreground">Feed</h1>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </Button>
          </div>

          {/* Feed Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Recent</span>
              </TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Trending</span>
              </TabsTrigger>
              <TabsTrigger value="following" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Following</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-6 mt-6">
              {/* Post Composer */}
              <PostComposer />

              {/* Posts Feed */}
              <div className="space-y-6">
                {sortedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center py-6">
                <Button variant="outline">Load More Posts</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
