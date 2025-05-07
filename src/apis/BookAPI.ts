import api from '@/services/asios.ts'
import type { Book, Category } from '@/types'
import { useBookStore } from '@/stores/BookStore.ts'

const bookStore = useBookStore()
export const fetchBooks = async (): Promise<void> => {
  try {
    const response = await api.get<{ success: boolean; data: Book[] }>('/books');
    bookStore.setBooks(response.data);
  } catch (error) {
    console.error(error);
  }
}

export const addBookAPI = async (formData: FormData) => {
  return api.post('/books', formData)
}

export const findBookById = async (id: number): Promise<Book> => {
  const response = await api.get<{ data: Book }>(`/books/${id}`)
  return response.data
}

export const updateBookAPI = async (id: number, formData: FormData) => {
  return api.put(`/books/${id}`, formData)
}

export const deleteBookAPI = async (id: number): Promise<void> => {
  return api.delete<void>(`/books/${id}`)
}

