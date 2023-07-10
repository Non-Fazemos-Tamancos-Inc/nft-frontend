import { styled } from '@stitches/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminContainer } from '../../components/container/AdminContainer.tsx'
import { Button, Form, FormLinkRow, Input } from '../../components/core/Form'

// Main component
export function AdminLogin() {
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
    navigate('/admin/users')
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
