"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/components/auth-provider"

export default function MagicLinkPage() {
  const [verifying, setVerifying] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()

  useEffect(() => {
    const verifyMagicLink = async () => {
      try {
        // In a real implementation, this would verify the magic link token
        // For now, we'll simulate the verification process
        const email = searchParams.get("email")
        const token = searchParams.get("token")

        if (!email || !token) {
          throw new Error("Invalid magic link")
        }

        // Simulate verification delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Login the user
        await login(email)

        // Redirect to dashboard
        router.push("/dashboard")
      } catch (error) {
        console.error("Magic link verification error:", error)
        setError("Invalid or expired magic link. Please try logging in again.")
      } finally {
        setVerifying(false)
      }
    }

    verifyMagicLink()
  }, [login, router, searchParams])

  return (
    <div className="container flex h-screen items-center justify-center">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Verifying Magic Link</CardTitle>
          <CardDescription>
            {verifying
              ? "Please wait while we verify your magic link..."
              : error
                ? "There was a problem with your magic link"
                : "Verification successful!"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {verifying ? (
            <div className="flex justify-center py-8">
              <svg
                className="animate-spin h-8 w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          ) : error ? (
            <div className="text-center py-4 text-destructive">
              <p>{error}</p>
              <a href="/login" className="text-primary hover:underline mt-4 inline-block">
                Return to login
              </a>
            </div>
          ) : (
            <div className="text-center py-4 text-green-600">
              <p>You have been successfully authenticated!</p>
              <p className="text-muted-foreground text-sm mt-2">Redirecting to dashboard...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

