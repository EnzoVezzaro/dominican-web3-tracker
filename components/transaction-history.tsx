"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { formatAddress, getTransactionUrl } from "@/lib/blockchain/provider"
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"

// Transaction type
type Transaction = {
  hash: string
  from: string
  to: string
  value: string
  timestamp: number
  status: "success" | "pending" | "failed"
  network: string
  tokenSymbol?: string
  tokenAmount?: string
  type: "send" | "receive" | "swap" | "approve" | "other"
}

interface TransactionHistoryProps {
  address: string
  network?: string
  limit?: number
  className?: string
}

export function TransactionHistory({ address, network = "ethereum", limit = 10, className }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // In a real implementation, you would call an API like Etherscan or Alchemy
        // For now, we'll return mock data
        const mockTransactions: Transaction[] = [
          {
            hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
            from: address,
            to: "0x2345678901abcdef2345678901abcdef2345678901",
            value: "0.1",
            timestamp: Date.now() - 3600000, // 1 hour ago
            status: "success",
            network,
            tokenSymbol: "ETH",
            type: "send",
          },
          {
            hash: "0x2345678901abcdef2345678901abcdef2345678901abcdef2345678901abcdef",
            from: "0x3456789012abcdef3456789012abcdef3456789012",
            to: address,
            value: "50",
            timestamp: Date.now() - 86400000, // 1 day ago
            status: "success",
            network,
            tokenSymbol: "DMC",
            type: "receive",
          },
          {
            hash: "0x3456789012abcdef3456789012abcdef3456789012abcdef3456789012abcdef",
            from: address,
            to: "0x4567890123abcdef4567890123abcdef4567890123",
            value: "25",
            timestamp: Date.now() - 172800000, // 2 days ago
            status: "success",
            network,
            tokenSymbol: "SANTO",
            type: "send",
          },
          {
            hash: "0x4567890123abcdef4567890123abcdef4567890123abcdef4567890123abcdef",
            from: "0x5678901234abcdef5678901234abcdef5678901234",
            to: address,
            value: "10",
            timestamp: Date.now() - 259200000, // 3 days ago
            status: "success",
            network,
            tokenSymbol: "CARI",
            type: "receive",
          },
          {
            hash: "0x5678901234abcdef5678901234abcdef5678901234abcdef5678901234abcdef",
            from: address,
            to: "0x6789012345abcdef6789012345abcdef6789012345",
            value: "0",
            timestamp: Date.now() - 345600000, // 4 days ago
            status: "success",
            network,
            tokenSymbol: "PUNTA",
            tokenAmount: "15",
            type: "approve",
          },
        ]

        setTransactions(mockTransactions.slice(0, limit))
      } catch (err: any) {
        console.error("Error fetching transactions:", err)
        setError(err.message || "Failed to fetch transactions")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactions()
  }, [address, network, limit])

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center">
                <Skeleton className="h-8 w-8 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-4 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-destructive text-sm">Error: {error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No transactions found</div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.hash} className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full p-2 bg-primary/10">
                    {tx.type === "send" ? (
                      <ArrowUpRight className="h-5 w-5 text-red-500" />
                    ) : tx.type === "receive" ? (
                      <ArrowDownLeft className="h-5 w-5 text-green-500" />
                    ) : (
                      <ExternalLink className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">
                      {tx.type === "send"
                        ? `Sent ${tx.value} ${tx.tokenSymbol}`
                        : tx.type === "receive"
                          ? `Received ${tx.value} ${tx.tokenSymbol}`
                          : tx.type === "approve"
                            ? `Approved ${tx.tokenAmount} ${tx.tokenSymbol}`
                            : `Transaction`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {tx.type === "send"
                        ? `To: ${formatAddress(tx.to)}`
                        : tx.type === "receive"
                          ? `From: ${formatAddress(tx.from)}`
                          : `${formatAddress(tx.from)} → ${formatAddress(tx.to)}`}
                      <a
                        href={getTransactionUrl(tx.hash, tx.network)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center text-primary hover:underline"
                      >
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{new Date(tx.timestamp).toLocaleDateString()}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    <Badge
                      variant={
                        tx.status === "success" ? "outline" : tx.status === "pending" ? "secondary" : "destructive"
                      }
                      className="text-xs"
                    >
                      {tx.status}
                    </Badge>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

