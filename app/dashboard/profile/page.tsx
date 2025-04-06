"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { NFTGallery } from "@/components/nft-gallery"
import { RecentActivity } from "@/components/recent-activity"

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "John Doe",
    email: "john@example.com",
    bio: "Web3 enthusiast and NFT collector from Santo Domingo.",
    joinedDate: "January 2023",
    stats: {
      nftsOwned: 12,
      projectsJoined: 3,
      following: 45,
      followers: 28,
    },
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt={user.name} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Bio</h3>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Member Since</h3>
              <p className="text-sm text-muted-foreground">{user.joinedDate}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">NFTs Owned</p>
                <p className="text-2xl font-bold">{user.stats.nftsOwned}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Projects Joined</p>
                <p className="text-2xl font-bold">{user.stats.projectsJoined}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Following</p>
                <p className="text-2xl font-bold">{user.stats.following}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Followers</p>
                <p className="text-2xl font-bold">{user.stats.followers}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge>NFT Collector</Badge>
              <Badge>DeFi Explorer</Badge>
              <Badge>Community Member</Badge>
            </div>
            <Button className="w-full">Edit Profile</Button>
          </CardContent>
        </Card>
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent transactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="nfts" className="w-full">
        <TabsList>
          <TabsTrigger value="nfts">My NFTs</TabsTrigger>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="staking">Staking</TabsTrigger>
        </TabsList>
        <TabsContent value="nfts" className="space-y-4">
          <NFTGallery />
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="font-medium">No projects joined yet</h3>
              <p className="text-sm text-muted-foreground">Join community projects to see them here</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="staking" className="space-y-4">
          <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="font-medium">No active staking</h3>
              <p className="text-sm text-muted-foreground">Stake your tokens to earn rewards</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

