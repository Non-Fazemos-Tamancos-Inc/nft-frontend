import { Link } from 'react-router-dom'

import { AdminContainer, AdminNavElements } from '../../components/container/AdminContainer.tsx'
import {
  Content,
  TableContainer,
  Title,
  TitleContainer,
  UserActionButton,
} from '../../components/core/Listing.tsx'
import { Table, Tbody, Td, Th, Thead, Tr } from '../../components/core/Table.tsx'

export function OrderListing() {
  return (
    <AdminContainer activePage={AdminNavElements.ORDERS}>
      <Content>
        <TitleContainer>
          <Title>Orders</Title>
        </TitleContainer>
        <TableContainer>
          <Table striped>
            <Thead>
              <Tr>
                <Th>Item Name</Th>
                <Th>Buyer Address</Th>
                <Th>Acquisition Date</Th>
                <Th>Sent</Th>
                <Th>Price</Th>
                <Th align="end">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              <OrderRow
                id={'1'}
                name={'Some Collection'}
                buyerAddress={'0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce'}
                acquisitionDate={'2021-08-01'}
                sent={false}
                price={'0.6900 ETH'}
              />
            </Tbody>
          </Table>
        </TableContainer>
      </Content>
    </AdminContainer>
  )
}

// Auxiliary Components

interface OrderRowProps {
  key?: string
  id: string
  name: string
  buyerAddress: string
  acquisitionDate: string
  sent: boolean
  price: string
}

const OrderRow = ({
  key,
  id,
  name,
  buyerAddress,
  acquisitionDate,
  sent,
  price,
}: OrderRowProps) => (
  <Tr key={key}>
    <Td>{name}</Td>
    <Td>{buyerAddress}</Td>
    <Td>{acquisitionDate}</Td>
    <Td>{sent ? 'Yes' : 'No'}</Td>
    <Td>{price}</Td>
    <Td align="end">
      <Link to={`/admin/collections/${id}`}>
        <UserActionButton>{sent ? 'Undo Sent' : 'Sent'}</UserActionButton>
      </Link>
      <UserActionButton className="danger">Refund</UserActionButton>
    </Td>
  </Tr>
)
