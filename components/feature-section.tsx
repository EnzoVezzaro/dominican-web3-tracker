"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, Image, Users, BarChart3 } from "lucide-react"

export function FeatureSection() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Coins className="h-10 w-10 text-primary" />,
      title: t("features.coins.title"),
      description: t("features.coins.description"),
    },
    {
      icon: <Image className="h-10 w-10 text-primary" />,
      title: t("features.nft.title"),
      description: t("features.nft.description"),
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: t("features.community.title"),
      description: t("features.community.description"),
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-primary" />,
      title: t("features.analytics.title"),
      description: t("features.analytics.description"),
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-all">
              <CardHeader>
                <div className="p-2 w-fit rounded-lg bg-primary/10 mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

