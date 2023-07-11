import { apiCall } from './utils.ts'

export function getURL(uri: string): string {
  if (uri.startsWith('http')) {
    return uri
  }

  return `${import.meta.env.VITE_API_HOST}${uri}`
}

export interface UploadFileResponse {
  upload: {
    _id: string
    filename: string
    uri: string
  }
}

export async function uploadFile(file: File): Promise<UploadFileResponse> {
  const formData = new FormData()
  formData.append('file', file)

  return await apiCall(
    `/uploads`,
    {
      method: 'POST',
      body: formData,
    },
    false,
  )
}
