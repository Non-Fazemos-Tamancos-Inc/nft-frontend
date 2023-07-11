import { styled } from '@stitches/react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { UserRole } from '../../api/types.ts'
import { AdminContainer } from '../../components/container/AdminContainer.tsx'
import { Button, Form, FormLinkRow, Input } from '../../components/core/Form'
import { useAuthenticationStore } from '../../store/AuthenticationStore.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'

// Main component
export function AdminLogin() {
  const { login, user } = useAuthenticationStore(({ login, user }) => ({ login, user }))
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      addLoader('login-admin')
      const user = await login(emailInput, passwordInput)

      if (user.role !== UserRole.Admin) {
        toast('You are not an admin', { type: 'error' })
        return
      }

      toast('Logged in', { type: 'success' })
      navigate('/admin/users')
    } catch (err) {
      toast(err?.toString() || 'An error occurred', { type: 'error' })
    } finally {
      removeLoader('login-admin')
    }
  }

  useEffect(() => {
    if (navigate && user && user.role === UserRole.Admin) {
      navigate('/admin/users')
    }
  }, [user, navigate])

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value)
  }

  return (
    <AdminContainer disableNav>
      <FormContainer>
        <Form title="Login" onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            placeholder="mail@example.com"
            type="email"
            value={emailInput}
            onChange={handleEmailChange}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            value={passwordInput}
            onChange={handlePasswordChange}
          />
          <FormLinkRow>
            <a href="#">Forgot my password</a>
          </FormLinkRow>
          <Button>LOGIN</Button>
        </Form>
      </FormContainer>
    </AdminContainer>
  )
}

// Styles

const FormContainer = styled('section', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
})
