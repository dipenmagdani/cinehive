"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { Github, ChromeIcon as Google } from "lucide-react"

interface AuthFormProps {
  type: "login" | "register" | "forgot-password"
}

export function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`${type} submitted:`, { email, password, confirmPassword })
    // Here you would integrate with your actual authentication logic (e.g., Server Actions)
  }

  const title = type === "login" ? "Welcome Back" : type === "register" ? "Join CineHive" : "Reset Your Password"
  const subtitle =
    type === "login"
      ? "Sign in to your account"
      : type === "register"
        ? "Create your account"
        : "Enter your email to reset"
  const buttonText = type === "login" ? "Sign In" : type === "register" ? "Sign Up" : "Send Reset Link"

  return (
    <div className="w-full max-w-md rounded-2xl bg-cine-surface p-8 shadow-lg border border-cine-surface/50">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-cine-text-primary">{title}</h2>
        <p className="mt-2 text-cine-text-secondary">{subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <Label htmlFor="email" className="text-cine-text-secondary">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 bg-cine-background border-cine-surface/50 text-cine-text-primary focus:border-cine-accent focus:ring-cine-accent"
          />
        </div>
        {type !== "forgot-password" && (
          <div>
            <Label htmlFor="password" className="text-cine-text-secondary">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-cine-background border-cine-surface/50 text-cine-text-primary focus:border-cine-accent focus:ring-cine-accent"
            />
          </div>
        )}
        {type === "register" && (
          <div>
            <Label htmlFor="confirm-password" className="text-cine-text-secondary">
              Confirm Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 bg-cine-background border-cine-surface/50 text-cine-text-primary focus:border-cine-accent focus:ring-cine-accent"
            />
          </div>
        )}
        <Button
          type="submit"
          className="w-full rounded-full bg-cine-accent hover:bg-cine-accent/90 text-cine-text-primary py-2 text-lg"
        >
          {buttonText}
        </Button>
      </form>
      <div className="mt-6 text-center text-sm text-cine-text-secondary">
        {type === "login" && (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-medium text-cine-accent hover:underline">
              Sign Up
            </Link>
          </>
        )}
        {type === "register" && (
          <>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-cine-accent hover:underline">
              Sign In
            </Link>
          </>
        )}
        {type !== "forgot-password" && (
          <div className="mt-2">
            <Link href="/auth/forgot-password" className="font-medium text-cine-accent hover:underline">
              Forgot password?
            </Link>
          </div>
        )}
      </div>
      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-cine-surface/50" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-cine-surface px-2 text-cine-text-secondary">Or continue with</span>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <Button
          variant="outline"
          className="flex-1 rounded-full border-cine-surface/50 bg-cine-background text-cine-text-primary hover:bg-cine-surface hover:border-cine-accent transition-colors"
        >
          <Google className="mr-2 h-5 w-5" />
          Google
        </Button>
        <Button
          variant="outline"
          className="flex-1 rounded-full border-cine-surface/50 bg-cine-background text-cine-text-primary hover:bg-cine-surface hover:border-cine-accent transition-colors"
        >
          <Github className="mr-2 h-5 w-5" />
          GitHub
        </Button>
      </div>
    </div>
  )
}
