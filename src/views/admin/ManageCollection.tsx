import { styled } from '@stitches/react'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { createCollection, getCollectionById, updateCollection } from '../../api/collections.ts'
import { Collection, Upload } from '../../api/types.ts'
import { getURL, uploadFile } from '../../api/uploads.ts'
import { AdminContainer, AdminNavElements } from '../../components/container/AdminContainer.tsx'
import { Button, Form, FormContainer, Input, TextArea } from '../../components/core/Form'
import { useAdminRequired } from '../../hooks/useAdminRequired.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'

export function ManageCollection() {
  useAdminRequired()

  const { collectionId } = useParams()
  const navigate = useNavigate()

  const isNew = collectionId === 'new'

  const [collection, setCollection] = useState<Collection | null>(null)
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))
  const [date, setDate] = useState<string | null>(null)

  useEffect(() => {
    if (!collectionId) {
      return
    }

    if (collectionId === 'new') {
      setCollection(null)
      return
    }

    const fetchCollection = async () => {
      addLoader('fetch-collection')
      try {
        const data = await getCollectionById(collectionId)
        setCollection(data.collection)
        if (data.collection.releaseDate) {
          setDate(new Date(data.collection.releaseDate).toISOString().substring(0, 16))
        }
      } catch (err) {
        toast(err?.toString() || 'An error occurred', { type: 'error' })
        navigate('/admin/collections')
      } finally {
        removeLoader('fetch-collection')
      }
    }

    fetchCollection().then().catch(console.error)
  }, [collectionId, setCollection, addLoader, navigate, removeLoader])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nameEl = e.currentTarget.elements.namedItem('name') as HTMLInputElement
    const descriptionEl = e.currentTarget.elements.namedItem('description') as HTMLInputElement
    const imageEl = e.currentTarget.elements.namedItem('image') as HTMLInputElement

    addLoader('submit-collection')
    try {
      const files = imageEl.files

      if (!nameEl.value) {
        toast('Name is required', { type: 'error' })
        return
      }
      if (!date) {
        toast('Release Date is required', { type: 'error' })
        return
      }
      if (!descriptionEl.value) {
        toast('Description is required', { type: 'error' })
        return
      }

      if (collection) {
        let imageUpload: Upload | undefined
        if (files && files.length !== 0) {
          imageUpload = (await uploadFile(files[0])).upload
        }

        await updateCollection(
          collection._id,
          nameEl.value,
          descriptionEl.value,
          date,
          imageUpload?.uri || collection.image || undefined,
        )

        toast('Collection updated', { type: 'success' })
        navigate(`/admin/collections`)
      } else {
        if (!files || files.length === 0) {
          toast('Image is required', { type: 'error' })
          return
        }

        const imageUpload = await uploadFile(files[0])

        const data = await createCollection(
          nameEl.value,
          descriptionEl.value,
          imageUpload.upload.uri,
          date,
        )
        toast('Collection created', { type: 'success' })
        navigate(`/admin/collections/${data.collection._id}`)
      }
    } catch (err) {
      toast(err?.toString() || 'An error occurred', { type: 'error' })
    } finally {
      removeLoader('submit-collection')
    }
  }

  const formTitle = isNew ? 'New Collection' : `Update Collection`
  const actionButtonText = isNew ? 'CREATE' : 'UPDATE'

  return (
    <AdminContainer activePage={AdminNavElements.COLLECTIONS}>
      <FormContainer>
        <Form title={formTitle} onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            placeholder="Pink Thingie #1"
            defaultValue={collection?.name || ''}
            type="text"
          />
          <Input
            label="Release Date"
            name="releaseDate"
            value={date || undefined}
            onChange={(e) => setDate(e.target.value)}
            type="datetime-local"
          />
          <TextArea
            label="Description"
            name="description"
            defaultValue={collection?.description || ''}
            placeholder="Your description goes here"
          />
          <ImagePreviewRow>
            {collection?.image && (
              <img src={getURL(collection.image)} alt="Collection Preview" />
            )}
            <Input label="Image URL" name="image" type="file" accept="image/*" />
          </ImagePreviewRow>

          <Button>{actionButtonText}</Button>
          <Button
            type="reset"
            onClick={(e) => {
              e.preventDefault()
              navigate('/admin/collections')
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

const ImagePreviewRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',

  img: {
    height: '80px',
    marginRight: '1rem',
  },
})
