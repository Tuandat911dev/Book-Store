import api from '@/services/asios.ts'
import type { Author, Category } from '@/types'
import { useCategoryStore } from '@/stores/CategoryStore.ts'

export const fetchCategories = async (): Promise<void> => {
  const categoryStore = useCategoryStore()
  try {
    const response = await api.get<{ success: boolean; data: Category[] }>('/categories')
    categoryStore.setCategories(response.data)
  } catch (error) {
    console.error(error)
  }
}

export const addCategoryAPI = async (formData: FormData) => {
  return api.post('/categories', formData)
}

export const findCategoryById = async (id: number): Promise<Category> => {
  const response = await api.get<{ data: Category }>(`/categories/${id}`)
  return response.data
}

export const updateCategoryAPI = async (id: number, formData: FormData) => {
  return api.put(`/categories/${id}`, formData)
}

export const deleteCategoryAPI = async (id: number): Promise<void> => {
  return api.delete<void>(`/categories/${id}`)
}
