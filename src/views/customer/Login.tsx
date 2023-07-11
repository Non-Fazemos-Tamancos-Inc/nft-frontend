import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Button, Form, FormContainer, FormLinkRow, Input } from '../../components/core/Form'
import { useAuthenticationStore } from '../../store/AuthenticationStore.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'

// Main component
export function Login() {
  const { login } = useAuthenticationStore(({ login }) => ({ login }))
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const navigate = useNavigate()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      addLoader('login')
      await login(emailInput, passwordInput)
      toast('Logged in', { type: 'success' })
      navigate('/profile')
    } catch (err) {
      toast(err?.toString() || 'An error occurred', { type: 'error' })
    } finally {
      removeLoader('login')
    }
  }

  const handleForgotPassword = (e: FormEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    toast('Well... remember it', { type: 'info' })
  }

  return (
    <CustomerContainer activePage={CustomerNavElements.USER}>
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
            <a href="#" onClick={handleForgotPassword}>
              Forgot my password
            </a>
          </FormLinkRow>
          <Button>LOGIN</Button>
          <Button
            type="reset"
            onClick={(e) => {
              e.preventDefault()
              navigate('/register')
            }}
            fill={false}
          >
            CREATE AN ACCOUNT
          </Button>
        </Form>
      </FormContainer>
    </CustomerContainer>
  )
}
