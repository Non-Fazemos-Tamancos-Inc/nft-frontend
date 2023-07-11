import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { User, UserRole } from '../../api/types.ts'
import { getUserById, register, updateUser } from '../../api/users.ts'
import { AdminContainer, AdminNavElements } from '../../components/container/AdminContainer.tsx'
import { Button, Checkbox, Form, FormContainer, Input } from '../../components/core/Form'
import { useAdminRequired } from '../../hooks/useAdminRequired.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'

export function ManageUser() {
  useAdminRequired()

  const navigate = useNavigate()
  const { userId } = useParams()

  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  const [user, setUser] = useState<User | null>(null)
  const [admin, setAdmin] = useState(false)

  const isNew = userId === 'new'

  useEffect(() => {
    if (!userId) {
      return
    }

    if (userId === 'new') {
      setUser(null)
      return
    }

    const fetchUser = async () => {
      addLoader('fetch-user')
      try {
        const data = await getUserById(userId)
        setUser(data.user)
        setAdmin(data.user.role === UserRole.Admin)
      } catch (err) {
        toast(err?.toString() || 'An error occurred', { type: 'error' })
        navigate('/admin/users')
      } finally {
        removeLoader('fetch-user')
      }
    }

    fetchUser().then().catch(console.error)
  }, [userId, setUser, addLoader, navigate, removeLoader])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const passwordEl = e.currentTarget.elements.namedItem('password') as HTMLInputElement
    const nameEl = e.currentTarget.elements.namedItem('name') as HTMLInputElement
    const emailEl = e.currentTarget.elements.namedItem('email') as HTMLInputElement
    const walletEl = e.currentTarget.elements.namedItem('wallet') as HTMLInputElement

    try {
      addLoader('update-create-user')
      if (user) {
        await updateUser(
          user._id,
          nameEl.value || undefined,
          emailEl.value || undefined,
          passwordEl.value || undefined,
          walletEl.value || null,
          true,
          admin,
        )
        toast('User updated', { type: 'success' })
      } else {
        if (!nameEl.value) {
          toast('Name is required', { type: 'error' })
          return
        }

        if (!emailEl.value) {
          toast('E-mail is required', { type: 'error' })
          return
        }

        if (!passwordEl.value) {
          toast('Password is required', { type: 'error' })
          return
        }

        await register(
          nameEl.value,
          emailEl.value,
          passwordEl.value,
          walletEl.value,
          admin || undefined,
        )
        toast('User created', { type: 'success' })
        navigate('/admin/users')
      }
    } catch (err) {
      toast(err?.toString() || 'An error occurred', { type: 'error' })
    } finally {
      removeLoader('update-create-user')
    }
  }

  const formTitle = isNew ? 'New User' : 'Update User'
  const actionButtonText = isNew ? 'CREATE' : 'UPDATE'

  return (
    <AdminContainer activePage={AdminNavElements.USERS}>
      <FormContainer>
        <Form title={formTitle} onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            placeholder="Someone Somewhere"
            defaultValue={user?.name || ''}
            type="text"
          />
          <Input
            name="email"
            label="E-mail"
            placeholder="mail@example.com"
            defaultValue={user?.email || ''}
            type="email"
          />
          <Input label="Password" name="password" placeholder="••••••••" type="password" />
          <Input
            name="wallet"
            label="Wallet Address"
            placeholder="0x95aD61b0a150d79219..."
            defaultValue={user?.wallet}
            type="text"
          />
          <Checkbox
            label="Admin"
            name="admin"
            checked={admin}
            onClick={() => setAdmin((prev) => !prev)}
          />
          <Button type="submit">{actionButtonText}</Button>
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
