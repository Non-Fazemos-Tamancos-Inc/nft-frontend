import { styled } from '@stitches/react'
import { Link } from 'react-router-dom'

import { Logo } from './Logo'

export interface HeaderNavItem {
  name: string
  active?: boolean
  link: string
}

export interface HeaderProps {
  admin?: boolean
  navItems?: HeaderNavItem[]
}

export function Header({ admin = false, navItems = [] }: HeaderProps) {
  return (
    <HeaderContainer className={navItems?.length ? '' : 'no-nav'}>
      <SpacedLogo admin={admin} />
      <Nav items={navItems} />
    </HeaderContainer>
  )
}

// Auxiliary Components

const Nav = ({ items }: { items: HeaderNavItem[] }) =>
  items.length === 0 ? null : (
    <NavItemContainer>
      {items.map((item, idx) => (
        <NavItem key={idx.toString()} {...item} />
      ))}
    </NavItemContainer>
  )

interface NavItemProps {
  name: string
  link: string
  active?: boolean
}

const NavItem = ({ name, link, active }: NavItemProps) => (
  <Link to={link}>
    <NavItemText className={active ? 'active' : ''}>{name}</NavItemText>
  </Link>
)

// Styles

const HeaderContainer = styled('header', {
  width: '100vw',
  minHeight: 'rem',
  padding: '1rem 0.75rem',
  border: '1px solid white',
  boxSizing: 'border-box',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  '&.no-nav': {
    justifyContent: 'center',
  },
})

const SpacedLogo = styled(Logo, {
  padding: '0 0.75rem',
})

const NavItemContainer = styled('nav', {
  display: 'flex',
  flexDirection: 'row',
})

const NavItemText = styled('span', {
  padding: '0 0.75rem',
  color: 'white',
  fontSize: '1.125rem',
  textDecoration: 'none',
  transition: 'opacity 0.2s ease-in-out',
  '&:hover': {
    opacity: 0.8,
  },
  '&:active': {
    opacity: 0.6,
  },
  '&.active': {
    textDecoration: 'underline',
  },
})
