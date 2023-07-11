import { styled } from '@stitches/react'
import { ReactNode, useMemo } from 'react'

import { Header, HeaderNavItem } from '../core/Header.tsx'

/* eslint-disable no-unused-vars */
export enum AdminNavElements {
  USERS,
  COLLECTIONS,
  ORDERS,
}
/* eslint-enable no-unused-vars */

export interface AdminContainerProps {
  activePage?: AdminNavElements
  disableNav?: boolean
  children: ReactNode
}

export function AdminContainer({
  activePage,
  disableNav = false,
  children,
}: AdminContainerProps) {
  const navItems: HeaderNavItem[] = useMemo(
    () =>
      disableNav
        ? []
        : [
            {
              name: 'Home',
              active: false,
              link: '/',
            },
            {
              name: 'Users',
              active: activePage === AdminNavElements.USERS,
              link: '/admin/users',
            },
            {
              name: 'Collections',
              active: activePage === AdminNavElements.COLLECTIONS,
              link: '/admin/collections',
            },
            {
              name: 'Orders',
              active: activePage === AdminNavElements.ORDERS,
              link: '/admin/orders',
            },
          ],
    [activePage, disableNav],
  )

  return (
    <Main>
      <Header admin navItems={navItems} />
      <ContentContainer>{children}</ContentContainer>
    </Main>
  )
}

const Main = styled('main', {})
const ContentContainer = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
})
