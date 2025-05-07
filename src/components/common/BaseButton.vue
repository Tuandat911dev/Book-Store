<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
    default: 'Sign In'
  }
})
</script>

<template>
  <div class="btn">
    <button type="submit" title="">{{ title }}</button>
  </div>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn > button {
  width: 80%;
  padding: 12px;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  background-color: #4880ff;
  cursor: pointer;
}
</style>
