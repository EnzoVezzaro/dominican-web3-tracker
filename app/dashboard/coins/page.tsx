import { CoinOverview } from "@/components/coin-overview"

export default function CoinsPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Coin Tracker</h2>
      </div>
      <p className="text-muted-foreground">Track Dominican-based cryptocurrencies and tokens in real-time.</p>
      <CoinOverview />
    </div>
  )
}

