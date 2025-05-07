<script setup lang="ts">
import BaseTitle from '@/components/common/BaseTitle.vue'
import { onMounted, ref, computed, watch } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'
import BaseSearch from '@/components/common/BaseSearch.vue'
import BasePaginate from '@/components/common/BasePaginate.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/BookStore.ts'
import { deleteBookAPI, fetchBooks } from '@/apis/BookAPI.ts'
import type { TableHeader, TableRow } from '@/types'
import { useNotificationStore } from '@/stores/NotificationStore.ts'
import { ElMessage, ElMessageBox } from 'element-plus'

const bookStore = useBookStore()
const notificationStore = useNotificationStore()
const loadProducts = async () => {
  try {
    await fetchBooks()
  } catch (error) {
    notificationStore.setNotification({
      title: 'Error',
      message: 'Failed to load books',
      type: 'error',
    })
  }
}

onMounted(async () => {
  await loadProducts()
})
const currentPage = ref(1)
const pageSize = ref(9)
const bookSearch = ref('')

watch(bookSearch, (newBookSearch) => {
  bookStore.handleChangeBookSearch(newBookSearch)
})

const rows = computed<TableRow[]>(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return bookStore.filterBooks.slice(start, end).map((book) => ({
    img: book.avatar,
    title: book.name,
    category: book.category.name,
    author: book.author.name,
    publish: book.publish_year,
    price: `$${book.price}`,
    piece: book.quantity,
    editLink: `/update-product/${book.id}`,
    deleteLink: `/delete-product/${book.id}`,
  }))
})

const router = useRouter()
const title = 'Product Stock'
const headers = ref<TableHeader[]>([
  { key: 'img', label: 'Image' },
  { key: 'title', label: 'BaseTitle' },
  { key: 'category', label: 'Category' },
  { key: 'author', label: 'Author' },
  { key: 'publish', label: 'Publish Year' },
  { key: 'price', label: 'Price' },
  { key: 'piece', label: 'Piece' },
  { key: 'action', label: 'Action' },
])

const goToAdd = () => {
  router.push('/add-product')
}

const handleDelete = async (id: number) => {
  await deleteBookAPI(id)
  try {
    notificationStore.setNotification({
      title: 'Success',
      message: 'Delete Book Successfully',
      type: 'success',
    })
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Delete Book Failed'
    notificationStore.setNotification({
      title: 'Error',
      message: errorMessage,
      type: 'error',
    })
  }
  await loadProducts()
}

const openDialog = (id: number) => {
  ElMessageBox.confirm('Are you sure you want to delete?', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
    .then(() => {
      handleDelete(id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}
</script>

<template>
  <div class="head">
    <BaseTitle :title="title" />
    <div class="action-wrap">
      <BaseSearch :placeholder="'Search Product Name'" v-model="bookSearch" />
      <BaseButton title="Insert" @click="goToAdd" />
    </div>
  </div>

  <div class="detail">
    <BaseTable @delete="openDialog" :headers="headers" :rows="rows" />

    <BasePaginate
      :total="bookStore.filterBooks.length"
      :page-size="pageSize"
      :current-page="currentPage"
      @update:current-page="currentPage = $event"
    />
  </div>
</template>

<style scoped>
.detail {
  overflow: auto;
  max-height: calc(100vh - 200px);
  scrollbar-width: none;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.action-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

::v-deep(.btn button) {
  margin-bottom: 0;
  width: 80px;
  border-radius: 20px;
  height: 38px;
  padding: 0;
}
</style>
