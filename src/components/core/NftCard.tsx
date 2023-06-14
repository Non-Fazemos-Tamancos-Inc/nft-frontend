export interface NftCardProps {
  idx: number
}

export function NftCard({ idx }: NftCardProps) {
  let NftName = `Pink Thingie #${idx}`
  let price = 0.2

  return (
    <div className="card">
      <img src="/assets/nft/animals.jpg" alt="nft image" />

      <h3>{NftName}</h3>
      <h4>{price} ETH</h4>
    </div>
  )
}
