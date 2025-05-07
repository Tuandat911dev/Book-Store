<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  },
  action: {
    type: String,
    required: true,
    default: '',
  },
  link: {
    type: String,
    required: true,
    default: '',
  },
})
</script>

<template>
  <div class="create-account-container">
    <span class="no-account">{{ title }}</span>
    <a :href="link" class="create-account-link">{{ action }}</a>
  </div>
</template>

<style scoped>
.create-account-container {
  text-align: center;
}

.no-account {
  color: #202224;
  font-size: 18px;
  font-weight: 600;
}

.create-account-link {
  margin-left: 4px;
  color: #5a8cff;
  text-align: right;
  font-size: 18px;
  font-weight: 600;
}
</style>
