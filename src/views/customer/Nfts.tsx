import { styled } from '@stitches/react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getCollectionById } from '../../api/collections.ts'
import { Collection } from '../../api/types.ts'
import { getURL } from '../../api/uploads.ts'
import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Content, Title, TitleContainer } from '../../components/core/Listing.tsx'
import { useLoaderStore } from '../../store/LoaderStore.ts'
import { formatCurrency } from '../../utils/number.ts'

export function Nfts() {
  const navigate = useNavigate()
  const { collectionId } = useParams()

  const [collection, setCollection] = useState<Collection | null>(null)
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  useEffect(() => {
    if (!collectionId) {
      return
    }

    if (collection !== null) {
      return
    }

    const loadCollection = async () => {
      addLoader('load-collection')
      try {
        const data = await getCollectionById(collectionId)
        setCollection(data.collection)
      } catch (e) {
        toast.error('Failed to load collection')
        navigate('/collections')
      } finally {
        removeLoader('load-collection')
      }
    }

    loadCollection().then().catch()
  }, [navigate, collection, setCollection, addLoader, removeLoader, collectionId])

  const handleClick = (id: string, sold: boolean) => {
    if (sold) {
      return
    }

    navigate(`/collections/${collectionId}/${id}`)
  }

  const nfts = collection?.nfts || []

  return (
    <CustomerContainer activePage={CustomerNavElements.COLLECTIONS}>
      <Content>
        <TitleContainer>
          <Title>"{collection?.name || ''}" Collection</Title>
        </TitleContainer>

        <NFTGrid>
          {nfts.map(({ _id, name, image, sold, price }) => (
            <NFTCardContainer key={_id} onClick={() => handleClick(_id, sold)}>
              <NotAvailableIndicator sold={sold} />
              {(image && <img src={getURL(image)} alt="NFT Image" />) || (
                <ImagePlaceholder>No Image</ImagePlaceholder>
              )}
              <h5>{name}</h5>
              <h6>{formatCurrency(price)} ETH</h6>
            </NFTCardContainer>
          ))}
        </NFTGrid>

        {nfts.length === 0 && <h3>No NFTs in this collection</h3>}
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

const NFTGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridGap: '1rem',
  marginTop: '1rem',

  alignSelf: 'center',
  maxWidth: '1200px',
  width: '100%',
})

const NFTCardContainer = styled('div', {
  margin: '0 auto',
  display: 'flex',
  width: '100%',
  maxWidth: '200px',

  flexDirection: 'column',
  position: 'relative',
  cursor: 'pointer',

  '& > img': {
    width: '100%',

    border: '2px solid white',
  },

  '& > h5': {
    marginTop: '0.5rem',

    fontSize: '1.25rem',
    fontWeight: '600',
    textAlign: 'center',
  },

  '& > h6': {
    marginTop: '0.2rem',
    marginBottom: '0.5rem',

    fontSize: '.8rem',
    textAlign: 'center',
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
