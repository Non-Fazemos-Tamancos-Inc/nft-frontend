import { styled } from '@stitches/react'

export const Caption = styled('caption', {
  textAlign: 'start',
  marginBottom: '1.5rem',
})

export const Tbody = styled('tbody', {
  minWidth: '100%',
})

export const Tfoot = styled('tfoot', {})

export const Tr = styled('tr', {})

export const Th = styled('th', {
  fontWeight: 'unset',
  textAlign: 'start',
  fontSize: '1rem',
  padding: '0.5rem',
  borderBottom: '1px solid white',
  variants: {
    align: {
      start: {
        textAlign: 'start',
      },
      center: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
      },
    },
    border: {
      solid: {
        borderBottom: '1px solid white',
      },
      dashed: {
        borderBottom: '1px dashed white',
      },
    },
  },
  defaultVariants: {
    align: 'start',
    border: 'solid',
  },
})

export const Td = styled('td', {
  padding: '0.5rem',
  borderBottom: '1px solid white',
  fontSize: '1rem',
  variants: {
    align: {
      start: {
        textAlign: 'start',
      },
      center: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
      },
    },
    border: {
      solid: {
        borderBottom: '1px solid white',
      },
      dashed: {
        borderBottom: '1px dashed white',
      },
    },
  },
  defaultVariants: {
    align: 'start',
    border: 'solid',
  },
})

export const Thead = styled('thead', {
  [`& ${Th}`]: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  [`& ${Td}`]: {
    fontWeight: 'bold',
  },
})

export const Table = styled('table', {
  minWidth: '100%',
  tableLayout: 'fixed',
  borderSpacing: 0,
  variants: {
    striped: {
      true: {
        [`& ${Tbody}`]: {
          [`& ${Tr}`]: {
            '&:nth-child(odd)': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
        },
      },
    },
  },
})
