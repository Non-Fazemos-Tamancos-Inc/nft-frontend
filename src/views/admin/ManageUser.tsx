import { useNavigate, useParams } from 'react-router-dom'

import { AdminContainer, AdminNavElements } from '../../components/container/AdminContainer.tsx'
import {
  Button,
  Checkbox,
  Form,
  FormContainer,
  FormLinkRow,
  Input,
} from '../../components/core/Form'

export function ManageUser() {
  const { userId } = useParams()
  const navigate = useNavigate()

  const isNew = userId === 'new'

  const formTitle = isNew ? 'New User' : `Manage User ${userId}`
  const actionButtonText = isNew ? 'CREATE' : 'UPDATE'

  return (
    <AdminContainer activePage={AdminNavElements.USERS}>
      <FormContainer>
        <Form title={formTitle}>
          <Input label="Name" placeholder="Someone Somewhere" type="text" />
          <Input label="E-mail" placeholder="mail@example.com" type="email" />
          <Input label="Password" placeholder="••••••••" type="password" />
          <Input label="Wallet Address" placeholder="0x95aD61b0a150d79219..." type="text" />
          <Checkbox label="Admin" />

          {isNew && (
            <FormLinkRow>
              <a href="#">Send password reset</a>
            </FormLinkRow>
          )}
          <Button>{actionButtonText}</Button>
          <Button
            type="reset"
            onClick={(e) => {
              e.preventDefault()
              navigate('/admin/users')
            }}
            fill={false}
          >
            Go Back
          </Button>
        </Form>
      </FormContainer>
    </AdminContainer>
  )
}
