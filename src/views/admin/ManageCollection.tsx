import { useNavigate, useParams } from 'react-router-dom'

import { AdminContainer, AdminNavElements } from '../../components/container/AdminContainer.tsx'
import { Button, Form, FormContainer, Input } from '../../components/core/Form'

export function ManageCollection() {
  const { collectionId } = useParams()
  const navigate = useNavigate()

  const isNew = collectionId === 'new'

  const formTitle = isNew ? 'New Collection' : `Manage Collection ${collectionId}`
  const actionButtonText = isNew ? 'CREATE' : 'UPDATE'

  return (
    <AdminContainer activePage={AdminNavElements.COLLECTIONS}>
      <FormContainer>
        <Form title={formTitle}>
          <Input label="Name" placeholder="Pink Thingie #1" type="text" />
          <Input label="Release Date (ISO Format)" placeholder="2024‐02‐06T12:25:20Z" />
          <Input label="Image URL" placeholder="https://tinyurl.com/4mfskjjz" type="text" />

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
