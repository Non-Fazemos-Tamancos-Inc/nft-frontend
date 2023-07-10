import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Button, Form, FormContainer, FormLinkRow, Input } from '../../components/core/Form'
import { useNoAuth } from '../../hooks/useAuth.tsx'

// Main component
export function Login() {
  const { login } = useNoAuth()

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
      await login(emailInput, passwordInput)
      navigate('/profile')
    } catch (err) {
      console.error(err)
      alert(`Login failed: ${err}`)
    }
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
            <a href="#">Forgot my password</a>
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
