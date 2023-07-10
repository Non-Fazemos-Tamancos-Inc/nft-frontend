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

export function UserListing() {
  const userData = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@mail.io',
      boughtItems: 10,
      sentItems: 5,
      boughtValue: '0.6900 ETH',
    },
    {
      id: 2,
      name: 'Wilson José',
      email: 'wilson.jose@mail.io',
      boughtItems: 6,
      sentItems: 0,
      boughtValue: '0.4200 ETH',
    },
  ]

  return (
    <AdminContainer activePage={AdminNavElements.USERS}>
      <Content>
        <TitleContainer>
          <Title>Users</Title>
          <ActionContainer>
            <Link to={`/admin/users/new`}>
              <ActionButton>New User</ActionButton>
            </Link>
          </ActionContainer>
        </TitleContainer>
        <TableContainer>
          <Table striped>
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>Email</Th>
                <Th>Bought Items</Th>
                <Th>Sent Items</Th>
                <Th>Bought Value</Th>
                <Th align="end">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData.map(({ id, name, email, boughtItems, sentItems, boughtValue }) => (
                <UserRow
                  key={id.toString()}
                  id={id.toString()}
                  name={name}
                  email={email}
                  boughtItems={boughtItems}
                  sentItems={sentItems}
                  boughtValue={boughtValue}
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

interface UserRowProps {
  key?: string
  id: string
  name: string
  email: string
  boughtItems: number
  sentItems: number
  boughtValue: string
}

const UserRow = ({
  key,
  id,
  name,
  email,
  boughtItems,
  sentItems,
  boughtValue,
}: UserRowProps) => (
  <Tr key={key}>
    <Td>{name}</Td>
    <Td>{email}</Td>
    <Td>{boughtItems}</Td>
    <Td>{sentItems}</Td>
    <Td>{boughtValue}</Td>
    <Td align="end">
      <Link to={`/admin/users/${id}`}>
        <UserActionButton>Manage</UserActionButton>
      </Link>
      <UserActionButton className="danger">Ban</UserActionButton>
    </Td>
  </Tr>
)
