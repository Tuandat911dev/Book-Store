<script setup lang="ts">
import BaseTitle from '@/components/common/BaseTitle.vue'
import BaseSearch from '@/components/common/BaseSearch.vue'
import { onMounted, ref, computed, watch } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'
import BasePaginate from '@/components/common/BasePaginate.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useRouter } from 'vue-router'
import { useAuthorStore } from '@/stores/AuthorStore.ts'
import { deleteAuthor, fetchAuthors } from '@/apis/AuthorAPI.ts'
import type { TableHeader, TableRow } from '@/types'
import { useNotificationStore } from '@/stores/NotificationStore.ts'
import { ElMessage, ElMessageBox } from 'element-plus'

const loadAuthors = async () => {
  try {
    await fetchAuthors()
  } catch (error) {
    notificationStore.setNotification({
      title: 'Error',
      message: 'Failed to load authors',
      type: 'error',
    })
  }
}

onMounted(async () => {
  await loadAuthors()
})

const router = useRouter()
const notificationStore = useNotificationStore()
const title = 'Authors'

const headers = ref<TableHeader[]>([
  { key: 'name', label: 'Author' },
  { key: 'action', label: 'Action' },
])

const authorStore = useAuthorStore()
const currentPage = ref(1)
const pageSize = ref(9)
const authorSearch = ref('')

watch(authorSearch, (newAuthorSearch) => {
  authorStore.handleChangeAuthorSearch(newAuthorSearch)
})

const rows = computed<TableRow[]>(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return authorStore.filterAuthor.slice(start, end).map((author) => ({
    name: author.name,
    editLink: `/update-author/${author.id}`,
    deleteLink: `/delete-author/${author.id}`,
  }))
})

const goToAdd = () => {
  router.push('/add-author')
}

const handleDelete = async (id: number) => {
  try {
    await deleteAuthor(id)
    notificationStore.setNotification({
      title: 'Success',
      message: 'Delete Author Successfully',
      type: 'success',
    })
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Delete Author Failed'
    notificationStore.setNotification({
      title: 'Error',
      message: errorMessage,
      type: 'error',
    })
  }
  await loadAuthors()
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
      <BaseSearch :placeholder="'Search author name'" v-model="authorSearch" />
      <BaseButton title="Insert" @click="goToAdd" />
    </div>
  </div>

  <div class="detail">
    <BaseTable @delete="openDialog" :headers="headers" :rows="rows" />

    <BasePaginate
      :total="authorStore.filterAuthor.length"
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
