// Network configuration for supported blockchains
export type NetworkConfig = {
  id: number
  name: string
  currency: string
  rpcUrl: string
  blockExplorer: string
  isTestnet: boolean
}

// Supported networks for the application
export const SUPPORTED_NETWORKS: Record<string, NetworkConfig> = {
  ethereum: {
    id: 1,
    name: "Ethereum Mainnet",
    currency: "ETH",
    rpcUrl: process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/your-api-key",
    blockExplorer: "https://etherscan.io",
    isTestnet: false,
  },
  polygon: {
    id: 137,
    name: "Polygon Mainnet",
    currency: "MATIC",
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "https://polygon-mainnet.g.alchemy.com/v2/your-api-key",
    blockExplorer: "https://polygonscan.com",
    isTestnet: false,
  },
  // Testnets
  sepolia: {
    id: 11155111,
    name: "Sepolia Testnet",
    currency: "ETH",
    rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/your-api-key",
    blockExplorer: "https://sepolia.etherscan.io",
    isTestnet: true,
  },
  amoy: {
    id: 80002,
    name: "Amoy Testnet",
    currency: "MATIC",
    rpcUrl: process.env.NEXT_PUBLIC_AMOY_RPC_URL || "https://polygon-amoy.g.alchemy.com/v2/your-api-key",
    blockExplorer: "https://amoy.polygonscan.com",
    isTestnet: true,
  },
}

// Default network to use
export const DEFAULT_NETWORK = "ethereum"

// Dominican tokens configuration
export type TokenConfig = {
  address: string
  name: string
  symbol: string
  decimals: number
  logo: string
  network: string
  isNative?: boolean
}

// List of Dominican tokens across networks
export const DOMINICAN_TOKENS: Record<string, TokenConfig> = {
  domcoin: {
    address: "0x1234567890123456789012345678901234567890", // Replace with actual contract address
    name: "DomCoin",
    symbol: "DMC",
    decimals: 18,
    logo: "/tokens/domcoin.png", // Replace with actual logo path
    network: "ethereum",
  },
  santotoken: {
    address: "0x2345678901234567890123456789012345678901", // Replace with actual contract address
    name: "Santo Token",
    symbol: "SANTO",
    decimals: 18,
    logo: "/tokens/santotoken.png", // Replace with actual logo path
    network: "polygon",
  },
  caribecoin: {
    address: "0x3456789012345678901234567890123456789012", // Replace with actual contract address
    name: "CaribeCoin",
    symbol: "CARI",
    decimals: 18,
    logo: "/tokens/caribecoin.png", // Replace with actual logo path
    network: "ethereum",
  },
  puntacoin: {
    address: "0x4567890123456789012345678901234567890123", // Replace with actual contract address
    name: "PuntaCoin",
    symbol: "PUNTA",
    decimals: 18,
    logo: "/tokens/puntacoin.png", // Replace with actual logo path
    network: "ethereum",
  },
  samanacoin: {
    address: "0x5678901234567890123456789012345678901234", // Replace with actual contract address
    name: "SamanaCoin",
    symbol: "SAMA",
    decimals: 18,
    logo: "/tokens/samanacoin.png", // Replace with actual logo path
    network: "polygon",
  },
}

// NFT Marketplace configuration
export type NFTMarketplaceConfig = {
  address: string
  name: string
  network: string
}

export const NFT_MARKETPLACES: Record<string, NFTMarketplaceConfig> = {
  dominicanNFTMarket: {
    address: "0x6789012345678901234567890123456789012345", // Replace with actual contract address
    name: "Dominican NFT Marketplace",
    network: "ethereum",
  },
  caribbeanArtCollection: {
    address: "0x7890123456789012345678901234567890123456", // Replace with actual contract address
    name: "Caribbean Art Collection",
    network: "polygon",
  },
}

// Community project contracts
export type CommunityProjectConfig = {
  address: string
  name: string
  network: string
  type: "DAO" | "NFT" | "DeFi" | "Guild"
}

export const COMMUNITY_PROJECTS: Record<string, CommunityProjectConfig> = {
  dominicanBlockchainAssociation: {
    address: "0x8901234567890123456789012345678901234567", // Replace with actual contract address
    name: "Dominican Blockchain Association",
    network: "ethereum",
    type: "DAO",
  },
  drNFTArtistsCollective: {
    address: "0x9012345678901234567890123456789012345678", // Replace with actual contract address
    name: "DR NFT Artists Collective",
    network: "polygon",
    type: "NFT",
  },
  puntaCanaDeFiHub: {
    address: "0x0123456789012345678901234567890123456789", // Replace with actual contract address
    name: "Punta Cana DeFi Hub",
    network: "ethereum",
    type: "DeFi",
  },
  santoDomingoDevelopersGuild: {
    address: "0xa123456789012345678901234567890123456789", // Replace with actual contract address
    name: "Santo Domingo Developers Guild",
    network: "ethereum",
    type: "Guild",
  },
}

