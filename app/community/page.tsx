import { CommunityProjects } from "@/components/community-projects"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { LanguageToggle } from "@/components/language-toggle"

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <MainNav />
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <UserNav />
          </div>
        </div>
      </header>
      <main className="flex-1 container py-10">
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Community Projects</h2>
          </div>
          <p className="text-muted-foreground">Explore and participate in Dominican Web3 community initiatives.</p>
          <CommunityProjects />
        </div>
      </main>
    </div>
  )
}

