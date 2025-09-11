"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileSettings } from "./profile-settings"
import { AccountSettings } from "./account-settings"
import { NotificationSettings } from "./notification-settings"
import { PrivacySettings } from "./privacy-settings"
import { User, Shield, Bell, Lock } from "lucide-react"

export function SettingsPage() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-montserrat font-black text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Account</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <AccountSettings />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="privacy" className="mt-6">
            <PrivacySettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
