import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getCollectionById, getCollections, updateCollection } from '../../api/collections.ts'
import { Collection, NFT } from '../../api/types.ts'
import { AdminContainer, AdminNavElements } from '../../components/container/AdminContainer.tsx'
import {
  ActionButton,
  ActionContainer,
  Content,
  TableContainer,
  Title,
  TitleContainer,
  UserActionButton,
} from '../../components/core/Listing.tsx'
import { Table, Tbody, Td, Th, Thead, Tr } from '../../components/core/Table.tsx'
import { useAdminRequired } from '../../hooks/useAdminRequired.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'

interface CollectionListingData extends Collection {
  boughtItems: number
  boughtValue: number
  totalValue: number
  released: boolean
  nfts: NFT[]
}

export function CollectionListing() {
  useAdminRequired()

  const [collections, setCollections] = useState<CollectionListingData[] | null>(null)
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  useEffect(() => {
    if (collections !== null) {
      return
    }

    const loadCollections = async () => {
      addLoader('load-collections')
      try {
        const data = await getCollections()

        const filledCollections: CollectionListingData[] = []

        for (const collection of data.collections) {
          const resp = await getCollectionById(collection._id)

          const nfts = resp.collection.nfts || []
          const boughtItems = nfts.filter((nft) => nft.sold)

          filledCollections.push({
            ...resp.collection,
            boughtItems: boughtItems.length,
            boughtValue: boughtItems.reduce((acc, nft) => acc + nft.price, 0),
            totalValue: nfts.reduce((acc, nft) => acc + nft.price, 0),
            released: new Date(resp.collection.releaseDate || 0).getTime() <= Date.now(),
            nfts,
          })
        }

        setCollections(filledCollections)
      } catch (err) {
        toast(err?.toString() || 'An error occurred', { type: 'error' })
      } finally {
        removeLoader('load-collections')
      }
    }

    loadCollections().then().catch(console.error)
  }, [collections, addLoader, removeLoader])

  const handleRelease = async (id: string, released: boolean) => {
    const target = collections?.find((c) => c._id === id)

    if (!target) {
      return
    }

    addLoader(`release-collection-${id}`)

    try {
      const newDate = released ? new Date(1e13) : new Date()

      const updatedCollection = await updateCollection(
        id,
        target.name,
        target.description,
        newDate.toString(),
        target.image,
      )

      const newCollections =
        collections?.map((c) => {
          if (c._id === id) {
            return {
              ...c,
              ...updatedCollection.collection,
              released:
                new Date(updatedCollection.collection.releaseDate || 0).getTime() <= Date.now(),
            }
          }

          return c
        }) || []

      setCollections(newCollections)
      toast(`Collection ${released ? 'released' : 'unreleased'} successfully`, {
        type: 'success',
      })
    } catch (err) {
      toast(err?.toString() || 'An error occurred', { type: 'error' })
    } finally {
      removeLoader(`release-collection-${id}`)
    }
  }

  return (
    <AdminContainer activePage={AdminNavElements.COLLECTIONS}>
      <Content>
        <TitleContainer>
          <Title>Collections</Title>
          <ActionContainer>
            <Link to={`/admin/collections/new`}>
              <ActionButton>New Collection</ActionButton>
            </Link>
          </ActionContainer>
        </TitleContainer>
        <TableContainer>
          <Table striped>
            <Thead>
              <Tr>
                <Th>Collection Name</Th>
                <Th>Release Date</Th>
                <Th>Released</Th>
                <Th>Sold Items</Th>
                <Th>Total Items</Th>
                <Th>Sold Value</Th>
                <Th align="end">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {collections?.map(
                ({ _id, name, releaseDate, released, boughtItems, boughtValue }) => (
                  <CollectionRow
                    key={_id}
                    id={_id}
                    name={name}
                    releaseDate={(releaseDate || 'Unknown').toString()}
                    released={released}
                    soldItems={boughtItems}
                    totalItems={boughtItems}
                    soldValue={`${boughtValue} ETH`}
                    onRelease={handleRelease}
                  />
                ),
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Content>
    </AdminContainer>
  )
}

// Auxiliary Components

interface CollectionRowProps {
  id: string
  name: string
  releaseDate: string
  released: boolean
  soldItems: number
  totalItems: number
  soldValue: string
  onRelease: (id: string, released: boolean) => void | Promise<void>
}

const CollectionRow = ({
  id,
  name,
  releaseDate,
  released,
  soldItems,
  totalItems,
  soldValue,
  onRelease,
}: CollectionRowProps) => (
  <Tr>
    <Td>{name}</Td>
    <Td>{releaseDate}</Td>
    <Td>{released ? 'Yes' : 'No'}</Td>
    <Td>{soldItems}</Td>
    <Td>{totalItems}</Td>
    <Td>{soldValue}</Td>
    <Td align="end">
      <Link to={`/admin/collections/${id}`}>
        <UserActionButton>Manage</UserActionButton>
      </Link>
      <Link to={`/admin/collections/${id}/nfts`}>
        <UserActionButton>Nfts</UserActionButton>
      </Link>
      <UserActionButton className="danger" onClick={() => onRelease(id, released)}>
        {released ? 'Unrelease' : 'Release'}
      </UserActionButton>
    </Td>
  </Tr>
)
