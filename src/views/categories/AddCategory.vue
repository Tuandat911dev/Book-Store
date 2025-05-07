<script setup lang="ts">
import BaseTitle from '@/components/common/BaseTitle.vue'
import { computed, ref } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import type { Input as FieldInput } from '@/types'
import BaseSelectBox from '@/components/common/BaseSelectBox.vue'
import { useCategoryStore } from '@/stores/CategoryStore.ts'
import { useRouter } from 'vue-router'
import { addCategoryAPI } from '@/apis/CategoryAPI.ts'
import BaseTextArea from '@/components/common/BaseTextArea.vue'
import { useNotificationStore } from '@/stores/NotificationStore.ts'

const notificationStore = useNotificationStore()
const title = 'Add New Category'
const categoryStore = useCategoryStore()
const router = useRouter()
const categoryName = ref('')
const bannerUrl = ref('')
const homeOrder = ref('')
const description = ref('')
const parentId = ref('')
const isFeatured = ref('1')

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

  if (categoryName.value.trim().length === 0) {
    errorCategoryName.value = 'Category name is required'
    isValid = false
  }

  if (bannerUrl.value.trim().length === 0) {
    errorBannerUrl.value = 'Banner URL is required'
    isValid = false
  } else if (!/^https?:\/\/.+\..+/.test(bannerUrl.value)) {
    errorBannerUrl.value = 'Invalid URL format'
    isValid = false
  }

  if (isNaN(Number(homeOrder.value)) || Number(homeOrder.value) < 0) {
    errorHomeOrder.value = 'Home order must be a non-negative number'
    isValid = false
  }

  if (description.value.trim().length < 10) {
    errorDescription.value = 'Description must be at least 10 characters'
    isValid = false
  }

  return isValid
}

const inputs = computed<FieldInput[]>(() => [
  {
    label: 'Name',
    placeholder: 'Category Name',
    inputType: 'text',
    id: 'name',
    name: categoryName.value,
    error: errorCategoryName.value,
  },
  {
    label: 'Banner',
    placeholder: 'Banner',
    inputType: 'url',
    id: 'banner',
    name: bannerUrl.value,
    error: errorBannerUrl.value,
  },
  {
    label: 'Home Order',
    placeholder: 'Home order',
    inputType: 'number',
    id: 'home_order',
    name: homeOrder.value,
    error: errorHomeOrder.value,
  },
])

const textAreas = computed<FieldInput[]>(() => [
  {
    label: 'Description',
    placeholder: 'Description',
    id: 'description',
    name: description.value,
    error: errorDescription.value,
  },
])

const selects = computed(() => [
  {
    label: 'Parent',
    id: 'parent_id',
    name: 'parent_id',
    error: '',
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
    options: [
      {
        value: 1,
        selected: true,
        title: 'Yes',
      },
      {
        value: 0 ,
        selected: false,
        title: 'No',
      },
    ],
  },
])

const addCategory = async (event: Event) => {
  const formData = new FormData(event.target as HTMLFormElement)
  const formObject = Object.fromEntries(formData.entries())
  categoryName.value = formObject.name as string
  bannerUrl.value = formObject.banner as string
  homeOrder.value = formObject.home_order as string
  description.value = formObject.description as string
  parentId.value = formObject.parent_id as string
  isFeatured.value = formObject.is_featured as string

  const isValid = validateForm()
  if (!isValid) return
  try {
    await addCategoryAPI(formData)
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
      <form class="contact-form" @submit.prevent="addCategory">
        <div class="form-row">
          <BaseInput :inputs="inputs" />
          <BaseSelectBox :selects="selects" />
        </div>
        <div class="text-area">
          <BaseTextArea :inputs="textAreas" />
        </div>
        <BaseButton title="Add Now" />
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

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: center;
}

.text-area {
  margin-top: 45px;
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
