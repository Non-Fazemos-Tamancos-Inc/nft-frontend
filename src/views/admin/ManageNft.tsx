import { useNavigate, useParams } from 'react-router-dom'

import { AdminContainer, AdminNavElements } from '../../components/container/AdminContainer.tsx'
import { Button, Form, FormContainer, Input, TextArea } from '../../components/core/Form'

export function ManageNft() {
  const { nftId } = useParams()
  const navigate = useNavigate()

  const isNew = nftId === 'new'

  const formTitle = isNew ? 'New NFT' : `Manage NFT ${nftId}`
  const actionButtonText = isNew ? 'CREATE' : 'UPDATE'

  return (
    <AdminContainer activePage={AdminNavElements.COLLECTIONS}>
      <FormContainer>
        <Form title={formTitle}>
          <Input label="Name" placeholder="Pink Thingie #1" type="text" />
          <Input label="Price" placeholder="0.069" type="number" step="0.00000001" min="0" />
          <Input label="Image URL" placeholder="https://tinyurl.com/4mfskjjz" type="text" />
          <TextArea label="Description" placeholder="Bla bla bla" />

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
