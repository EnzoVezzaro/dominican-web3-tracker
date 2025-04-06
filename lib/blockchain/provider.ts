import { ethers } from "ethers"
import { SUPPORTED_NETWORKS, DEFAULT_NETWORK, type NetworkConfig } from "./config"

// Get provider for a specific network
export function getProvider(networkId?: string): ethers.providers.JsonRpcProvider {
  const network = networkId ? SUPPORTED_NETWORKS[networkId] : SUPPORTED_NETWORKS[DEFAULT_NETWORK]

  if (!network) {
    throw new Error(`Network ${networkId} not supported`)
  }

  return new ethers.providers.JsonRpcProvider(network.rpcUrl)
}

// Get contract instance
export function getContract(address: string, abi: any, networkId?: string, signer?: ethers.Signer): ethers.Contract {
  const provider = getProvider(networkId)
  return new ethers.Contract(address, abi, signer || provider)
}

// Get network details
export function getNetworkDetails(networkId: string): NetworkConfig {
  const network = SUPPORTED_NETWORKS[networkId]

  if (!network) {
    throw new Error(`Network ${networkId} not supported`)
  }

  return network
}

// Format address for display
export function formatAddress(address: string): string {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

// Format amount with token decimals
export function formatAmount(amount: string | number, decimals = 18): string {
  return ethers.utils.formatUnits(amount.toString(), decimals)
}

// Parse amount to token decimals
export function parseAmount(amount: string, decimals = 18): ethers.BigNumber {
  return ethers.utils.parseUnits(amount, decimals)
}

// Get transaction URL for block explorer
export function getTransactionUrl(txHash: string, networkId: string): string {
  const network = SUPPORTED_NETWORKS[networkId]

  if (!network) {
    throw new Error(`Network ${networkId} not supported`)
  }

  return `${network.blockExplorer}/tx/${txHash}`
}

// Get address URL for block explorer
export function getAddressUrl(address: string, networkId: string): string {
  const network = SUPPORTED_NETWORKS[networkId]

  if (!network) {
    throw new Error(`Network ${networkId} not supported`)
  }

  return `${network.blockExplorer}/address/${address}`
}

