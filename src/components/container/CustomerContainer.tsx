import '../../styles/common.scss'

import { styled } from '@stitches/react'
import { ReactNode, useMemo } from 'react'

import { UserRole } from '../../api/types.ts'
import { useAuthenticationStore } from '../../store/AuthenticationStore.ts'
import { Header, HeaderNavItem } from '../core/Header.tsx'

/* eslint-disable no-unused-vars */
export enum CustomerNavElements {
  HOME,
  COLLECTIONS,
  USER,
  CART,
}

/* eslint-enable no-unused-vars */

export interface CustomerContainerProps {
  activePage?: CustomerNavElements
  disableNav?: boolean
  children: ReactNode
  scoobyDoobyDoo?: boolean
}

export function CustomerContainer({
  activePage,
  disableNav = false,
  children,
  scoobyDoobyDoo = false,
}: CustomerContainerProps) {
  const { user } = useAuthenticationStore(({ user }) => ({
    user,
  }))

  const navItems: HeaderNavItem[] = useMemo(() => {
    if (disableNav) {
      return []
    }

    const items = [
      {
        name: 'Home',
        active: activePage === CustomerNavElements.HOME,
        link: '/home',
      },
      {
        name: 'Collections',
        active: activePage === CustomerNavElements.COLLECTIONS,
        link: '/collections',
      },
      {
        name: user ? 'Profile' : 'Login',
        active: activePage === CustomerNavElements.USER,
        link: user ? '/profile' : '/login',
      },
      {
        name: 'Cart',
        active: activePage === CustomerNavElements.CART,
        link: '/cart',
      },
    ]

    if (user?.role === UserRole.Admin) {
      items.push({
        name: 'Admin',
        active: false,
        link: '/admin',
      })
    }

    return items
  }, [user, activePage, disableNav])

  return (
    <Main className={scoobyDoobyDoo ? 'scooby-doo' : ''}>
      <Header navItems={navItems} />
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
