"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

type User = {
  email: string
  name?: string
  walletAddress?: string
} | null

type AuthContextType = {
  user: User
  isLoading: boolean
  login: (email: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const PUBLIC_PATHS = ["/login", "/signup", "/magic-link"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real implementation, this would check with Magic Link SDK
        // For now, we'll use localStorage to simulate authentication
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        } else {
          setUser(null)

          // Redirect to login if accessing protected route
          if (pathname && !PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
            router.push("/login")
          }
        }
      } catch (error) {
        console.error("Authentication error:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  const login = async (email: string) => {
    setIsLoading(true)
    try {
      // In a real implementation, this would use Magic Link SDK
      // For now, we'll simulate the authentication process

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create mock user
      const mockUser = {
        email,
        name: email.split("@")[0],
        walletAddress: "0x1234...5678",
      }

      // Store in localStorage to persist across refreshes
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)

      toast({
        title: "Login successful",
        description: "Welcome to Dominican Web3 Tracker!",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "There was a problem logging in. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/login")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

