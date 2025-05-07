import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Category } from '@/types'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>(JSON.parse(localStorage.getItem('category') || '[]'))
  const categorySearch = ref('')

  const setCategories = (newCategories: Category[]) => {
    categories.value = newCategories
    localStorage.setItem('category', JSON.stringify(newCategories))
  }

  const handleChangeCategorySearch = (value: string) => {
    categorySearch.value = value
  }

  const filterCategory = computed<Category[]>(() => {
    return categories.value.filter((item) =>
      item.name.toUpperCase().includes(categorySearch.value.toUpperCase()),
    )
  })
  return { categories, setCategories, categorySearch, filterCategory, handleChangeCategorySearch }
})
