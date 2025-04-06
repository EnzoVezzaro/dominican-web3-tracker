"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar } from "lucide-react"

export function CommunityProjects() {
  // Mock data for Dominican community projects
  const projects = [
    {
      id: "project1",
      name: "Dominican Blockchain Association",
      description: "A community-driven organization promoting blockchain adoption in the Dominican Republic.",
      members: 120,
      progress: 75,
      category: "DAO",
      startDate: "2023-01-15",
      endDate: "2024-01-15",
    },
    {
      id: "project2",
      name: "DR NFT Artists Collective",
      description: "A group of Dominican artists creating and promoting NFTs representing Dominican culture.",
      members: 45,
      progress: 60,
      category: "NFT",
      startDate: "2023-03-10",
      endDate: "2023-12-31",
    },
    {
      id: "project3",
      name: "Punta Cana DeFi Hub",
      description: "Building decentralized finance solutions tailored for the Dominican tourism industry.",
      members: 78,
      progress: 40,
      category: "DeFi",
      startDate: "2023-05-22",
      endDate: "2024-05-22",
    },
    {
      id: "project4",
      name: "Santo Domingo Developers Guild",
      description: "A community of Web3 developers building the future of blockchain in the Dominican Republic.",
      members: 92,
      progress: 85,
      category: "Guild",
      startDate: "2022-11-05",
      endDate: "2023-11-05",
    },
  ]

  return (
    <div className="space-y-4">
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="dao">DAOs</TabsTrigger>
          <TabsTrigger value="nft">NFT Projects</TabsTrigger>
          <TabsTrigger value="defi">DeFi Projects</TabsTrigger>
          <TabsTrigger value="guild">Guilds</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{project.name}</CardTitle>
                    <Badge>{project.category}</Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{project.members} members</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(project.startDate).toLocaleDateString()} -{" "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Join Project</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="dao">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects
              .filter((p) => p.category === "DAO")
              .map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle>{project.name}</CardTitle>
                      <Badge>{project.category}</Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{project.members} members</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {new Date(project.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Join Project</Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
        {/* Similar content for other tabs */}
      </Tabs>
    </div>
  )
}

