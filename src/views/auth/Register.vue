<script setup lang="ts">
import Title from '@/components/auth/Title.vue'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseCheckbox from '@/components/common/BaseCheckbox.vue'
import Link from '@/components/auth/Link.vue'
import { computed } from 'vue'
import type { Input as FieldInput } from '@/types'

const inputs = computed<FieldInput[]>(() => [
  {
    label: 'Email address',
    placeholder: 'esteban_schiller@gmail.com',
    inputType: 'email',
    id: 'email',
    name: 'email',
    error: '',
  },
  {
    label: 'Username',
    placeholder: 'Username',
    inputType: 'text',
    id: 'username',
    name: 'username',
    error: '',
  },
  {
    label: 'Password',
    placeholder: '••••••',
    forgetPassword: 'password',
    inputType: 'password',
    id: 'password',
    name: 'password',
    error: '',
  },
])
</script>

<template>
  <div class="register-card">
    <Title title="Create an Account" subtitle="Create a account to continue" />

    <form action="">
      <BaseInput :inputs="inputs" />

      <BaseCheckbox content="I accept terms and conditions" :checked="false" />

      <BaseButton title="Sign Up" />

      <Link title="Already have an account?" action="Login" link="/login" />
    </form>
  </div>
</template>

<style scoped>
.register-card {
  background: white;
  border-radius: 24px;
  padding: 75px 50px 40px 50px;
  width: 630px;
  height: 825px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.sign-in-button > base-button {
  padding: 12px;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  background-color: #4880ff;
  width: 418px;
  height: 56px;
}
</style>
