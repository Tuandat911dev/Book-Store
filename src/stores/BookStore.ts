import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Book } from '@/types'

export const useBookStore = defineStore('book', () => {
  const books = ref<Book[]>(JSON.parse(localStorage.getItem('book') || '[]'))
  const bookSearch = ref('')

  const setBooks = (newBooks: Book[]) => {
    books.value = newBooks
    localStorage.setItem('book', JSON.stringify(newBooks))
  }

  const handleChangeBookSearch = (value: string) => {
    bookSearch.value = value
  }

  const filterBooks = computed<Book[]>(() => {
    return books.value.filter((item) =>
      item.name.toUpperCase().includes(bookSearch.value.toUpperCase()),
    )
  })

  return { books, setBooks, bookSearch, handleChangeBookSearch, filterBooks }
})
