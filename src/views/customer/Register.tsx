import { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Button, Form, FormContainer, Input } from '../../components/core/Form'

// Main component
export function Register() {
  const navigate = useNavigate()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (_e: FormEvent<HTMLFormElement>) => {
    navigate('/home')
  }

  return (
    <CustomerContainer activePage={CustomerNavElements.USER}>
      <FormContainer>
        <Form title="Register" onSubmit={handleSubmit}>
          <Input label="Name" placeholder="Someone Somewhere" type="text" />
          <Input label="E-mail" placeholder="mail@example.com" type="email" />
          <Input label="Password" placeholder="••••••••" type="password" />
          <Input label="Wallet Address" placeholder="0x95aD61b0a150d79219..." type="text" />

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
