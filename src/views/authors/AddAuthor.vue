<script setup lang="ts">
import BaseTitle from '@/components/common/BaseTitle.vue'
import { computed, ref } from 'vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import { useRouter } from 'vue-router'
import type { Input as FieldInput } from '@/types'
import { useNotificationStore } from '@/stores/NotificationStore.ts'
import { addAuthorAPI } from '@/apis/AuthorAPI.ts'

const title = 'Add New authors'
const router = useRouter()
const authorName = ref('')
const errorAuthorName = ref('')
const notificationStore = useNotificationStore()

const validateForm = (name: string) => {
  let isValid = true
  errorAuthorName.value = ''

  if (name.trim().length === 0) {
    errorAuthorName.value = 'Author name is required'
    isValid = false
  }

  return isValid
}

const inputs = computed<FieldInput[]>(() => [
  {
    label: 'authors Name',
    placeholder: 'authors Name',
    inputType: 'text',
    id: 'name',
    name: 'name',
    value: authorName.value,
    error: errorAuthorName.value,
  },
])

const addAuthor = async (event: any) => {
  const formData = new FormData(event.target)
  const formObject = Object.fromEntries(formData.entries())
  authorName.value = formObject.name as string
  const isValid = validateForm(formObject.name as string)
  if (!isValid) return
  try {
    await addAuthorAPI(formData)
    notificationStore.setNotification({
      title: 'Success',
      message: 'Add Author Successfully',
      type: 'success',
    })

    await router.push('/authors')
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Add Author Failed'
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
      <form class="contact-form" @submit.prevent="addAuthor">
        <div class="form-row">
          <BaseInput :inputs="inputs" />
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

::v-deep(.btn button) {
  font-size: 17px;
  font-weight: 700;
  padding: 16px 32px;
  border-radius: 12px;
  width: 274px;
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
</style>
