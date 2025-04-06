// Service for fetching community project data

// Community project data type
export type CommunityProjectData = {
  id: string
  name: string
  description: string
  members: number
  progress: number
  category: "DAO" | "NFT" | "DeFi" | "Guild"
  startDate: string
  endDate: string
  network: string
  contractAddress?: string
  website?: string
  socialLinks?: Record<string, string>
  isJoined?: boolean
}

// Fetch community projects
export async function fetchCommunityProjects(): Promise<CommunityProjectData[]> {
  try {
    // In a real implementation, you would call your backend API
    // For now, we'll return mock data
    return [
      {
        id: "project1",
        name: "Dominican Blockchain Association",
        description: "A community-driven organization promoting blockchain adoption in the Dominican Republic.",
        members: 120,
        progress: 75,
        category: "DAO",
        startDate: "2023-01-15",
        endDate: "2024-01-15",
        network: "ethereum",
        contractAddress: "0x8901234567890123456789012345678901234567",
        website: "https://dominicanblockchain.org",
        socialLinks: {
          twitter: "https://twitter.com/DomBlockchain",
          discord: "https://discord.gg/domblockchain",
        },
      },
      {
        id: "project2",
        name: "DR NFT Artists Collective",
        description: "A group of Dominican artists creating and promoting NFTs representing Dominican culture.",
        members: 45,
        progress: 60,
        category: "NFT",
        startDate: "2023-03-10",
        endDate: "2023-12-31",
        network: "polygon",
        contractAddress: "0x9012345678901234567890123456789012345678",
        website: "https://drnftartists.com",
        socialLinks: {
          twitter: "https://twitter.com/DRNFTArtists",
          instagram: "https://instagram.com/drnftartists",
        },
      },
      {
        id: "project3",
        name: "Punta Cana DeFi Hub",
        description: "Building decentralized finance solutions tailored for the Dominican tourism industry.",
        members: 78,
        progress: 40,
        category: "DeFi",
        startDate: "2023-05-22",
        endDate: "2024-05-22",
        network: "ethereum",
        contractAddress: "0x0123456789012345678901234567890123456789",
        website: "https://puntacanadefi.finance",
        socialLinks: {
          twitter: "https://twitter.com/PuntaCanaDeFi",
          telegram: "https://t.me/puntacanadefi",
        },
      },
      {
        id: "project4",
        name: "Santo Domingo Developers Guild",
        description: "A community of Web3 developers building the future of blockchain in the Dominican Republic.",
        members: 92,
        progress: 85,
        category: "Guild",
        startDate: "2022-11-05",
        endDate: "2023-11-05",
        network: "ethereum",
        contractAddress: "0xa123456789012345678901234567890123456789",
        website: "https://sddevs.guild",
        socialLinks: {
          twitter: "https://twitter.com/SDDevGuild",
          github: "https://github.com/sddevguild",
        },
      },
    ]
  } catch (error) {
    console.error("Error fetching community projects:", error)
    throw new Error("Failed to fetch community projects")
  }
}

// Fetch community project details
export async function fetchCommunityProjectDetails(projectId: string): Promise<CommunityProjectData> {
  try {
    // In a real implementation, you would call your backend API
    // For now, we'll return mock data
    const projects = await fetchCommunityProjects()
    const project = projects.find((p) => p.id === projectId)

    if (!project) {
      throw new Error(`Project with ID ${projectId} not found`)
    }

    return {
      ...project,
      isJoined: Math.random() > 0.5, // Randomly determine if user has joined
    }
  } catch (error) {
    console.error("Error fetching community project details:", error)
    throw new Error("Failed to fetch community project details")
  }
}

// Join a community project
export async function joinCommunityProject(projectId: string): Promise<boolean> {
  try {
    // In a real implementation, you would call your backend API or smart contract
    // For now, we'll simulate a successful join
    console.log(`Joining project ${projectId}`)
    return true
  } catch (error) {
    console.error("Error joining community project:", error)
    throw new Error("Failed to join community project")
  }
}

// Leave a community project
export async function leaveCommunityProject(projectId: string): Promise<boolean> {
  try {
    // In a real implementation, you would call your backend API or smart contract
    // For now, we'll simulate a successful leave
    console.log(`Leaving project ${projectId}`)
    return true
  } catch (error) {
    console.error("Error leaving community project:", error)
    throw new Error("Failed to leave community project")
  }
}

