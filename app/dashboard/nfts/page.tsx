import { NFTGallery } from "@/components/nft-gallery"

export default function NFTsPage() {
  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">NFT Collection</h2>
      </div>
      <p className="text-muted-foreground">Browse and manage your NFT collection.</p>
      <NFTGallery />
    </div>
  )
}

