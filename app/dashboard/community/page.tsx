import { CommunityProjects } from "@/components/community-projects"

export default function CommunityPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Community Projects</h2>
      </div>
      <p className="text-muted-foreground">Explore and participate in Dominican Web3 community initiatives.</p>
      <CommunityProjects />
    </div>
  )
}

