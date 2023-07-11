import { styled } from '@stitches/react'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { createNFT, getNFTById, updateNFT } from '../../api/nfts.ts'
import { NFT, Upload } from '../../api/types.ts'
import { getURL, uploadFile } from '../../api/uploads.ts'
import { AdminContainer, AdminNavElements } from '../../components/container/AdminContainer.tsx'
import { Button, Form, FormContainer, Input, TextArea } from '../../components/core/Form'
import { useAdminRequired } from '../../hooks/useAdminRequired.ts'
import { useLoaderStore } from '../../store/LoaderStore.ts'

export function ManageNft() {
  useAdminRequired()

  const { collectionId, nftId } = useParams()
  const navigate = useNavigate()

  const isNew = nftId === 'new'

  const [nft, setNft] = useState<NFT | null>(null)
  const { addLoader, removeLoader } = useLoaderStore(({ addLoader, removeLoader }) => ({
    addLoader,
    removeLoader,
  }))

  useEffect(() => {
    if (!nftId) {
      return
    }

    if (nftId === 'new') {
      setNft(null)
      return
    }

    const fetchNft = async () => {
      addLoader('fetch-nft')
      try {
        const data = await getNFTById(nftId)
        setNft(data.nft)
      } catch (err) {
        toast(err?.toString() || 'An error occurred', { type: 'error' })
        navigate('/admin/nfts')
      } finally {
        removeLoader('fetch-nft')
      }
    }

    fetchNft().then().catch(console.error)
  }, [nftId, setNft, addLoader, navigate, removeLoader])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nameEl = e.currentTarget.elements.namedItem('name') as HTMLInputElement
    const descriptionEl = e.currentTarget.elements.namedItem('description') as HTMLInputElement
    const priceEl = e.currentTarget.elements.namedItem('price') as HTMLInputElement
    const imageEl = e.currentTarget.elements.namedItem('image') as HTMLInputElement

    addLoader('submit-nft')
    try {
      const files = imageEl.files

      if (!nameEl.value) {
        toast('Name is required', { type: 'error' })
        return
      }

      if (!priceEl.value) {
        toast('Price is required', { type: 'error' })
        return
      }

      if (!descriptionEl.value) {
        toast('Description is required', { type: 'error' })
        return
      }

      if (nft) {
        let imageUpload: Upload | undefined
        if (files && files.length !== 0) {
          imageUpload = (await uploadFile(files[0])).upload
        }

        if (!imageUpload && !nft.image) {
          toast('Image is required', { type: 'error' })
          return
        }

        await updateNFT(
          nft._id,
          nameEl.value,
          descriptionEl.value,
          imageUpload?.uri || nft.image || '',
          parseFloat(priceEl.value),
        )

        toast('NFT updated', { type: 'success' })
        navigate(`/admin/collections/${collectionId}/nfts`)
      } else {
        if (!files || files.length === 0) {
          toast('Image is required', { type: 'error' })
          return
        }

        if (!collectionId) {
          toast('Collection is required', { type: 'error' })
          return
        }

        const imageUpload = await uploadFile(files[0])

        const data = await createNFT(
          nameEl.value,
          descriptionEl.value,
          imageUpload.upload.uri,
          collectionId,
          parseFloat(priceEl.value),
        )

        toast('NFT created', { type: 'success' })
        navigate(`/admin/collections/${collectionId}/nfts/${data.nft._id}`)
      }
    } catch (err) {
      toast(err?.toString() || 'An error occurred', { type: 'error' })
    } finally {
      removeLoader('submit-nft')
    }
  }

  const formTitle = isNew ? 'New NFT' : `Update NFT`
  const actionButtonText = isNew ? 'CREATE' : 'UPDATE'

  console.log({ collectionId })

  return (
    <AdminContainer activePage={AdminNavElements.COLLECTIONS}>
      <FormContainer>
        <Form title={formTitle} onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            placeholder="Pink Thingie #1"
            defaultValue={nft?.name || ''}
            type="text"
          />
          <Input
            label="Price"
            placeholder="0.069"
            name="price"
            type="number"
            step="0.00000001"
            min="0"
            defaultValue={nft?.price}
          />
          <TextArea
            label="Description"
            name="description"
            defaultValue={nft?.description || ''}
            placeholder="Your description goes here"
          />
          <ImagePreviewRow>
            {nft?.image && <img src={getURL(nft.image)} alt="Collection Preview" />}
            <Input label="Image" name="image" type="file" accept="image/*" />
          </ImagePreviewRow>

          <Button>{actionButtonText}</Button>
          <Button
            type="reset"
            onClick={(e) => {
              e.preventDefault()
              navigate(`/admin/collections/${nft?.collectionId || collectionId}/nfts`)
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
