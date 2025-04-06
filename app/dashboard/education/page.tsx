import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Video, FileText } from "lucide-react"

export default function EducationPage() {
  // Mock educational resources
  const resources = [
    {
      id: "edu1",
      title: "Introduction to Blockchain",
      description: "Learn the basics of blockchain technology and how it works.",
      type: "article",
      level: "beginner",
      icon: <FileText className="h-6 w-6" />,
    },
    {
      id: "edu2",
      title: "Setting Up Your First Wallet",
      description: "A step-by-step guide to creating and securing your crypto wallet.",
      type: "tutorial",
      level: "beginner",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      id: "edu3",
      title: "NFT Creation Workshop",
      description: "Learn how to create and mint your first NFT as a Dominican artist.",
      type: "video",
      level: "intermediate",
      icon: <Video className="h-6 w-6" />,
    },
    {
      id: "edu4",
      title: "DeFi Explained",
      description: "Understanding decentralized finance and its applications in the Dominican Republic.",
      type: "article",
      level: "intermediate",
      icon: <FileText className="h-6 w-6" />,
    },
  ]

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Educational Resources</h2>
      </div>
      <p className="text-muted-foreground">Learn about blockchain, Web3, and the Dominican crypto ecosystem.</p>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {resources.map((resource) => (
              <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10">{resource.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{resource.description}</CardDescription>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs uppercase font-medium text-muted-foreground">{resource.type}</span>
                    <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">{resource.level}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="beginner" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {resources
              .filter((r) => r.level === "beginner")
              .map((resource) => (
                <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10">{resource.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{resource.description}</CardDescription>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs uppercase font-medium text-muted-foreground">{resource.type}</span>
                      <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">{resource.level}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="intermediate" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {resources
              .filter((r) => r.level === "intermediate")
              .map((resource) => (
                <Card key={resource.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10">{resource.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{resource.description}</CardDescription>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs uppercase font-medium text-muted-foreground">{resource.type}</span>
                      <span className="text-xs bg-primary/10 px-2 py-1 rounded-full">{resource.level}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
        <TabsContent value="advanced" className="space-y-4">
          <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="font-medium">No advanced resources yet</h3>
              <p className="text-sm text-muted-foreground">Check back soon for advanced tutorials and guides</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

