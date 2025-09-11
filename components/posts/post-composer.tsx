"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ImageIcon, Smile, Send, X, Hash } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function PostComposer() {
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [showTagInput, setShowTagInput] = useState(false)
  const [attachedImage, setAttachedImage] = useState<string | null>(null)

  const handleSubmit = () => {
    if (content.trim()) {
      // Handle post submission
      console.log("Posting:", { content, tags, image: attachedImage })
      setContent("")
      setTags([])
      setAttachedImage(null)
      setShowTagInput(false)
    }
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleImageUpload = () => {
    // Simulate image upload
    setAttachedImage("/placeholder.svg?height=200&width=400&text=Uploaded+Image")
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground focus-visible:ring-0"
            />

            {/* Attached Image */}
            <AnimatePresence>
              {attachedImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative rounded-lg overflow-hidden"
                >
                  <img src={attachedImage || "/placeholder.svg"} alt="Attached" className="w-full h-48 object-cover" />
                  <Button
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setAttachedImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tags */}
            <AnimatePresence>
              {tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                      <span>#{tag}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-transparent"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tag Input */}
            <AnimatePresence>
              {showTagInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex space-x-2"
                >
                  <div className="flex-1 flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Add a tag..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                      className="flex-1 bg-transparent border-0 outline-0 text-sm placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button size="sm" onClick={handleAddTag} disabled={!currentTag.trim()}>
                    Add
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowTagInput(false)}>
                    Cancel
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleImageUpload}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTagInput(!showTagInput)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Hash className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">{content.length}/500</span>
                <Button onClick={handleSubmit} disabled={!content.trim()} className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
