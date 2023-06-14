import { Link } from 'react-router-dom'

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

export function CollectionListing() {
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
              <CollectionRow
                id={'1'}
                name={'Some Collection'}
                releaseDate={'2021-08-01'}
                released={false}
                soldItems={10}
                totalItems={20}
                soldValue={'0.6900 ETH'}
              />
            </Tbody>
          </Table>
        </TableContainer>
      </Content>
    </AdminContainer>
  )
}

// Auxiliary Components

interface CollectionRowProps {
  key?: string
  id: string
  name: string
  releaseDate: string
  released: boolean
  soldItems: number
  totalItems: number
  soldValue: string
}

const CollectionRow = ({
  key,
  id,
  name,
  releaseDate,
  released,
  soldItems,
  totalItems,
  soldValue,
}: CollectionRowProps) => (
  <Tr key={key}>
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
      <UserActionButton className="danger">
        {released ? 'Unrelease' : 'Release'}
      </UserActionButton>
    </Td>
  </Tr>
)
