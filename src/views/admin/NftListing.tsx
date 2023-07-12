import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getCollectionById } from '../../api/collections.ts'
import { deleteNFT } from '../../api/nfts.ts'
import { Collection } from '../../api/types.ts'
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

export function NftListing() {
  useAdminRequired()

  const navigate = useNavigate()
  const { collectionId } = useParams()

  const [collection, setCollection] = useState<Collection | null>(null)
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  useEffect(() => {
    if (collectionId == null) {
      return
    }

    const loadCollection = async () => {
      addLoader('load-collection')
      try {
        const data = await getCollectionById(collectionId)
        setCollection(data.collection)
      } catch (e) {
        toast.error('Failed to load collection')
        navigate('/admin/collections')
      }
      removeLoader('load-collection')
    }

    loadCollection().then().catch(console.error)
  }, [addLoader, collectionId, navigate, removeLoader])

  const handleDelete = async (id: string) => {
    if (!collection?.nfts) {
      return
    }

    try {
      addLoader('delete-nft')
      await deleteNFT(id)
      setCollection({
        ...collection,
        nfts: collection.nfts.filter((nft) => nft._id !== id),
      })
      toast.success('NFT deleted')
    } catch (err) {
      toast.error(err?.toString() || 'Failed to delete NFT')
    } finally {
      removeLoader('delete-nft')
    }
  }

  return (
    <AdminContainer activePage={AdminNavElements.COLLECTIONS}>
      <Content>
        <TitleContainer>
          <Title>NFTs of "{collection?.name}"</Title>
          <ActionContainer>
            <Link to={`/admin/collections/${collectionId}/nfts/new`}>
              <ActionButton>New NFT</ActionButton>
            </Link>
          </ActionContainer>
        </TitleContainer>
        <TableContainer>
          <Table striped>
            <Thead>
              <Tr>
                <Th>NFT Name</Th>
                <Th>Description</Th>
                <Th>Price</Th>
                <Th>Sold</Th>
                <Th align="end">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {collection?.nfts?.map(({ _id, name, description, price, sold }) => (
                <NftRow
                  id={_id}
                  collectionId={collectionId || ''}
                  name={name}
                  description={description || '-'}
                  price={`${price} ETH`}
                  sold={sold}
                  onDelete={handleDelete}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Content>
    </AdminContainer>
  )
}

// Auxiliary Components

interface NftRowProps {
  id: string
  collectionId: string
  name: string
  description: string
  price: string
  sold: boolean
  onDelete: (id: string) => void | Promise<void>
}

const NftRow = ({
  id,
  collectionId,
  name,
  description,
  price,
  sold,
  onDelete,
}: NftRowProps) => {
  let truncatedDescription = description
  if (description.length > 40) {
    truncatedDescription = description.substring(0, 40) + '...'
  }

  return (
    <Tr>
      <Td> {name}</Td>
      <Td> {truncatedDescription} </Td>
      <Td>{price}</Td>
      <Td>{sold ? 'Sold' : 'Not Sold'}</Td>
      <Td align="end">
        <Link to={`/admin/collections/${collectionId}/nfts/${id}`}>
          <UserActionButton>Manage</UserActionButton>
        </Link>
        <UserActionButton className="danger" onClick={() => onDelete(id)}>
          Delete
        </UserActionButton>
      </Td>
    </Tr>
  )
}
