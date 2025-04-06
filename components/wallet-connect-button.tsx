"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Wallet, ChevronDown, AlertCircle } from "lucide-react"
import {
  connectWallet,
  disconnectWallet,
  isWalletConnected,
  type WalletType,
  type WalletConnection,
} from "@/lib/blockchain/wallet-connector"
import { formatAddress } from "@/lib/blockchain/provider"
import { useToast } from "@/components/ui/use-toast"

interface WalletConnectButtonProps {
  onConnect?: (connection: WalletConnection) => void
  onDisconnect?: () => void
  className?: string
}

export function WalletConnectButton({ onConnect, onDisconnect, className }: WalletConnectButtonProps) {
  const [connection, setConnection] = useState<WalletConnection>({ status: "disconnected" })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await isWalletConnected()
      if (connected) {
        // If connected, get the connection details
        handleConnect("metamask") // Assuming MetaMask is the default
      }
    }

    checkConnection()
  }, [])

  const handleConnect = async (walletType: WalletType) => {
    setIsLoading(true)
    try {
      const result = await connectWallet(walletType)
      setConnection(result)

      if (result.status === "connected" && result.address) {
        toast({
          title: "Wallet Connected",
          description: `Connected to ${formatAddress(result.address)}`,
        })

        if (onConnect) {
          onConnect(result)
        }
      } else if (result.status === "error" && result.error) {
        toast({
          title: "Connection Error",
          description: result.error.message,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Connection Error",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    disconnectWallet()
    setConnection({ status: "disconnected" })
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })

    if (onDisconnect) {
      onDisconnect()
    }
  }

  // If connected, show address and disconnect option
  if (connection.status === "connected" && connection.address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={className}>
            <Wallet className="mr-2 h-4 w-4" />
            {formatAddress(connection.address)}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDisconnect}>Disconnect Wallet</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // If connecting, show loading state
  if (isLoading || connection.status === "connecting") {
    return (
      <Button disabled className={className}>
        <svg
          className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Connecting...
      </Button>
    )
  }

  // If error, show error state
  if (connection.status === "error" && connection.error) {
    return (
      <Button variant="destructive" className={className} onClick={() => handleConnect("metamask")}>
        <AlertCircle className="mr-2 h-4 w-4" />
        Retry Connection
      </Button>
    )
  }

  // Default: show connect options
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className}>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleConnect("metamask")}>MetaMask</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleConnect("walletconnect")}>WalletConnect</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleConnect("coinbase")}>Coinbase Wallet</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleConnect("magic")}>Magic Link</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

