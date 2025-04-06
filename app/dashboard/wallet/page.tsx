"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { NetworkSelector } from "@/components/network-selector"
import { TokenBalance } from "@/components/token-balance"
import { TransactionHistory } from "@/components/transaction-history"
import { DOMINICAN_TOKENS } from "@/lib/blockchain/config"
import { formatAddress } from "@/lib/blockchain/provider"
import { Wallet, ArrowUpRight, RefreshCw, Copy, CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function WalletPage() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum")
  const [isCopied, setIsCopied] = useState(false)
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [selectedToken, setSelectedToken] = useState("ETH")
  const { toast } = useToast()

  const handleWalletConnect = (connection: any) => {
    if (connection.status === "connected" && connection.address) {
      setIsConnected(true)
      setWalletAddress(connection.address)
    }
  }

  const handleWalletDisconnect = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  // Update the network selection logic to handle the updated networks
  const handleNetworkChange = (networkId: string) => {
    setSelectedNetwork(networkId)
  }

  const copyToClipboard = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would connect to the blockchain
    toast({
      title: "Transaction Initiated",
      description: `Sending ${sendAmount} ${selectedToken} to ${sendAddress}`,
    })
    // Reset form
    setSendAmount("")
    setSendAddress("")
  }

  // Filter tokens by selected network
  const networkTokens = Object.values(DOMINICAN_TOKENS).filter((token) => token.network === selectedNetwork)

  return (
    <div className="flex-1 space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Wallet</h2>
          <p className="text-muted-foreground">Manage your crypto wallet and transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <NetworkSelector onNetworkChange={handleNetworkChange} currentNetwork={selectedNetwork} />
          <WalletConnectButton onConnect={handleWalletConnect} onDisconnect={handleWalletDisconnect} />
        </div>
      </div>

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>Connect your wallet to view your assets and transactions</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Wallet className="h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-center mb-6">No wallet connected. Connect your wallet to access all features.</p>
            <WalletConnectButton />
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Wallet Overview */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Wallet Overview</CardTitle>
                <Button variant="outline" size="icon" onClick={() => window.location.reload()}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription className="flex items-center">
                <span className="mr-2">Address: {formatAddress(walletAddress)}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={copyToClipboard}>
                  {isCopied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Native token (ETH, MATIC, etc.) */}
                <Card>
                  <CardHeader className="pb-2">
                    {/* Update the native token display logic */}
                    <CardTitle className="text-sm font-medium">
                      {selectedNetwork === "ethereum"
                        ? "ETH"
                        : selectedNetwork === "polygon"
                          ? "MATIC"
                          : selectedNetwork === "sepolia"
                            ? "ETH"
                            : selectedNetwork === "amoy"
                              ? "MATIC"
                              : "ETH"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0.00</div>
                    <p className="text-xs text-muted-foreground">≈ $0.00</p>
                  </CardContent>
                </Card>

                {/* Dominican tokens for the selected network */}
                {networkTokens.slice(0, 3).map((token) => (
                  <TokenBalance
                    key={token.symbol}
                    address={walletAddress}
                    tokenAddress={token.address}
                    tokenSymbol={token.symbol}
                    tokenDecimals={token.decimals}
                    network={selectedNetwork}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="assets" className="w-full">
            <TabsList>
              <TabsTrigger value="assets">Assets</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="send">Send</TabsTrigger>
              <TabsTrigger value="receive">Receive</TabsTrigger>
            </TabsList>

            <TabsContent value="assets" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Your Assets</CardTitle>
                  <CardDescription>All your tokens on {selectedNetwork}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      {networkTokens.map((token) => (
                        <div key={token.symbol} className="flex items-center justify-between p-4 border rounded-md">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                              {token.symbol.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium">{token.name}</p>
                              <p className="text-sm text-muted-foreground">{token.symbol}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">0.00</p>
                            <p className="text-sm text-muted-foreground">≈ $0.00</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              <TransactionHistory address={walletAddress} network={selectedNetwork} />
            </TabsContent>

            <TabsContent value="send" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Send Tokens</CardTitle>
                  <CardDescription>Send tokens to another wallet address</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSend} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="token">Token</Label>
                      <select
                        id="token"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={selectedToken}
                        onChange={(e) => setSelectedToken(e.target.value)}
                      >
                        <option value="ETH">ETH</option>
                        {networkTokens.map((token) => (
                          <option key={token.symbol} value={token.symbol}>
                            {token.symbol}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={sendAmount}
                        onChange={(e) => setSendAmount(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Recipient Address</Label>
                      <Input
                        id="address"
                        placeholder="0x..."
                        value={sendAddress}
                        onChange={(e) => setSendAddress(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Send {selectedToken}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="receive" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Receive Tokens</CardTitle>
                  <CardDescription>Share your wallet address to receive tokens</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-48 h-48 bg-muted rounded-md flex items-center justify-center mb-4">
                    <p className="text-center text-muted-foreground">QR Code will appear here</p>
                  </div>
                  <div className="w-full p-4 bg-muted rounded-md mb-4">
                    <p className="font-mono text-sm break-all">{walletAddress}</p>
                  </div>
                  <Button onClick={copyToClipboard} className="w-full">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Address
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

