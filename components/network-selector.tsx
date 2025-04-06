"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, ChevronDown } from "lucide-react"
import { SUPPORTED_NETWORKS, DEFAULT_NETWORK } from "@/lib/blockchain/config"

interface NetworkSelectorProps {
  onNetworkChange?: (networkId: string) => void
  currentNetwork?: string
  showTestnets?: boolean
  className?: string
}

export function NetworkSelector({
  onNetworkChange,
  currentNetwork = DEFAULT_NETWORK,
  showTestnets = false,
  className,
}: NetworkSelectorProps) {
  const [selectedNetwork, setSelectedNetwork] = useState(currentNetwork)

  const handleNetworkChange = (networkId: string) => {
    setSelectedNetwork(networkId)
    if (onNetworkChange) {
      onNetworkChange(networkId)
    }
  }

  // Filter networks based on showTestnets flag
  const networks = Object.entries(SUPPORTED_NETWORKS).filter(([_, network]) => showTestnets || !network.isTestnet)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={className}>
          <Globe className="mr-2 h-4 w-4" />
          {SUPPORTED_NETWORKS[selectedNetwork]?.name || "Select Network"}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {networks.map(([id, network]) => (
          <DropdownMenuItem
            key={id}
            onClick={() => handleNetworkChange(id)}
            className={selectedNetwork === id ? "bg-muted" : ""}
          >
            {network.name}
            {network.isTestnet && (
              <span className="ml-2 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-1.5 py-0.5 rounded">
                Testnet
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

