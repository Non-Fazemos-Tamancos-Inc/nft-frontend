import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import {
  cancelPurchase,
  getAllPurchases,
  markPurchaseAsSent,
  unmarkPurchaseAsSent,
} from '../../api/purchases.ts'
import { Purchase, PurchaseStatus } from '../../api/types.ts'
import { AdminContainer, AdminNavElements } from '../../components/container/AdminContainer.tsx'
import {
  Content,
  TableContainer,
  Title,
  TitleContainer,
  UserActionButton,
} from '../../components/core/Listing.tsx'
import { Table, Tbody, Td, Th, Thead, Tr } from '../../components/core/Table.tsx'
import { useAdminRequired } from '../../hooks/useAdminRequired.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'
import { formatCurrency } from '../../utils/number.ts'

export function OrderListing() {
  useAdminRequired()

  const [orders, setOrders] = useState<Purchase[]>([])
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  useEffect(() => {
    const loadOrders = async () => {
      addLoader('load-orders')
      try {
        const data = await getAllPurchases()
        setOrders(data.purchases)
      } catch (err) {
        toast(err?.toString() || 'Failed to load orders')
      } finally {
        removeLoader('load-orders')
      }
    }

    loadOrders().then().catch(console.error)
  }, [addLoader, removeLoader, setOrders])

  const handleSend = async (id: string, sent: boolean) => {
    addLoader('send-order')

    try {
      if (!sent) {
        await markPurchaseAsSent(id)
        setOrders(
          orders.map((order) => {
            if (order._id === id) {
              return {
                ...order,
                sentAt: new Date(),
              }
            }

            return order
          }),
        )

        toast.success('Order marked as sent')
      } else {
        await unmarkPurchaseAsSent(id)
        setOrders(
          orders.map((order) => {
            if (order._id === id) {
              return {
                ...order,
                sentAt: undefined,
              }
            }

            return order
          }),
        )
        toast.success('Order marked as not sent')
      }
    } catch (err) {
      toast.error(err?.toString() || 'Failed to send order')
    } finally {
      removeLoader('send-order')
    }
  }

  const handleRefund = async (id: string) => {
    addLoader('refund-order')

    try {
      await cancelPurchase(id)
      setOrders(
        orders.map((order) => {
          if (order._id === id) {
            return {
              ...order,
              status: PurchaseStatus.CANCELLED,
            }
          }

          return order
        }),
      )
      toast.success('Order refunded')
    } catch (err) {
      toast.error(err?.toString() || 'Failed to refund order')
    } finally {
      removeLoader('refund-order')
    }
  }

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
                <Th>Status</Th>
                <Th>Sent</Th>
                <Th>Price</Th>
                <Th align="end">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders?.map(({ _id, nft, status, buyer, createdAt, sentAt, price }) => (
                <OrderRow
                  key={_id}
                  id={_id}
                  name={nft?.name || '?'}
                  status={status}
                  buyerAddress={buyer?.wallet || '?'}
                  acquisitionDate={createdAt ? new Date(createdAt).toLocaleDateString() : '?'}
                  sent={sentAt != null}
                  price={`${formatCurrency(price)} ETH`}
                  onSend={handleSend}
                  onDelete={handleRefund}
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

interface OrderRowProps {
  key?: string
  id: string
  name: string
  buyerAddress: string
  acquisitionDate: string
  sent: boolean
  status: PurchaseStatus
  price: string
  onSend: (id: string, sent: boolean) => void | Promise<void>
  onDelete: (id: string) => void | Promise<void>
}

const OrderRow = ({
  key,
  id,
  name,
  buyerAddress,
  acquisitionDate,
  sent,
  price,
  onSend,
  status,
  onDelete,
}: OrderRowProps) => (
  <Tr key={key}>
    <Td>{name}</Td>
    <Td>{buyerAddress}</Td>
    <Td>{acquisitionDate}</Td>
    <Td>{status}</Td>
    <Td>{sent ? 'Yes' : 'No'}</Td>
    <Td>{price}</Td>
    <Td align="end">
      {status === PurchaseStatus.COMPLETED && (
        <>
          <UserActionButton onClick={() => onSend(id, sent)}>
            {sent ? 'Undo Send' : 'Send'}
          </UserActionButton>
          <UserActionButton className="danger" onClick={() => onDelete(id)}>
            Refund
          </UserActionButton>
        </>
      )}
    </Td>
  </Tr>
)
