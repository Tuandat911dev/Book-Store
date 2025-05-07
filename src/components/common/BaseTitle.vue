<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <h1 class="title">{{ title }}</h1>
</template>

<style scoped>
.title {
  font-size: 32px;
  font-weight: 700;
  color: #202224;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
