import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Button, Form, FormContainer, FormLinkRow, Input } from '../../components/core/Form'

// Main component
export function Login() {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const navigate = useNavigate()

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value)
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (_e: FormEvent<HTMLFormElement>) => {
    navigate('/home')
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
