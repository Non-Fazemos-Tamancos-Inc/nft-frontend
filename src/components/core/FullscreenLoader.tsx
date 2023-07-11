import { styled } from '@stitches/react'
import { PacmanLoader } from 'react-spinners'

import { useLoaderStore } from '../../store/LoaderStore.ts'

export function FullscreenLoader() {
  const { loaders } = useLoaderStore(({ loaders }) => ({ loaders }))

  const active = loaders && loaders.size > 0

  return (
    <LoaderContainer data-active={active ? 'true' : 'false'}>
      <PacmanLoader size={64} color={'#ffffff'} loading={true} />
      <p>Loading...</p>
    </LoaderContainer>
  )
}

const LoaderContainer = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,

  width: '100vw',
  height: '100vh',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',

  userSelect: 'none',
  backdropFilter: 'blur(5px)',

  transition: 'opacity 0.2s ease-in-out',
  opacity: '0',
  pointerEvents: 'none',

  '&[data-active="true"]': {
    opacity: '1',
    pointerEvents: 'all',
  },

  '& > p': {
    marginTop: '1rem',
    fontSize: '1.5rem',
  },
})
