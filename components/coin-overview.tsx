"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react"

export function CoinOverview() {
  // Mock data for Dominican coins
  const coins = [
    {
      id: "domcoin",
      name: "DomCoin",
      symbol: "DMC",
      price: 2.34,
      change: 5.67,
      marketCap: 12500000,
      volume: 3400000,
    },
    {
      id: "santotoken",
      name: "Santo Token",
      symbol: "SANTO",
      price: 0.78,
      change: -2.31,
      marketCap: 5600000,
      volume: 890000,
    },
    {
      id: "caribecoin",
      name: "CaribeCoin",
      symbol: "CARI",
      price: 1.45,
      change: 8.92,
      marketCap: 8900000,
      volume: 1200000,
    },
    {
      id: "puntacoin",
      name: "PuntaCoin",
      symbol: "PUNTA",
      price: 0.34,
      change: -1.23,
      marketCap: 2300000,
      volume: 450000,
    },
    {
      id: "samanacoin",
      name: "SamanaCoin",
      symbol: "SAMA",
      price: 0.56,
      change: 3.45,
      marketCap: 3400000,
      volume: 670000,
    },
  ]

  const [timeframe, setTimeframe] = useState("1d")

  return (
    <div className="space-y-4">
      <Tabs defaultValue="1d" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="1h" onClick={() => setTimeframe("1h")}>
              1H
            </TabsTrigger>
            <TabsTrigger value="1d" onClick={() => setTimeframe("1d")}>
              1D
            </TabsTrigger>
            <TabsTrigger value="1w" onClick={() => setTimeframe("1w")}>
              1W
            </TabsTrigger>
            <TabsTrigger value="1m" onClick={() => setTimeframe("1m")}>
              1M
            </TabsTrigger>
            <TabsTrigger value="1y" onClick={() => setTimeframe("1y")}>
              1Y
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      <div className="rounded-md border">
        <div className="grid grid-cols-7 gap-4 p-4 text-sm font-medium">
          <div className="col-span-2">Name</div>
          <div className="text-right">Price</div>
          <div className="text-right">24h Change</div>
          <div className="hidden text-right md:block">Market Cap</div>
          <div className="hidden text-right md:block">Volume (24h)</div>
          <div className="text-right"></div>
        </div>
        {coins.map((coin) => (
          <div key={coin.id} className="grid grid-cols-7 gap-4 p-4 text-sm hover:bg-muted/50">
            <div className="col-span-2 flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                {coin.symbol.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{coin.name}</div>
                <div className="text-muted-foreground">{coin.symbol}</div>
              </div>
            </div>
            <div className="text-right font-medium self-center">${coin.price.toFixed(2)}</div>
            <div
              className={`text-right self-center font-medium ${coin.change > 0 ? "text-green-500" : "text-red-500"}`}
            >
              <span className="flex items-center justify-end">
                {coin.change > 0 ? (
                  <ArrowUpRight className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownRight className="mr-1 h-4 w-4" />
                )}
                {Math.abs(coin.change).toFixed(2)}%
              </span>
            </div>
            <div className="hidden text-right self-center md:block">${(coin.marketCap / 1000000).toFixed(1)}M</div>
            <div className="hidden text-right self-center md:block">${(coin.volume / 1000000).toFixed(1)}M</div>
            <div className="text-right self-center">
              <Button variant="ghost" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

