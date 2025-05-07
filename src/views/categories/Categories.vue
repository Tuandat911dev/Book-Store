<script setup lang="ts">
import BaseTitle from '@/components/common/BaseTitle.vue'
import BaseSearch from '@/components/common/BaseSearch.vue'
import { onMounted, ref, computed, watch } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'
import BasePaginate from '@/components/common/BasePaginate.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useCategoryStore } from '@/stores/CategoryStore.ts'
import { useRouter } from 'vue-router'
import { fetchCategories, deleteCategoryAPI } from '@/apis/CategoryAPI.ts'
import type { TableHeader, TableRow } from '@/types'
import { useNotificationStore } from '@/stores/NotificationStore.ts'
import { ElMessage, ElMessageBox } from 'element-plus'

const loadCategories = async () => {
  try {
    await fetchCategories()
  } catch (error) {
    notificationStore.setNotification({
      title: 'Error',
      message: 'Failed to load categories',
      type: 'error',
    })
  }
}

onMounted(async () => {
  await loadCategories()
})

const title = 'Categories'
const router = useRouter()
const notificationStore = useNotificationStore()

const headers = ref<TableHeader[]>([
  { key: 'img', label: 'Image' },
  { key: 'title', label: 'BaseTitle' },
  { key: 'description', label: 'Description' },
  { key: 'action', label: 'Action' },
])

const categoryStore = useCategoryStore()
const currentPage = ref(1)
const pageSize = ref(9)
const categorySearch = ref('')

watch(categorySearch, (newCategorySearch) => {
  categoryStore.handleChangeCategorySearch(newCategorySearch)
})

const rows = computed<TableRow[]>(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return categoryStore.filterCategory.slice(start, end).map((category) => ({
    img: category.banner || 'default-image.png',
    title: category.name,
    description: category.description,
    editLink: `/update-category/${category.id}`,
    deleteLink: `/delete-category/${category.id}`,
  }))
})

const goToAdd = () => {
  router.push('/add-category')
}

const handleDelete = async (id: number) => {
  try {
    await deleteCategoryAPI(id)
    notificationStore.setNotification({
      title: 'Success',
      message: 'Delete Category Successfully',
      type: 'success',
    })
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Delete Category Failed'
    notificationStore.setNotification({
      title: 'Error',
      message: errorMessage,
      type: 'error',
    })
  }
  await loadCategories()
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
      <BaseSearch :placeholder="'BaseSearch category name'" v-model="categorySearch" />
      <BaseButton title="Insert" @click="goToAdd" />
    </div>
  </div>

  <div class="detail">
    <BaseTable @delete="openDialog" :headers="headers" :rows="rows" />
    <BasePaginate
      :total="categoryStore.filterCategory.length"
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

::v-deep(table img) {
  width: 140px !important;
  height: 75px !important;
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
