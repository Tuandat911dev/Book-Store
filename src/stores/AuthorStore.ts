import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Author } from '@/types'

export const useAuthorStore = defineStore('author', () => {
  const authors = ref<Author[]>(JSON.parse(localStorage.getItem('author') || '[]'))
  const authorSearch = ref('')

  const setAuthors = (newAuthors: Author[]) => {
    authors.value = newAuthors
    localStorage.setItem('author', JSON.stringify(newAuthors))
  }

  const handleChangeAuthorSearch = (value: string) => {
    authorSearch.value = value
  }

  const filterAuthor = computed<Author[]>(() => {
    return authors.value.filter((item) =>
      item.name.toUpperCase().includes(authorSearch.value.toUpperCase())
    );
  });

  return { authors, setAuthors, authorSearch, handleChangeAuthorSearch, filterAuthor }
})
