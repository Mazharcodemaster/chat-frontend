"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, MessageSquare, MoreHorizontal, Send } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Comment {
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
  replies?: Comment[]
}

interface CommentSectionProps {
  postId: number
  comments: Comment[]
  onCommentAdd: (content: string) => void
}

export function CommentSection({ postId, comments: initialComments, onCommentAdd }: CommentSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [replyContent, setReplyContent] = useState("")

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: {
          name: "John Doe",
          avatar: "/placeholder.svg?height=32&width=32",
          username: "@johndoe",
        },
        content: newComment,
        timestamp: "now",
        likes: 0,
        userLiked: false,
      }
      setComments([...comments, comment])
      setNewComment("")
      onCommentAdd(newComment)
    }
  }

  const handleReplySubmit = (parentId: number) => {
    if (replyContent.trim()) {
      const reply: Comment = {
        id: Date.now(),
        author: {
          name: "John Doe",
          avatar: "/placeholder.svg?height=32&width=32",
          username: "@johndoe",
        },
        content: replyContent,
        timestamp: "now",
        likes: 0,
        userLiked: false,
      }

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId ? { ...comment, replies: [...(comment.replies || []), reply] } : comment,
        ),
      )
      setReplyContent("")
      setReplyingTo(null)
    }
  }

  const handleLike = (commentId: number, isReply = false, parentId?: number) => {
    if (isReply && parentId) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies?.map((reply) =>
                  reply.id === commentId
                    ? {
                        ...reply,
                        likes: reply.userLiked ? reply.likes - 1 : reply.likes + 1,
                        userLiked: !reply.userLiked,
                      }
                    : reply,
                ),
              }
            : comment,
        ),
      )
    } else {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
                userLiked: !comment.userLiked,
              }
            : comment,
        ),
      )
    }
  }

  const CommentItem = ({
    comment,
    isReply = false,
    parentId,
  }: { comment: Comment; isReply?: boolean; parentId?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${isReply ? "ml-8 mt-2" : "mb-4"}`}
    >
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} />
          <AvatarFallback>
            {comment.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-medium text-sm">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">{comment.author.username}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
            </div>
            <p className="text-sm leading-relaxed">{comment.content}</p>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <Button
              variant="ghost"
              size="sm"
              className={`h-auto p-0 ${comment.userLiked ? "text-red-500" : "text-muted-foreground"}`}
              onClick={() => handleLike(comment.id, isReply, parentId)}
            >
              <Heart className={`h-4 w-4 mr-1 ${comment.userLiked ? "fill-current" : ""}`} />
              {comment.likes > 0 && comment.likes}
            </Button>

            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-muted-foreground"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Reply
              </Button>
            )}

            <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Reply Input */}
          <AnimatePresence>
            {replyingTo === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2"
              >
                <div className="flex space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg?height=24&width=24" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea
                      placeholder={`Reply to ${comment.author.name}...`}
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      className="min-h-[60px] text-sm"
                    />
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => handleReplySubmit(comment.id)} disabled={!replyContent.trim()}>
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="space-y-2">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} parentId={comment.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-4">
      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Add Comment */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
              />
              <div className="flex justify-end">
                <Button onClick={handleCommentSubmit} disabled={!newComment.trim()} size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Comment
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
