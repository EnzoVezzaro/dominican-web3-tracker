"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getContract } from "@/lib/blockchain/provider"
import { ERC20_ABI } from "@/lib/blockchain/abis/ERC20"
import { ethers } from "ethers"

interface TokenBalanceProps {
  address: string
  tokenAddress: string
  tokenSymbol: string
  tokenDecimals?: number
  network?: string
  className?: string
}

export function TokenBalance({
  address,
  tokenAddress,
  tokenSymbol,
  tokenDecimals = 18,
  network,
  className,
}: TokenBalanceProps) {
  const [balance, setBalance] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBalance = async () => {
      if (!address || !tokenAddress) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const tokenContract = getContract(tokenAddress, ERC20_ABI, network)
        const rawBalance = await tokenContract.balanceOf(address)
        const formattedBalance = ethers.utils.formatUnits(rawBalance, tokenDecimals)
        setBalance(formattedBalance)
      } catch (err: any) {
        console.error("Error fetching token balance:", err)
        setError(err.message || "Failed to fetch balance")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalance()
  }, [address, tokenAddress, tokenDecimals, network])

  if (isLoading) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="p-4">
          <div className="text-destructive text-sm">Error: {error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">{tokenSymbol}</span>
          <span className="font-medium">{balance ? Number.parseFloat(balance).toFixed(4) : "0.0000"}</span>
        </div>
      </CardContent>
    </Card>
  )
}

