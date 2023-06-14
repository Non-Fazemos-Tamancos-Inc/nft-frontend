import '../../styles/common.css'

import { styled } from '@stitches/react'
import { ReactNode, useMemo } from 'react'

import { Header, HeaderNavItem } from '../core/Header.tsx'
import { useAuth } from '../../hooks/useAuth.tsx'

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
}

export function CustomerContainer({
  activePage,
  disableNav = false,
  children,
}: CustomerContainerProps) {
  const { user } = useAuth()

  const navItems: HeaderNavItem[] = useMemo(
    () =>
      disableNav
        ? []
        : [
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
          ],
    [activePage, disableNav],
  )

  return (
    <Main>
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
