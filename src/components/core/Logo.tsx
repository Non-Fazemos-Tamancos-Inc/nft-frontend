import { styled } from '@stitches/react'

export interface LogoProps {
  admin?: boolean
}

export function Logo({ admin }: LogoProps) {
  return (
    <LogoText>
      N.F.T.
      {admin && <AdminText> | Admin</AdminText>}
    </LogoText>
  )
}

const LogoText = styled('span', {
  fontSize: '1.5rem',
  fontWeight: '900',
})

const AdminText = styled('span', {
  fontWeight: '400',
})
