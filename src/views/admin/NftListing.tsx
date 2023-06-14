import { Link, useParams } from 'react-router-dom'

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

export function NftListing() {
  const { collectionId } = useParams()

  return (
    <AdminContainer activePage={AdminNavElements.COLLECTIONS}>
      <Content>
        <TitleContainer>
          <Title>NFTs of {collectionId}</Title>
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
                <Th>Price</Th>
                <Th>Sold</Th>
                <Th>Sent</Th>
                <Th align="end">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <NftRow
                id={'1'}
                name={'Some Collection'}
                price={'0.6900 ETH'}
                sold={true}
                sent={true}
              />
            </Tbody>
          </Table>
        </TableContainer>
      </Content>
    </AdminContainer>
  )
}

// Auxiliary Components

interface NftRowProps {
  key?: string
  id: string
  name: string
  price: string
  sold: boolean
  sent: boolean
}

const NftRow = ({ key, id, name, price, sold, sent }: NftRowProps) => (
  <Tr key={key}>
    <Td>{name}</Td>
    <Td>{price}</Td>
    <Td>{sold ? 'Sold' : 'Not Sold'}</Td>
    <Td>{sent ? 'Sent' : 'Not Sent'}</Td>
    <Td align="end">
      <Link to={`/admin/collections/${id}/nfts/${id}`}>
        <UserActionButton>Manage</UserActionButton>
      </Link>
      <UserActionButton>{sent ? 'Unsend' : 'Send'}</UserActionButton>
      <UserActionButton className="danger">Delete</UserActionButton>
    </Td>
  </Tr>
)
