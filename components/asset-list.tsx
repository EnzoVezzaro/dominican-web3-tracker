"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react"
import { fetchTokenPrices } from "@/lib/api/price-service"
import { DOMINICAN_TOKENS } from "@/lib/blockchain/config"
import { Skeleton } from "@/components/ui/skeleton"

interface AssetListProps {
  limit?: number
}

export function AssetList({ limit }: AssetListProps) {
  const [assets, setAssets] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAssets = async () => {
      setIsLoading(true)
      try {
        // Get token symbols
        const symbols = Object.values(DOMINICAN_TOKENS).map((token) => token.symbol)

        // Fetch token prices
        const prices = await fetchTokenPrices(symbols)

        // Combine token data with price data
        const assetData = Object.values(DOMINICAN_TOKENS).map((token) => {
          const priceData = prices[token.symbol.toLowerCase()]
          return {
            ...token,
            price: priceData?.price || 0,
            change: priceData?.change24h || 0,
            marketCap: priceData?.marketCap || 0,
            volume: priceData?.volume24h || 0,
          }
        })

        // Sort by market cap (descending)
        assetData.sort((a, b) => b.marketCap - a.marketCap)

        // Apply limit if provided
        const limitedAssets = limit ? assetData.slice(0, limit) : assetData

        setAssets(limitedAssets)
      } catch (error) {
        console.error("Error fetching assets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAssets()
  }, [limit])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(limit || 5)].map((_, index) => (
          <div key={index} className="grid grid-cols-7 gap-4 p-4 text-sm border-b">
            <div className="col-span-2 flex items-center">
              <Skeleton className="w-8 h-8 rounded-full mr-2" />
              <div>
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
            <Skeleton className="h-4 w-16 self-center justify-self-end" />
            <Skeleton className="h-4 w-16 self-center justify-self-end" />
            <Skeleton className="h-4 w-20 self-center justify-self-end hidden md:block" />
            <Skeleton className="h-4 w-20 self-center justify-self-end hidden md:block" />
            <div className="self-center justify-self-end">
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-0">
      <div className="grid grid-cols-7 gap-4 p-4 text-sm font-medium border-b">
        <div className="col-span-2">Name</div>
        <div className="text-right">Price</div>
        <div className="text-right">24h Change</div>
        <div className="hidden text-right md:block">Market Cap</div>
        <div className="hidden text-right md:block">Volume (24h)</div>
        <div className="text-right"></div>
      </div>

      {assets.map((asset) => (
        <div key={asset.symbol} className="grid grid-cols-7 gap-4 p-4 text-sm hover:bg-muted/50 border-b">
          <div className="col-span-2 flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
              {asset.symbol.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{asset.name}</div>
              <div className="text-muted-foreground">{asset.symbol}</div>
            </div>
          </div>
          <div className="text-right font-medium self-center">${asset.price.toFixed(2)}</div>
          <div className={`text-right self-center font-medium ${asset.change > 0 ? "text-green-500" : "text-red-500"}`}>
            <span className="flex items-center justify-end">
              {asset.change > 0 ? (
                <ArrowUpRight className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownRight className="mr-1 h-4 w-4" />
              )}
              {Math.abs(asset.change).toFixed(2)}%
            </span>
          </div>
          <div className="hidden text-right self-center md:block">${(asset.marketCap / 1000000).toFixed(1)}M</div>
          <div className="hidden text-right self-center md:block">${(asset.volume / 1000000).toFixed(1)}M</div>
          <div className="text-right self-center">
            <Button variant="ghost" size="icon" asChild>
              <a href={`https://etherscan.io/token/${asset.address}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

