import { styled } from '@stitches/react'
import { Link } from 'react-router-dom'

export function NotFound({ admin = false }: { admin?: boolean }) {
  return (
    <Main>
      <Code>404</Code>
      <Description>Page not found</Description>
      <Link to={admin ? '/admin' : '/'}>
        <Button>Go back home</Button>
      </Link>
    </Main>
  )
}

const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const Code = styled('h1', {
  fontSize: '10rem',
  fontWeight: 'bold',
})

const Description = styled('p', {
  fontSize: '2rem',
})

const Button = styled('button', {
  padding: '1rem 2rem',
  backgroundColor: 'white',
  border: 'none',
  color: 'black',
  fontSize: '1.5rem',
  cursor: 'pointer',
  marginTop: '.5rem',
  '&:hover': {
    opacity: '0.8',
  },
  '&:active': {
    opacity: '0.6',
  },
})
