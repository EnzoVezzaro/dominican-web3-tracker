// Service for fetching token prices from external APIs

// Price data type
export type PriceData = {
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  lastUpdated: string
}

// Token price map
export type TokenPriceMap = Record<string, PriceData>

// Fetch token prices from CoinGecko
export async function fetchTokenPrices(symbols: string[]): Promise<TokenPriceMap> {
  try {
    // In a real implementation, you would call the CoinGecko API
    // For now, we'll return mock data
    const mockPrices: TokenPriceMap = {}

    for (const symbol of symbols) {
      // Generate random price data
      mockPrices[symbol.toLowerCase()] = {
        price: Math.random() * 10,
        change24h: Math.random() * 20 - 10, // -10% to +10%
        volume24h: Math.random() * 10000000,
        marketCap: Math.random() * 100000000,
        lastUpdated: new Date().toISOString(),
      }
    }

    return mockPrices
  } catch (error) {
    console.error("Error fetching token prices:", error)
    throw new Error("Failed to fetch token prices")
  }
}

// Fetch historical price data for a token
export async function fetchTokenHistoricalData(
  symbol: string,
  days = 7,
): Promise<{ timestamp: number; price: number }[]> {
  try {
    // In a real implementation, you would call the CoinGecko API
    // For now, we'll return mock data
    const mockData = []
    const now = Date.now()
    const dayMs = 24 * 60 * 60 * 1000

    // Generate random price data for the specified number of days
    let price = Math.random() * 10

    for (let i = days; i >= 0; i--) {
      const timestamp = now - i * dayMs
      // Random price change between -5% and +5%
      const change = Math.random() * 10 - 5
      price = price * (1 + change / 100)

      mockData.push({
        timestamp,
        price,
      })
    }

    return mockData
  } catch (error) {
    console.error("Error fetching historical price data:", error)
    throw new Error("Failed to fetch historical price data")
  }
}

// Fetch market overview data
export async function fetchMarketOverview(): Promise<{
  totalMarketCap: number
  totalVolume24h: number
  btcDominance: number
  ethDominance: number
  trending: string[]
}> {
  try {
    // In a real implementation, you would call the CoinGecko API
    // For now, we'll return mock data
    return {
      totalMarketCap: 1.23e12, // $1.23 trillion
      totalVolume24h: 58.7e9, // $58.7 billion
      btcDominance: 42.5,
      ethDominance: 18.3,
      trending: ["DMC", "SANTO", "CARI"],
    }
  } catch (error) {
    console.error("Error fetching market overview:", error)
    throw new Error("Failed to fetch market overview")
  }
}

