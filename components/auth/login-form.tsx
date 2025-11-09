"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Github, Mail } from "lucide-react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoginUserInput, loginUserType } from "@/lib/type/userType"
import { useForm } from "react-hook-form"
import { userLogin } from "@/store/slice/userSlice"
import { useAppDispatch } from "@/store/storeHooks"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const form = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserType),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // 👈 ensures validation triggers correctly
  })

  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async (data: LoginUserInput) => {
    console.log("✅ Form submitted with data:", data)
    setIsLoading(true)
    try {
      // const result = await dispatch(userLogin(data)).unwrap()
      // console.log("✅ Login successful:", result)

      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      })

      form.reset()
      setTimeout(() => router.push("/"), 1000)
    } catch (error: any) {
      console.error("❌ Login failed:", error)
      toast({
        title: "Login failed",
        description: error?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Coming Soon",
      description: `${provider} login will be available soon!`,
    })
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(onSubmit)(e)
        }}
        className="space-y-4"
        noValidate
      >
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            disabled={isLoading}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              disabled={isLoading}
              {...register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {/* OR divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social login */}
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
        Don’t have an account?{" "}
        <Link href="/auth/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  )
}
