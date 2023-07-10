import { styled } from '@stitches/react'

export const Content = styled('div', {
  height: '100%',
  minWidth: '100%',

  display: 'flex',
  flexDirection: 'column',

  padding: '2.5rem 3rem',
})

export const Title = styled('h1', {
  display: 'inline',
  fontSize: '2.25rem',
  borderBottom: '4px solid white',
})

export const TitleContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const ActionContainer = styled('div', {
  display: 'flex',
})

export const ActionButton = styled('button', {
  minHeight: '3rem',
  width: '100%',
  border: '2px solid white',
  fontSize: '1rem',
  padding: '0.5rem 1.5rem',
  marginTop: '1.5rem',
  marginLeft: '0.75rem',
  marginRight: '0.75rem',
  transition: 'opacity 0.2s ease-in-out',
  backgroundColor: 'white',
  '&:hover': {
    opacity: 0.8,
  },
  '&:active': {
    opacity: 0.6,
  },
})

export const TableContainer = styled('div', {
  margin: '1.5rem 0',
  minWidth: '100%',
  height: '100%',
  overflowX: 'scroll',
})

export const UserActionButton = styled('span', {
  fontStyle: 'italic',
  padding: '0 0.5rem',
  cursor: 'pointer',
  '&.danger': {
    color: 'red',
  },
})
