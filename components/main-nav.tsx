"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

export function MainNav() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const routes = [
    {
      href: "/",
      label: t("nav.home"),
      active: pathname === "/",
    },
    {
      href: "/dashboard",
      label: t("nav.dashboard"),
      active: pathname === "/dashboard" || pathname.startsWith("/dashboard/"),
    },
    {
      href: "/marketplace",
      label: t("nav.marketplace"),
      active: pathname === "/marketplace" || pathname.startsWith("/marketplace/"),
    },
    {
      href: "/community",
      label: t("nav.community"),
      active: pathname === "/community" || pathname.startsWith("/community/"),
    },
    {
      href: "/education",
      label: t("nav.education"),
      active: pathname === "/education" || pathname.startsWith("/education/"),
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="flex items-center space-x-2 font-bold">
        <span className="hidden sm:inline-block text-xl">🇩🇴 DomWeb3</span>
      </Link>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

