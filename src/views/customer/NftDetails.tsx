import { styled } from '@stitches/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getNFTById } from '../../api/nfts.ts'
import { Collection, NFT } from '../../api/types.ts'
import { getURL } from '../../api/uploads.ts'
import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Button } from '../../components/core/Form.tsx'
import { Content } from '../../components/core/Listing.tsx'
import { useCartStore } from '../../store/CartStore.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'
import { formatCurrency } from '../../utils/number.ts'

export function NftDetails() {
  const navigate = useNavigate()
  const { collectionId, id } = useParams()

  const [nft, setNft] = useState<NFT | null>(null)
  const [collection, setCollection] = useState<Collection | null>(null)

  const { items, addItem } = useCartStore()
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  useEffect(() => {
    if (!collectionId || !id) {
      return
    }

    if (nft !== null) {
      return
    }

    const loadNFT = async () => {
      addLoader('load-nft')
      try {
        const data = await getNFTById(id)
        setNft(data.nft)
        setCollection(data.collection)
      } catch (e) {
        toast.error('Failed to load NFT')
        navigate(`/collections/${collectionId}`)
      } finally {
        removeLoader('load-nft')
      }
    }

    loadNFT().then().catch()
  }, [navigate, nft, setNft, setCollection, addLoader, removeLoader, collectionId, id])

  const isOnCart = items.find((item) => item === nft?._id)

  const onPurchase = () => {
    if (!nft) {
      return
    }

    if (nft.sold) {
      toast.info('This NFT has already been sold')
      return
    }

    if (isOnCart) {
      toast.info('This NFT is already on cart')
      return
    }

    addItem(nft._id)
    navigate('/cart')
  }

  let buttonText = `PURCHASE: ${formatCurrency(nft?.price)} ETH`
  if (isOnCart) {
    buttonText = 'ON CART'
  }
  if (nft?.sold) {
    buttonText = 'SOLD'
  }

  const descriptionBlocks = (nft?.description || 'No description').split('\n')

  return (
    <CustomerContainer activePage={CustomerNavElements.COLLECTIONS}>
      <Content>
        <TitleContainer>
          <Title>
            <span>{nft?.name}</span>
          </Title>
          <CollectionName>{collection?.name}</CollectionName>
        </TitleContainer>
        <DetailsContainer>
          <LeftContainer>
            <ImageContainer>
              <NotAvailableIndicator sold={nft?.sold || false} />
              {(nft?.image && <img src={getURL(nft?.image)} alt="NFT Image" />) || (
                <ImagePlaceholder>No Image</ImagePlaceholder>
              )}
            </ImageContainer>
            <Button onClick={onPurchase} disabled={nft?.sold === true}>
              {buttonText}
            </Button>
          </LeftContainer>
          <RightContainer>
            {descriptionBlocks.map((block, index) => (
              <p key={index.toString()}>{block}</p>
            ))}
          </RightContainer>
        </DetailsContainer>
      </Content>
    </CustomerContainer>
  )
}

const NotAvailableIndicator = ({ sold }: { sold: boolean }) => {
  if (!sold) {
    return null
  }

  return (
    <NotAvailable>
      <h3>Sold</h3>
    </NotAvailable>
  )
}

const Title = styled('h1', {
  fontSize: '2rem',

  '& > span': {
    paddingBottom: '0.2rem',
    borderBottom: '4px solid white',
  },
})

const TitleContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

const CollectionName = styled('h5', {
  marginTop: '1rem',
  fontSize: '1.2rem',
})

const DetailsContainer = styled('div', {
  display: 'flex',
  flex: 1,
  flexWrap: 'wrap',

  maxWidth: '1000px',
  margin: '0 auto',
})

const LeftContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,

  flexBasis: '33%',
  flexGrow: 1,
  flexShrink: 1,

  maxWidth: '300px',
  width: '100%',

  marginRight: '1rem',

  '& > img': {
    width: '100%',
  },

  '@media only screen and (max-width: 768px)': {
    margin: '0 auto 1rem auto',
    flexBasis: '100%',
  },
})

const RightContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,

  flexBasis: '60%',
  flexGrow: 1,

  '& p': {
    textAlign: 'justify',
    textIndent: '2rem',
    marginTop: '0.4rem',
  },

  '@media only screen and (max-width: 768px)': {
    marginRight: '0',
    marginBottom: '1rem',
    flexBasis: '100%',
  },
})

const NotAvailable = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '100%',

  cursor: 'default',
  userSelect: 'none',
  pointerEvents: 'all',

  position: 'absolute',
  top: '0',
  left: '0',

  zIndex: '2',

  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(2px)',
  color: 'white',
})

const ImageContainer = styled('div', {
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  margin: 'auto 0',
  border: '2px solid white',
})

const ImagePlaceholder = styled('div', {
  width: '100%',
  height: '100%',
  minHeight: '300px',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: '#2e2e2e',

  color: 'white',
  fontSize: '2rem',
})
