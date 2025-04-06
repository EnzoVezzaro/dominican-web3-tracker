"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Mail } from "lucide-react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const { login, isLoading } = useAuth()
  const { t } = useLanguage()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      await login(email) // In this demo, login and signup use the same flow
    }
  }

  return (
    <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-b from-primary to-primary/80" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image src="/placeholder.svg?height=40&width=40" alt="Logo" width={40} height={40} className="mr-2" />
          Dominican Web3 Tracker
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Join the growing community of Dominican Web3 enthusiasts. Track your assets, discover NFTs, and
              participate in local blockchain projects all in one place."
            </p>
            <footer className="text-sm">Carlos Rodriguez, Blockchain Developer</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{t("auth.signup")}</h1>
            <p className="text-sm text-muted-foreground">{t("auth.magicLink")}</p>
          </div>
          <Card>
            <form onSubmit={handleSignup}>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">{t("auth.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("auth.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4" />
                      {t("auth.continue")}
                    </div>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-primary underline underline-offset-4">
              Already have an account? Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

