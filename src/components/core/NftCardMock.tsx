import { styled } from '@stitches/react'

export interface NftCardProps {
  idx: number
}

export function NftCardMock({ idx }: NftCardProps) {
  let name = `Pink Thingie #${idx}`
  let price = '0.2 ETH'

  return (
    <CardContainer>
      <CardImage src="/assets/nft/animals.jpg" alt="nft image" />

      <CardInfo>
        <CardInfoName>{name}</CardInfoName>
        <p>{price}</p>
      </CardInfo>
    </CardContainer>
  )
}

// Styles

const CardContainer = styled('section', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

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
