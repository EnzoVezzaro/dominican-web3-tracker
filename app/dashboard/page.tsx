"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { PortfolioChart } from "@/components/portfolio-chart"
import { AssetList } from "@/components/asset-list"
import { RecentActivity } from "@/components/recent-activity"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { NetworkSelector } from "@/components/network-selector"
import { Wallet, ArrowUpRight, ArrowDownRight, TrendingUp, Coins, ImageIcon, Users, BookOpen } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [timeframe, setTimeframe] = useState("1W")
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum")
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  // Mock portfolio data
  const portfolioValue = 3245.67
  const portfolioChange = 5.67
  const portfolioChangeAmount = 174.23

  const handleNetworkChange = (networkId: string) => {
    setSelectedNetwork(networkId)
    // In a real app, you would fetch data for the selected network
    console.log(`Network changed to ${networkId}`)
  }

  const handleWalletConnect = (connection: any) => {
    setIsWalletConnected(true)
    // In a real app, you would fetch wallet data
    console.log("Wallet connected:", connection)
  }

  const handleWalletDisconnect = () => {
    setIsWalletConnected(false)
    console.log("Wallet disconnected")
  }

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{t("nav.dashboard")}</h2>
          <p className="text-muted-foreground">{t("hero.subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <NetworkSelector onNetworkChange={handleNetworkChange} currentNetwork={selectedNetwork} />
          <WalletConnectButton onConnect={handleWalletConnect} onDisconnect={handleWalletDisconnect} />
        </div>
      </div>

      {/* Wallet Connection CTA */}
      {!isWalletConnected && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Wallet className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect your wallet to view your assets and track your portfolio
                  </p>
                </div>
              </div>
              <WalletConnectButton className="w-full md:w-auto" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Portfolio Overview */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Portfolio Value</CardTitle>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold">${portfolioValue.toLocaleString()}</h2>
            <div className={`flex items-center ${portfolioChange >= 0 ? "text-green-500" : "text-red-500"}`}>
              {portfolioChange >= 0 ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4" />
              )}
              <span>
                {portfolioChange}% (${portfolioChangeAmount})
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="1W" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="1D" onClick={() => setTimeframe("1D")}>
                  1D
                </TabsTrigger>
                <TabsTrigger value="1W" onClick={() => setTimeframe("1W")}>
                  1W
                </TabsTrigger>
                <TabsTrigger value="1M" onClick={() => setTimeframe("1M")}>
                  1M
                </TabsTrigger>
                <TabsTrigger value="3M" onClick={() => setTimeframe("3M")}>
                  3M
                </TabsTrigger>
                <TabsTrigger value="1Y" onClick={() => setTimeframe("1Y")}>
                  1Y
                </TabsTrigger>
                <TabsTrigger value="ALL" onClick={() => setTimeframe("ALL")}>
                  ALL
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
          <div className="h-[300px] mt-4">
            <PortfolioChart timeframe={timeframe} />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="col-span-1">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <ArrowUpRight className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Send</h3>
            <p className="text-xs text-muted-foreground mt-1">Transfer assets</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <ArrowDownRight className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Receive</h3>
            <p className="text-xs text-muted-foreground mt-1">Get assets</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <Coins className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Buy</h3>
            <p className="text-xs text-muted-foreground mt-1">Purchase crypto</p>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="rounded-full bg-primary/10 p-3 mb-3">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium">Stake</h3>
            <p className="text-xs text-muted-foreground mt-1">Earn rewards</p>
          </CardContent>
        </Card>
      </div>

      {/* Assets and Activity */}
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Assets</CardTitle>
              <CardDescription>Track your crypto portfolio</CardDescription>
            </div>
            <Link href="/dashboard/coins">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <AssetList limit={5} />
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <RecentActivity limit={5} />
          </CardContent>
        </Card>
      </div>

      {/* Featured Sections */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <ImageIcon className="mr-2 h-5 w-5" />
              Featured NFTs
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">Discover trending Dominican NFTs</p>
            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="aspect-square relative bg-muted rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  NFT Preview
                </div>
              </div>
              <div className="aspect-square relative bg-muted rounded-md overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  NFT Preview
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/nfts" className="w-full">
              <Button variant="outline" className="w-full">
                Explore NFTs
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Community Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">Join Dominican Web3 initiatives</p>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm">Dominican Blockchain Association</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm">DR NFT Artists Collective</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/community" className="w-full">
              <Button variant="outline" className="w-full">
                View Projects
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Learn Web3
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground">Educational resources for beginners</p>
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm">Introduction to Blockchain</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-sm">Setting Up Your First Wallet</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/education" className="w-full">
              <Button variant="outline" className="w-full">
                Start Learning
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

