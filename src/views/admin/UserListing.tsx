import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { getPurchasesForUser } from '../../api/purchases.ts'
import { User } from '../../api/types.ts'
import { activateUser, deactivateUser, listUsers } from '../../api/users.ts'
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

interface UserListingData extends User {
  boughtItems: number
  sentItems: number
}

export function UserListing() {
  useAdminRequired()

  const [users, setUsers] = useState<UserListingData[] | null>(null)
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  useEffect(() => {
    if (users !== null) {
      return
    }

    const loadUsers = async () => {
      addLoader('load-users')
      try {
        const data = await listUsers()
        const filledUsers = []

        for (const user of data.users) {
          const purchases = await getPurchasesForUser(user._id)

          filledUsers.push({
            ...user,
            boughtItems: purchases.purchases.length,
            sentItems: purchases.purchases.filter((p) => p.sentAt != null).length,
          })
        }
        setUsers(filledUsers)
      } catch (err) {
        toast(err?.toString() || 'An error occurred', { type: 'error' })
      } finally {
        removeLoader('load-users')
      }
    }

    loadUsers().then().catch(console.error)
  }, [users, setUsers, addLoader, removeLoader])

  const handleBan = async (id: string, active: boolean) => {
    addLoader('ban-user')
    try {
      if (active) {
        await deactivateUser(id)
      } else {
        await activateUser(id)
      }
      toast(`User ${active ? 'banned' : 'unbanned'}`, { type: 'success' })
      setUsers((users) => {
        return (
          users?.map((u) => {
            if (u._id === id) {
              return { ...u, active: !active }
            }
            return u
          }) || null
        )
      })
    } catch (err) {
      toast(err?.toString() || 'An error occurred', { type: 'error' })
    } finally {
      removeLoader('ban-user')
    }
  }

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
                <Th>Role</Th>
                <Th>Bought Items</Th>
                <Th>Sent Items</Th>
                <Th align="end">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users &&
                users.map(({ _id, name, email, role, boughtItems, sentItems, active }) => (
                  <UserRow
                    key={_id}
                    id={_id}
                    name={name}
                    email={email}
                    boughtItems={boughtItems}
                    sentItems={sentItems}
                    role={role}
                    active={active}
                    onBan={handleBan}
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
  role: string
  active: boolean
  onBan: (id: string, active: boolean) => void | Promise<void>
}

const UserRow = ({
  key,
  id,
  name,
  email,
  role,
  boughtItems,
  sentItems,
  active,
  onBan,
}: UserRowProps) => (
  <Tr key={key}>
    <Td>{name}</Td>
    <Td>{email}</Td>
    <Td>{role}</Td>
    <Td>{boughtItems}</Td>
    <Td>{sentItems}</Td>
    <Td align="end">
      <Link to={`/admin/users/${id}`}>
        <UserActionButton>Manage</UserActionButton>
      </Link>
      <UserActionButton className="danger" onClick={() => onBan(id, active)}>
        {active ? 'Ban' : 'Unban'}
      </UserActionButton>
    </Td>
  </Tr>
)
