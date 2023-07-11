import { FormEvent, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { updateUser } from '../../api/users.ts'
import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Button, Form, FormContainer, Input } from '../../components/core/Form'
import { useAuthenticationStore } from '../../store/AuthenticationStore.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'

export function Profile() {
  const { user, logout, refresh } = useAuthenticationStore(({ user, logout, refresh }) => ({
    user,
    logout,
    refresh,
  }))

  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

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
      addLoader('update-account')
      await updateUser(
        user?._id,
        nameEl.value,
        emailEl.value,
        passwordEl.value || undefined,
        walletEl.value || undefined,
        true,
      )
      await refresh()
      toast('Account updated', { type: 'success' })
    } catch (err) {
      toast(err?.toString() || 'Failed to update account', { type: 'error' })
    } finally {
      removeLoader('update-account')
    }
  }

  const handleLogout = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      await logout()
      navigate('/login')
      toast('Logged out', { type: 'success' })
    } catch (err) {
      toast(err?.toString() || 'Failed to logout', { type: 'error' })
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
