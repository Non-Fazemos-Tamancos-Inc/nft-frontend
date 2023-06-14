import { useNavigate } from 'react-router-dom'

import {
  CustomerContainer,
  CustomerNavElements,
} from '../../components/container/CustomerContainer.tsx'
import { Button, Form, FormContainer, Input } from '../../components/core/Form'

export function Profile() {
  const navigate = useNavigate()

  return (
    <CustomerContainer activePage={CustomerNavElements.USER}>
      <FormContainer>
        <Form title="Your Account">
          <Input label="Name" placeholder="Someone Somewhere" type="text" />
          <Input label="E-mail" placeholder="mail@example.com" type="email" />
          <Input label="Password" placeholder="••••••••" type="password" />
          <Input label="Wallet Address" placeholder="0x95aD61b0a150d79219..." type="text" />

          <Button>UPDATE ACCOUNT</Button>
          <Button
            type="reset"
            onClick={(e) => {
              e.preventDefault()
              navigate('/login')
            }}
            fill={false}
          >
            LOGOUT
          </Button>
        </Form>
      </FormContainer>
    </CustomerContainer>
  )
}
