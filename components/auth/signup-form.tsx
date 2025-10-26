"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Github, Mail, Loader2 } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { userRegister } from "@/store/slice/userSlice"
import { useAppDispatch } from "@/store/storeHooks"
import { CreateUserInput, createUserType } from "@/lib/type/userType"
export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useAppDispatch()

  // ✅ Setup React Hook Form
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserType),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      proFileImage: "",
      bio: "",
      country: "",
      phoneNumber: "",
    },
  })

  // ✅ Submit handler
const onSubmit = async (data: CreateUserInput) => {
  setIsLoading(true)
  try {
    const result = await dispatch(userRegister(data)).unwrap()
    toast({
      title: "Account created successfully",
      description: "You can now log in to your account.",
    })
    form.reset()
    setTimeout(() => router.push("/auth/login"), 1000)
  } catch (error: any) {
    toast({
      title: "Registration failed",
      description: error?.message || "Something went wrong. Please try again.",
      variant: "destructive",
    })
  } finally {
    setIsLoading(false)
  }
}



  // ✅ Social login placeholder
  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Coming Soon",
      description: `${provider} signup will be available soon!`,
    })
  }

  return (
    <div className="space-y-6 max-w-md mx-auto p-6 rounded-2xl shadow-lg bg-card">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            disabled={isLoading}
            {...form.register("name")}
          />
          {form.formState.errors.name && <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            disabled={isLoading}
            {...form.register("email")}
          />
          {form.formState.errors.email && <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              disabled={isLoading}
              {...form.register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {form.formState.errors.password && <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>}
        </div>

        {/* Profile Image */}
        <div className="space-y-2">
          <Label htmlFor="proFileImage">Profile Image URL</Label>
          <Input
            id="proFileImage"
            placeholder="https://example.com/profile.jpg"
            disabled={isLoading}
            {...form.register("proFileImage")}
          />
          {form.formState.errors.proFileImage && (
            <p className="text-sm text-red-500">{form.formState.errors.proFileImage.message}</p>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            placeholder="Tell us about yourself..."
            disabled={isLoading}
            {...form.register("bio")}
          />
          {form.formState.errors.bio && <p className="text-sm text-red-500">{form.formState.errors.bio.message}</p>}
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            placeholder="e.g., United States"
            disabled={isLoading}
            {...form.register("country")}
          />
          {form.formState.errors.country && <p className="text-sm text-red-500">{form.formState.errors.country.message}</p>}
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            placeholder="+1 234 567 890"
            disabled={isLoading}
            {...form.register("phoneNumber")}
          />
          {form.formState.errors.phoneNumber && (
            <p className="text-sm text-red-500">{form.formState.errors.phoneNumber.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      {/* Social login section */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" onClick={() => handleSocialLogin("Google")}>
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" onClick={() => handleSocialLogin("GitHub")}>
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  )
}
