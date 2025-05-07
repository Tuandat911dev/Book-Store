<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true,
      default: ''
    },
    subtitle: {
      type: String,
      required: true,
      default: ''
    }
  });
</script>

<template>
  <div class="header">
    <h1 class="login-title">{{ title }}</h1>
    <p class="login-subtitle">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.login-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
}

.login-subtitle {
  font-size: 18px;
  font-weight: 600;
  color: #202224;
  text-align: center;
  margin-bottom: 24px;
}
</style>
