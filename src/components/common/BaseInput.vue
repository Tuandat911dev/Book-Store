<script setup lang="ts">
import type { Input } from '@/types'

defineProps({
  inputs: {
    type: Array<Input>,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <div class="form-group" v-for="(input, index) in inputs" :key="index">
    <template v-if="input.forgetPassword !== undefined">
      <div class="password-container">
        <label for="password" class="label">Password</label>
        <a href="#" class="forgot-password">Forget Password?</a>
      </div>
    </template>
    <template v-else>
      <label :for="input.id" class="label">{{ input.label }}</label>
    </template>

    <input
      :id="input.id"
      :type="input.inputType"
      :placeholder="input.placeholder"
      :value="input.value"
      :class="{ error: input.error !== '' }"
      :name="input.id"
      class="input-field"
    />
    <p class="error-detail">{{ input.error }}</p>
  </div>
</template>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.label {
  color: #202224;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
  opacity: 0.8;
}

.input-field,
select {
  width: 100%;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
  background-color: #f9fafb;
  margin-bottom: 15px;
}

.error {
  border: 1px solid #f93c65;
}

input[type='password']::placeholder {
  opacity:1;
  line-height: 44px;
}

.password-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #202224;
  font-size: 18px;
  font-weight: 600;
  opacity: 0.8;
}

.forgot-password {
  color: #202224;
  font-size: 18px;
  font-weight: 600;
  text-decoration: none;
}

.error-detail {
  font-size: 12px;
  color: #f93c65;
}

input {
  width: 516px;
  height: 56px;
}
</style>
