import { FormEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { updateUser } from '../../api/api.ts'
import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Button, Form, FormContainer, Input } from '../../components/core/Form'
import { useAuthRequired } from '../../hooks/useAuth.tsx'

export function Profile() {
  const { user, logout } = useAuthRequired()

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user?._id) {
      return
    }

    const nameEl = e.currentTarget.elements.namedItem('name') as HTMLInputElement
    const emailEl = e.currentTarget.elements.namedItem('email') as HTMLInputElement
    const passwordEl = e.currentTarget.elements.namedItem('password') as HTMLInputElement
    const walletEl = e.currentTarget.elements.namedItem('wallet') as HTMLInputElement

    try {
      await updateUser(user?._id, nameEl.value, emailEl.value, passwordEl.value, walletEl.value)
      alert('Update successful')
    } catch (err) {
      console.error(err)
      alert(`Update failed: ${err}`)
    }
  }

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      await logout()
      navigate('/login')
    } catch (err) {
      console.error(err)
      alert(`Logout failed: ${err}`)
    }
  }

  return (
    <CustomerContainer activePage={CustomerNavElements.USER}>
      <FormContainer>
        <Form title="Your Account" onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            placeholder="Someone Somewhere"
            defaultValue={user?.name || ''}
            type="text"
          />
          <Input
            label="E-mail"
            name="email"
            placeholder="mail@example.com"
            type="email"
            defaultValue={user?.email || ''}
          />
          <Input label="Password" name="password" placeholder="••••••••" type="password" />
          <Input
            label="Wallet Address"
            name="wallet"
            placeholder="0x95aD61b0a150d79219..."
            defaultValue={user?.wallet || ''}
            type="text"
          />

          <Button>UPDATE ACCOUNT</Button>
          <Button type="reset" onClick={handleLogout} fill={false}>
            LOGOUT
          </Button>
        </Form>
      </FormContainer>
    </CustomerContainer>
  )
}
