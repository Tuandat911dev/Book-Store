<script setup lang="ts">
import Title from '@/components/auth/Title.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCheckbox from '@/components/common/BaseCheckbox.vue'
import Link from '@/components/auth/Link.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Input as FieldInput } from '@/types'
import authAPI from '@/apis/AuthAPI.ts'
import { useNotificationStore } from '@/stores/NotificationStore.ts'

const email = ref('')
const password = ref('')
const errorEmail = ref('')
const errorPassword = ref('')
const notificationStore = useNotificationStore()
const router = useRouter()

const validateForm = (email: string, password: string) => {
  let isValid = true
  errorEmail.value = ''
  errorPassword.value = ''

  if (email.length === 0) {
    errorEmail.value = 'Email is required'
    isValid = false
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errorEmail.value = 'Invalid email format'
    isValid = false
  }

  if (password.length === 0) {
    errorPassword.value = 'Password is required'
    isValid = false
  } else if (password.length < 8) {
    errorPassword.value = 'Password must be at least 8 characters'
    isValid = false
  } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    errorPassword.value = 'Password must contain at least one uppercase and one lowercase letter'
    isValid = false
  }

  return isValid
}

const inputs = computed<FieldInput[]>(() => [
  {
    label: 'Email address',
    placeholder: 'esteban_schiller@gmail.com',
    inputType: 'email',
    id: 'email',
    name: 'email',
    value: email.value,
    error: errorEmail.value,
  },
  {
    label: 'Password',
    placeholder: '⬤  ⬤  ⬤  ⬤  ⬤  ⬤',
    forgetPassword: 'forget',
    inputType: 'password',
    id: 'password',
    value: password.value,
    error: errorPassword.value,
  },
])

const login = async (event: any) => {
  const formData = new FormData(event.target)
  const formObject = Object.fromEntries(formData.entries())
  email.value = formObject.email as string
  password.value = formObject.password as string
  const isValid = validateForm(formObject.email as string, formObject.password as string)
  if (!isValid) return
  try {
    await authAPI.login(formObject.email as string, formObject.password as string)
    notificationStore.setNotification({
      title: 'Success',
      message: 'Login Successfully',
      type: 'success',
    })
    await router.push('/dashboard')
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Login failed'
    notificationStore.setNotification({
      title: 'Error',
      message: errorMessage,
      type: 'error',
    })
  }
}
</script>

<template>
  <div class="login-card">
    <Title title="Login to Account" subtitle="Please enter your email and password to continue" />

    <form @submit.prevent="login">
      <BaseInput :inputs="inputs" />

      <BaseCheckbox content="Remember Password" :checked="false" />

      <BaseButton title="Sign In" />

      <Link title="Don’t have an account?" action="Create Account" link="/register" />
    </form>
  </div>
</template>

<style scoped>
.login-card {
  background: white;
  border-radius: 24px;
  padding: 90px 57px;
  width: 630px;
  height: 735px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

::v-deep(.btn button) {
  width: 418px;
  height: 56px;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
  background-color: #4880ff;
}
</style>
