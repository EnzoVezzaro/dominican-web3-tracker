# Dominican Web3 Tracker

A comprehensive platform for tracking Dominican-based cryptocurrencies, NFTs, and community projects.

## Features

- **Authentication**: Secure login with Magic Link
- **Dashboard**: Coinbase/Zerion-like interface with portfolio overview
- **Coin Tracker**: Real-time tracking of Dominican cryptocurrencies
- **NFT Gallery**: Browse and manage NFTs from Dominican creators
- **Community Projects**: Explore and participate in Dominican Web3 initiatives
- **Wallet Integration**: Connect with MetaMask, WalletConnect, and more
- **Multi-network Support**: Ethereum and Polygon networks
- **Educational Resources**: Learn about blockchain and Web3

## Blockchain Integration

The application is designed to interact with multiple blockchain networks and smart contracts:

### Supported Networks

- **Ethereum Mainnet**: For major tokens and NFTs
- **Polygon**: For scalable and low-fee transactions
- **Testnets**: Sepolia (Ethereum) and Amoy (Polygon) for testing

### Smart Contract Interactions

The application interacts with the following types of smart contracts:

1. **ERC20 Tokens**: For Dominican cryptocurrencies
2. **NFT Marketplaces**: For buying, selling, and minting NFTs
3. **Community Projects**: For joining and participating in DAOs and other initiatives

### API Services

The application uses several API services:

1. **Price Data**: For real-time cryptocurrency prices and historical data
2. **NFT Metadata**: For fetching NFT information and images
3. **Community Project Data**: For project details and participation metrics

## Development

### Environment Variables

The application requires the following environment variables:

\`\`\`
# Authentication
NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY=pk_live_...

# Blockchain RPC URLs
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-api-key
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/your-api-key
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key
NEXT_PUBLIC_AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/your-api-key

# API Keys
NEXT_PUBLIC_COINGECKO_API_KEY=your-api-key
NEXT_PUBLIC_ALCHEMY_API_KEY=your-api-key
\`\`\`

### Contract Addresses

The application is configured to work with the following contract addresses:

- **DomCoin (DMC)**: `0x1234567890123456789012345678901234567890`
- **Santo Token (SANTO)**: `0x2345678901234567890123456789012345678901`
- **CaribeCoin (CARI)**: `0x3456789012345678901234567890123456789012`
- **PuntaCoin (PUNTA)**: `0x4567890123456789012345678901234567890123`
- **SamanaCoin (SAMA)**: `0x5678901234567890123456789012345678901234`

### NFT Marketplaces

- **Dominican NFT Marketplace**: `0x6789012345678901234567890123456789012345`
- **Caribbean Art Collection**: `0x7890123456789012345678901234567890123456`

### Community Projects

- **Dominican Blockchain Association**: `0x8901234567890123456789012345678901234567`
- **DR NFT Artists Collective**: `0x9012345678901234567890123456789012345678`
- **Punta Cana DeFi Hub**: `0x0123456789012345678901234567890123456789`
- **Santo Domingo Developers Guild**: `0xa123456789012345678901234567890123456789`

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

The application can be deployed to Vercel with the following command:

\`\`\`
vercel
\`\`\`

Make sure to set up the environment variables in your Vercel project settings.

