import { ethers } from "ethers"
import { SUPPORTED_NETWORKS, DEFAULT_NETWORK } from "./config"

// Wallet connection types
export type WalletType = "metamask" | "walletconnect" | "coinbase" | "magic"

// Wallet connection status
export type WalletStatus = "disconnected" | "connecting" | "connected" | "error"

// Wallet connection error
export type WalletError = {
  code: string
  message: string
}

// Wallet connection result
export type WalletConnection = {
  status: WalletStatus
  address?: string
  chainId?: number
  provider?: ethers.providers.Web3Provider
  signer?: ethers.Signer
  error?: WalletError
}

// Connect to wallet
export async function connectWallet(
  walletType: WalletType,
  networkId: string = DEFAULT_NETWORK,
): Promise<WalletConnection> {
  try {
    const targetNetwork = SUPPORTED_NETWORKS[networkId]

    if (!targetNetwork) {
      throw new Error(`Network ${networkId} not supported`)
    }

    // Connect based on wallet type
    switch (walletType) {
      case "metamask":
        return await connectMetamask(targetNetwork)
      case "walletconnect":
        return await connectWalletConnect(targetNetwork)
      case "coinbase":
        return await connectCoinbase(targetNetwork)
      case "magic":
        return await connectMagic(targetNetwork)
      default:
        throw new Error(`Wallet type ${walletType} not supported`)
    }
  } catch (error: any) {
    console.error("Wallet connection error:", error)
    return {
      status: "error",
      error: {
        code: error.code || "UNKNOWN_ERROR",
        message: error.message || "Unknown error occurred while connecting wallet",
      },
    }
  }
}

// Connect to MetaMask
async function connectMetamask(network: any): Promise<WalletConnection> {
  if (!window.ethereum) {
    return {
      status: "error",
      error: {
        code: "NO_ETHEREUM_PROVIDER",
        message: "MetaMask not installed. Please install MetaMask to continue.",
      },
    }
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

    // Get provider and signer
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    // Get chain ID
    const { chainId } = await provider.getNetwork()

    // Check if connected to the correct network
    if (chainId !== network.id) {
      // Try to switch to the correct network
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${network.id.toString(16)}` }],
        })
      } catch (switchError: any) {
        // If the network is not added to MetaMask, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${network.id.toString(16)}`,
                chainName: network.name,
                nativeCurrency: {
                  name: network.currency,
                  symbol: network.currency,
                  decimals: 18,
                },
                rpcUrls: [network.rpcUrl],
                blockExplorerUrls: [network.blockExplorer],
              },
            ],
          })
        } else {
          throw switchError
        }
      }
    }

    return {
      status: "connected",
      address: accounts[0],
      chainId: network.id,
      provider,
      signer,
    }
  } catch (error: any) {
    return {
      status: "error",
      error: {
        code: error.code || "METAMASK_CONNECTION_ERROR",
        message: error.message || "Error connecting to MetaMask",
      },
    }
  }
}

// Connect to WalletConnect
async function connectWalletConnect(network: any): Promise<WalletConnection> {
  // In a real implementation, you would use the WalletConnect library
  // For now, we'll return a placeholder
  return {
    status: "error",
    error: {
      code: "NOT_IMPLEMENTED",
      message: "WalletConnect integration not implemented yet",
    },
  }
}

// Connect to Coinbase Wallet
async function connectCoinbase(network: any): Promise<WalletConnection> {
  // In a real implementation, you would use the Coinbase Wallet SDK
  // For now, we'll return a placeholder
  return {
    status: "error",
    error: {
      code: "NOT_IMPLEMENTED",
      message: "Coinbase Wallet integration not implemented yet",
    },
  }
}

// Connect to Magic Link
async function connectMagic(network: any): Promise<WalletConnection> {
  // In a real implementation, you would use the Magic SDK
  // For now, we'll return a placeholder
  return {
    status: "error",
    error: {
      code: "NOT_IMPLEMENTED",
      message: "Magic Link integration not implemented yet",
    },
  }
}

// Disconnect wallet
export function disconnectWallet(): void {
  // For most wallets, there's no explicit disconnect method
  // We just clear the local state
  console.log("Wallet disconnected")
}

// Check if wallet is connected
export async function isWalletConnected(): Promise<boolean> {
  if (!window.ethereum) {
    return false
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_accounts" })
    return accounts.length > 0
  } catch (error) {
    console.error("Error checking wallet connection:", error)
    return false
  }
}

