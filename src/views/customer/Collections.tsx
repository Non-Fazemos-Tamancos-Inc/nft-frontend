import { styled } from '@stitches/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getCollections } from '../../api/collections.ts'
import { Collection } from '../../api/types.ts'
import { getURL } from '../../api/uploads.ts'
import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Content, Title, TitleContainer } from '../../components/core/Listing.tsx'
import { useLoaderStore } from '../../store/LoaderStore.ts'

export function Collections() {
  const navigate = useNavigate()

  const [collections, setCollections] = useState<Collection[] | null>(null)
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  useEffect(() => {
    const loadCollections = async () => {
      addLoader('load-collections')
      try {
        const data = await getCollections()
        setCollections(data.collections)
      } catch (e) {
        toast.error('Failed to load collections')
      } finally {
        removeLoader('load-collections')
      }
    }

    loadCollections().then().catch(console.error)
  }, [addLoader, removeLoader])

  const handleClick = (id: string, date: string | Date | undefined) => {
    if (!date) {
      return
    }

    const parsedDate = new Date(date)

    if (parsedDate.getTime() > Date.now()) {
      return
    }

    navigate(`/collections/${id}`)
  }

  return (
    <CustomerContainer activePage={CustomerNavElements.COLLECTIONS}>
      <Content>
        <TitleContainer>
          <Title>Collections</Title>
        </TitleContainer>

        <CollectionGrid>
          {collections?.map(({ _id, name, image, releaseDate }) => (
            <CollectionCardContainer key={_id} onClick={() => handleClick(_id, releaseDate)}>
              <NotAvailableIndicator date={releaseDate?.toString()} />
              {(image && <img src={getURL(image)} alt="Collection Image" />) || (
                <ImagePlaceholder>No Image</ImagePlaceholder>
              )}
              <h5>{name}</h5>
            </CollectionCardContainer>
          ))}
        </CollectionGrid>
      </Content>
    </CustomerContainer>
  )
}

const NotAvailableIndicator = ({ date }: { date: string | undefined }) => {
  const parsedDate = date ? new Date(date) : null

  if (parsedDate && parsedDate.getTime() < Date.now()) {
    return null
  }

  return (
    <CollectionNotAvailable>
      <h3>Not Available</h3>
      {parsedDate && <p>Available on {parsedDate.toLocaleDateString()}</p>}
    </CollectionNotAvailable>
  )
}

const CollectionGrid = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gridGap: '1rem',
  marginTop: '1rem',

  alignSelf: 'center',
  maxWidth: '1200px',
  width: '100%',
})

const CollectionCardContainer = styled('div', {
  margin: '0 auto',
  display: 'flex',
  width: '100%',
  maxWidth: '300px',

  flexDirection: 'column',
  position: 'relative',
  cursor: 'pointer',

  '& > img': {
    width: '100%',

    border: '2px solid white',
  },

  '& > h5': {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',

    fontSize: '1.5rem',
    textDecoration: 'underline',
  },
})

const CollectionNotAvailable = styled('div', {
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
