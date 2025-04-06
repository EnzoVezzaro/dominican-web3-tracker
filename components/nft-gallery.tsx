"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

export function NFTGallery() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for Dominican NFTs
  const nfts = [
    {
      id: "nft1",
      name: "Dominican Sunset",
      creator: "ArtistDR",
      image: "/placeholder.svg?height=400&width=400",
      price: 0.5,
      currency: "ETH",
    },
    {
      id: "nft2",
      name: "Punta Cana Beach",
      creator: "CaribbeanArt",
      image: "/placeholder.svg?height=400&width=400",
      price: 0.3,
      currency: "ETH",
    },
    {
      id: "nft3",
      name: "Colonial Zone",
      creator: "HistoryNFT",
      image: "/placeholder.svg?height=400&width=400",
      price: 0.8,
      currency: "ETH",
    },
    {
      id: "nft4",
      name: "Dominican Mountains",
      creator: "NatureDR",
      image: "/placeholder.svg?height=400&width=400",
      price: 0.4,
      currency: "ETH",
    },
    {
      id: "nft5",
      name: "Caribbean Waves",
      creator: "OceanArt",
      image: "/placeholder.svg?height=400&width=400",
      price: 0.6,
      currency: "ETH",
    },
    {
      id: "nft6",
      name: "Santo Domingo Skyline",
      creator: "CityVibes",
      image: "/placeholder.svg?height=400&width=400",
      price: 0.7,
      currency: "ETH",
    },
  ]

  const filteredNfts = nfts.filter(
    (nft) =>
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.creator.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search NFTs or creators..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All NFTs</TabsTrigger>
          <TabsTrigger value="owned">Owned</TabsTrigger>
          <TabsTrigger value="created">Created</TabsTrigger>
          <TabsTrigger value="favorited">Favorited</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNfts.map((nft) => (
              <Card key={nft.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    fill
                    className="object-cover transition-all hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{nft.name}</h3>
                      <p className="text-sm text-muted-foreground">By {nft.creator}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {nft.price} {nft.currency}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="owned">
          <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="font-medium">No owned NFTs</h3>
              <p className="text-sm text-muted-foreground">Connect your wallet to view your NFTs</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="created">
          <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="font-medium">No created NFTs</h3>
              <p className="text-sm text-muted-foreground">Start creating your own NFTs</p>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="favorited">
          <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
            <div className="text-center">
              <h3 className="font-medium">No favorited NFTs</h3>
              <p className="text-sm text-muted-foreground">Add NFTs to your favorites</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

