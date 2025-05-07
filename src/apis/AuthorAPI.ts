import api from '@/services/asios.ts'
import type { Author } from '@/types'
import { useAuthorStore } from '@/stores/AuthorStore.ts'

export const fetchAuthors = async (): Promise<void> => {
  const authorStore = useAuthorStore()
  const response = await api.get<{ data: Author[] }>('/authors')
  authorStore.setAuthors(response.data)
}

export const addAuthorAPI = async (formData: FormData) => {
  return api.post('/authors', formData)
}

export const findAuthorById = async (id: number): Promise<Author> => {
  const response = await api.get<{ data: Author }>(`/authors/${id}`)
  return response.data
}

export const updateAuthor = async (id: number, formData: FormData) => {
  return api.put(`/authors/${id}`, formData)
}

export const deleteAuthor = async (id: number): Promise<void> => {
  return api.delete<void>(`/authors/${id}`)
}