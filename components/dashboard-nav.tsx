"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"
import { LayoutDashboard, Coins, ImageIcon, Users, Wallet, BookOpen, Settings, User } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/coins",
      label: "Coins",
      icon: <Coins className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/nfts",
      label: "NFTs",
      icon: <ImageIcon className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/community",
      label: "Community",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/wallet",
      label: "Wallet",
      icon: <Wallet className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/education",
      label: "Education",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="grid items-start gap-2 py-4">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <span
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === route.href ? "bg-accent text-accent-foreground" : "transparent",
            )}
          >
            {route.icon}
            <span>{route.label}</span>
          </span>
        </Link>
      ))}
    </nav>
  )
}

