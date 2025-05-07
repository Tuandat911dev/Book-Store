<script setup lang="ts">
import BaseTitle from '@/components/common/BaseTitle.vue'
import { computed, onMounted, ref } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import type { Input as FieldInput } from '@/types'
import BaseSelectBox from '@/components/common/BaseSelectBox.vue'
import { useCategoryStore } from '@/stores/CategoryStore.ts'
import { useRouter, useRoute } from 'vue-router'
import { findCategoryById, updateCategoryAPI } from '@/apis/CategoryAPI.ts'
import BaseTextArea from '@/components/common/BaseTextArea.vue'
import type { Category } from '@/types'
import { useNotificationStore } from '@/stores/NotificationStore.ts'

const notificationStore = useNotificationStore()
const title = 'Update Category'
const categoryStore = useCategoryStore()
const router = useRouter()
const route = useRoute()
const category = ref<Category>({
  id: 0,
  name: '',
  banner: '',
  description: '',
  parent_id: 0,
  home_order: 0,
  is_featured: 0,
})
const errorCategoryName = ref('')
const errorBannerUrl = ref('')
const errorHomeOrder = ref('')
const errorDescription = ref('')

const validateForm = () => {
  let isValid = true

  errorCategoryName.value = ''
  errorBannerUrl.value = ''
  errorHomeOrder.value = ''
  errorDescription.value = ''

  if (category.value.name.trim().length === 0) {
    errorCategoryName.value = 'Category name is required'
    isValid = false
  }

  if (category.value.banner.trim().length === 0) {
    errorBannerUrl.value = 'Banner URL is required'
    isValid = false
  } else if (!/^https?:\/\/.+\..+/.test(category.value.banner)) {
    errorBannerUrl.value = 'Invalid URL format'
    isValid = false
  }

  if (isNaN(Number(category.value.home_order)) || Number(category.value.home_order) < 0) {
    errorHomeOrder.value = 'Home order must be a non-negative number'
    isValid = false
  }

  if (category.value.description.trim().length < 10) {
    errorDescription.value = 'Description must be at least 10 characters'
    isValid = false
  }

  return isValid
}

const fetchCategory = async () => {
  const categoryId = Number(route.params.id)
  category.value = await findCategoryById(categoryId)
}

onMounted(() => {
  fetchCategory()
})

const inputs = computed<FieldInput[]>(() => [
  {
    label: 'Name',
    placeholder: 'Category Name',
    inputType: 'text',
    id: 'name',
    name: 'name',
    value: category.value.name,
    error: errorCategoryName.value,
  },
  {
    label: 'Banner',
    placeholder: 'Banner',
    inputType: 'url',
    id: 'banner',
    name: 'banner',
    value: category.value.banner,
    error: errorBannerUrl.value,
  },
  {
    label: 'Home Order',
    placeholder: 'Home order',
    inputType: 'number',
    id: 'home_order',
    name: 'home_order',
    value: category.value.home_order,
    error: errorHomeOrder.value,
  },
])

const selects = computed(() => [
  {
    label: 'Parent',
    id: 'parent_id',
    name: 'parent_id',
    error: '',
    value: category.value.parent_id,
    options: categoryStore.categories.map((category) => ({
      value: category.id.toString(),
      selected: false,
      title: category.name,
    })),
  },
  {
    label: 'Is Featured',
    id: 'is_featured',
    name: 'is_featured',
    error: '',
    value: category.value.is_featured,
    options: [
      {
        value: true,
        selected: true,
        title: 'Yes',
      },
      {
        value: false,
        selected: false,
        title: 'No',
      },
    ],
  },
])

const textAreas = computed<FieldInput[]>(() => [
  {
    label: 'Description',
    placeholder: 'Description',
    id: 'description',
    name: 'description',
    value: category.value.description,
    error: errorDescription.value,
  },
])

const updateCategory = async (event: any) => {
  const formData = new FormData(event.target)
  const formObject = Object.fromEntries(formData.entries())

  category.value.name = formObject.name as string
  category.value.banner = formObject.banner as string
  category.value.home_order = Number(formObject.home_order)
  category.value.description = formObject.description as string
  category.value.parent_id = Number(formObject.parent_id)
  category.value.is_featured = Number(formObject.is_featured)

  const isValid = validateForm()
  if (!isValid) return
  try {
    await updateCategoryAPI(Number(route.params.id), formData)
    notificationStore.setNotification({
      title: 'Success',
      message: 'Add Category Successfully',
      type: 'success',
    })

    await router.push('/categories')
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Add Category Failed'
    notificationStore.setNotification({
      title: 'Error',
      message: errorMessage,
      type: 'error',
    })
  }
}
</script>

<template>
  <BaseTitle :title="title" />

  <div class="detail">
    <div class="contact-container">
      <form class="contact-form" @submit.prevent="updateCategory">
        <div class="form-row">
          <BaseInput :inputs="inputs" />
          <BaseSelectBox :selects="selects" />
        </div>
        <div class="text-area">
          <BaseTextArea :inputs="textAreas" />
        </div>
        <BaseButton title="Save Changes" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.detail {
  overflow: auto;
  max-height: calc(100vh - 200px);
  scrollbar-width: none;
}

.contact-container {
  background-color: #fff;
  width: 100%;
  padding: 60px 180px;
  border-radius: 14px;
}

.text-area {
  margin-top: 45px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;
}

::v-deep(.btn button) {
  font-size: 17px;
  font-weight: 700;
  padding: 16px 32px;
  border-radius: 12px;
  width: 274px;
  margin-top: 38px;
}

::v-deep(.btn button:hover) {
  background-color: #3a6ad9;
}

::v-deep(.form-group) {
  margin-bottom: 0;
}

::v-deep(input),
::v-deep(select) {
  width: 360px;
  height: 52px;
}

::v-deep(.label) {
  color: #606060;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 11px;
}

::v-deep(select) {
  text-align: left;
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background-color: #f9fafb;
  margin-bottom: 15px;
}
</style>
