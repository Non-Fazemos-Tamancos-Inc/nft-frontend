import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Button, Form, FormContainer, Input } from '../../components/core/Form'
import { useAuthenticationStore } from '../../store/AuthenticationStore.ts'

// Main component
export function Register() {
  const { register } = useAuthenticationStore(({ register }) => ({ register }))
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nameEl = e.currentTarget.elements.namedItem('name') as HTMLInputElement
    const emailEl = e.currentTarget.elements.namedItem('email') as HTMLInputElement
    const passwordEl = e.currentTarget.elements.namedItem('password') as HTMLInputElement
    const walletEl = e.currentTarget.elements.namedItem('wallet') as HTMLInputElement

    try {
      await register(nameEl.value, emailEl.value, passwordEl.value, walletEl.value)
      navigate('/profile')
    } catch (err) {
      console.error(err)
      alert(`Registration failed: ${err}`)
    }

    navigate('/profile')
  }

  return (
    <CustomerContainer activePage={CustomerNavElements.USER}>
      <FormContainer>
        <Form title="Register" onSubmit={handleSubmit}>
          <Input label="Name" name="name" placeholder="Someone Somewhere" type="text" />
          <Input label="E-mail" name="email" placeholder="mail@example.com" type="email" />
          <Input label="Password" name="password" placeholder="••••••••" type="password" />
          <Input
            label="Wallet Address"
            name="wallet"
            placeholder="0x95aD61b0a150d79219..."
            type="text"
          />

          <Button>SIGNUP</Button>
          <Button
            type="reset"
            onClick={(e) => {
              e.preventDefault()
              navigate('/login')
            }}
            fill={false}
          >
            I ALREADY HAVE AN ACCOUNT
          </Button>
        </Form>
      </FormContainer>
    </CustomerContainer>
  )
}
