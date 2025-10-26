"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Lock, Eye, Users, Globe } from "lucide-react"

export function PrivacySettings() {
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showOnlineStatus: true,
    allowDirectMessages: true,
    showActivity: true,
    dataCollection: false,
    analyticsOptOut: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleToggle = (setting: string) => {
    setPrivacy((prev) => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev],
    }))
  }

  const handleSelectChange = (setting: string, value: string) => {
    setPrivacy((prev) => ({
      ...prev,
      [setting]: value,
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Privacy settings updated",
        description: "Your privacy preferences have been saved.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save privacy settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Profile Privacy</span>
          </CardTitle>
          <CardDescription>Control who can see your profile and information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="profile-visibility">Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">Who can see your profile</p>
            </div>
            <Select
              value={privacy.profileVisibility}
              onValueChange={(value) => handleSelectChange("profileVisibility", value)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>Public</span>
                  </div>
                </SelectItem>
                <SelectItem value="followers">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span>Followers Only</span>
                  </div>
                </SelectItem>
                <SelectItem value="private">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Private</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="online-status">Show Online Status</Label>
              <p className="text-sm text-muted-foreground">Let others see when you're online</p>
            </div>
            <Switch
              id="online-status"
              checked={privacy.showOnlineStatus}
              onCheckedChange={() => handleToggle("showOnlineStatus")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-activity">Show Activity</Label>
              <p className="text-sm text-muted-foreground">Display your recent activity to others</p>
            </div>
            <Switch
              id="show-activity"
              checked={privacy.showActivity}
              onCheckedChange={() => handleToggle("showActivity")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Communication Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Communication</span>
          </CardTitle>
          <CardDescription>Control how others can communicate with you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="direct-messages">Allow Direct Messages</Label>
              <p className="text-sm text-muted-foreground">Let others send you direct messages</p>
            </div>
            <Switch
              id="direct-messages"
              checked={privacy.allowDirectMessages}
              onCheckedChange={() => handleToggle("allowDirectMessages")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data & Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Data & Analytics</span>
          </CardTitle>
          <CardDescription>Manage how your data is used for analytics and improvements.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="data-collection">Data Collection</Label>
              <p className="text-sm text-muted-foreground">Allow collection of usage data for service improvement</p>
            </div>
            <Switch
              id="data-collection"
              checked={privacy.dataCollection}
              onCheckedChange={() => handleToggle("dataCollection")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="analytics-opt-out">Analytics Opt-out</Label>
              <p className="text-sm text-muted-foreground">Opt out of analytics tracking</p>
            </div>
            <Switch
              id="analytics-opt-out"
              checked={privacy.analyticsOptOut}
              onCheckedChange={() => handleToggle("analyticsOptOut")}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Privacy Settings"}
        </Button>
      </div>
    </div>
  )
}
