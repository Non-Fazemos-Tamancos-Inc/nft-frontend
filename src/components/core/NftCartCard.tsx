import { styled } from '@stitches/react'

import { getURL } from '../../api/uploads.ts'

export interface NftCardProps {
  id: string
  name: string
  price: number
  image?: string
  onRemove?: (id: string) => void
}

export function NftCartCard({ id, name, price, image, onRemove = () => {} }: NftCardProps) {
  return (
    <CardContainer>
      <CardImage src={image ? getURL(image) : ''} alt="nft image" />

      <CardInfo>
        <CardInfoName>{name}</CardInfoName>
        <p>{price} ETH</p>
      </CardInfo>
      <RemoveAction onClick={() => onRemove(id)}>Remove</RemoveAction>
    </CardContainer>
  )
}

// Styles

const CardContainer = styled('section', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  position: 'relative',

  padding: '1rem',
})

const CardImage = styled('img', {
  height: '10rem',
  marginRight: '.5rem',
})

const CardInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100%',
})

const CardInfoName = styled('p', {
  fontSize: '1.5rem',
  textDecoration: 'underline',
})

const RemoveAction = styled('span', {
  fontSize: '0.8rem',
  color: 'white',
  cursor: 'pointer',
  textDecoration: 'underline',

  position: 'absolute',
  bottom: 0,
  right: 0,

  transform: 'translate(-50%, -100%)',
})
