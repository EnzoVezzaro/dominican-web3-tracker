"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface RecentActivityProps {
  limit?: number
}

export function RecentActivity({ limit }: RecentActivityProps) {
  // Mock data for recent activity
  const activities = [
    {
      id: "act1",
      type: "purchase",
      title: "Purchased DomCoin",
      description: "You purchased 10 DMC for $23.40",
      time: "2 hours ago",
      icon: "D",
    },
    {
      id: "act2",
      type: "nft",
      title: "NFT Listed",
      description: "Dominican Sunset listed for 0.5 ETH",
      time: "Yesterday",
      icon: "N",
    },
    {
      id: "act3",
      type: "stake",
      title: "Staking Reward",
      description: "Received 2.5 SANTO tokens as staking reward",
      time: "2 days ago",
      icon: "S",
    },
    {
      id: "act4",
      type: "community",
      title: "Joined Project",
      description: "You joined Dominican Blockchain Association",
      time: "1 week ago",
      icon: "C",
    },
    {
      id: "act5",
      type: "send",
      title: "Sent Tokens",
      description: "You sent 5 CARI to 0xabc...def",
      time: "1 week ago",
      icon: "C",
    },
    {
      id: "act6",
      type: "receive",
      title: "Received Tokens",
      description: "You received 0.1 ETH from 0xghi...jkl",
      time: "2 weeks ago",
      icon: "E",
    },
  ]

  const displayActivities = limit ? activities.slice(0, limit) : activities

  return (
    <div className="space-y-6">
      {displayActivities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <Avatar className="h-9 w-9 mr-4">
            <AvatarImage src="" alt={activity.type} />
            <AvatarFallback className="bg-primary/10 text-primary">{activity.icon}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{activity.title}</p>
              <Badge variant="outline" className="text-xs">
                {activity.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

