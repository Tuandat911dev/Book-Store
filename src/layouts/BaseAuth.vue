<script setup lang="ts">
import '../assets/base.css'
import BaseNotification from '@/components/common/BaseNotification.vue'
import { useNotificationStore } from '@/stores/NotificationStore.ts'

const notificationStore = useNotificationStore()
</script>

<template>
  <div class="login-container">
    <BaseNotification
      v-if="notificationStore.notification && notificationStore.notification.type === 'error'"
      :title="notificationStore.notification.title"
      :message="notificationStore.notification.message"
      :type="notificationStore.notification.type"
    />
    <RouterView />
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 197px 430px;
  background-color: #4880ff;
  background-image: url('@/assets/images/svg/login-background.svg');
  height: 100vh;
}
</style>
