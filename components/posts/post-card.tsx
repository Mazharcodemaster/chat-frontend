"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Share, MoreHorizontal, Heart, Bookmark, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { CommentSection } from "./comment-section"

interface Post {
  id: number
  author: {
    name: string
    avatar: string
    username: string
    verified?: boolean
  }
  content: string
  timestamp: string
  reactions: Array<{
    emoji: string
    count: number
    userReacted: boolean
  }>
  comments: Array<{
    id: number
    author: {
      name: string
      avatar: string
      username: string
    }
    content: string
    timestamp: string
    likes: number
    userLiked: boolean
  }>
  image?: string
  likes: number
  userLiked: boolean
  userBookmarked: boolean
  views: number
  tags?: string[]
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post: initialPost }: PostCardProps) {
  const [post, setPost] = useState(initialPost)
  const [showComments, setShowComments] = useState(false)
  const [reactions, setReactions] = useState(post.reactions)

  const handleReaction = (emoji: string) => {
    setReactions((prev) =>
      prev.map((reaction) => {
        if (reaction.emoji === emoji) {
          return {
            ...reaction,
            count: reaction.userReacted ? reaction.count - 1 : reaction.count + 1,
            userReacted: !reaction.userReacted,
          }
        }
        return reaction
      }),
    )
  }

  const handleLike = () => {
    setPost((prev) => ({
      ...prev,
      likes: prev.userLiked ? prev.likes - 1 : prev.likes + 1,
      userLiked: !prev.userLiked,
    }))
  }

  const handleBookmark = () => {
    setPost((prev) => ({
      ...prev,
      userBookmarked: !prev.userBookmarked,
    }))
  }

  const handleCommentAdd = (content: string) => {
    // Handle comment addition logic
    console.log("New comment:", content)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-card-foreground">{post.author.name}</h3>
                  {post.author.verified && (
                    <Badge variant="secondary" className="text-xs">
                      ✓
                    </Badge>
                  )}
                  <span className="text-sm text-muted-foreground">{post.author.username}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Eye className="h-3 w-3" />
                    <span className="text-xs">{post.views}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-card-foreground leading-relaxed">{post.content}</p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <img
                src={post.image || "/placeholder.svg"}
                alt="Post attachment"
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Reactions */}
          <div className="flex items-center space-x-2 pt-2">
            {reactions.map((reaction) => (
              <motion.div key={reaction.emoji} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={reaction.userReacted ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => handleReaction(reaction.emoji)}
                  className="h-8 px-3 space-x-1"
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-xs">{reaction.count}</span>
                </Button>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`text-muted-foreground hover:text-foreground ${
                  post.userLiked ? "text-red-500 hover:text-red-600" : ""
                }`}
              >
                <Heart className={`h-4 w-4 mr-2 ${post.userLiked ? "fill-current" : ""}`} />
                {post.likes}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowComments(!showComments)}
                className="text-muted-foreground hover:text-foreground"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                {post.comments.length}
              </Button>

              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`text-muted-foreground hover:text-foreground ${post.userBookmarked ? "text-primary" : ""}`}
            >
              <Bookmark className={`h-4 w-4 ${post.userBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Comments Section */}
          <AnimatePresence>
            {showComments && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-4 border-t border-border"
              >
                <CommentSection postId={post.id} comments={post.comments} onCommentAdd={handleCommentAdd} />
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}
