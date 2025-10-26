"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"

interface Reaction {
  emoji: string
  count: number
  users: string[]
  userReacted: boolean
}

interface MessageReactionsProps {
  reactions: Reaction[]
  onReactionAdd: (emoji: string) => void
  onReactionRemove: (emoji: string) => void
}

const quickReactions = ["👍", "❤️", "😂", "😮", "😢", "😡"]

export function MessageReactions({ reactions, onReactionAdd, onReactionRemove }: MessageReactionsProps) {
  const [showPicker, setShowPicker] = useState(false)

  const handleReactionClick = (reaction: Reaction) => {
    if (reaction.userReacted) {
      onReactionRemove(reaction.emoji)
    } else {
      onReactionAdd(reaction.emoji)
    }
  }

  return (
    <div className="flex items-center space-x-1 mt-1">
      {reactions.map((reaction) => (
        <motion.div key={reaction.emoji} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant={reaction.userReacted ? "secondary" : "ghost"}
            size="sm"
            className="h-6 px-2 text-xs space-x-1"
            onClick={() => handleReactionClick(reaction)}
          >
            <span>{reaction.emoji}</span>
            <span>{reaction.count}</span>
          </Button>
        </motion.div>
      ))}

      <Popover open={showPicker} onOpenChange={setShowPicker}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Plus className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2" align="start">
          <div className="flex space-x-1">
            {quickReactions.map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-lg hover:bg-muted"
                onClick={() => {
                  onReactionAdd(emoji)
                  setShowPicker(false)
                }}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
