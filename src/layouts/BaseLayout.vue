<script setup lang="ts">
import Sidebar from '@/components/common/Sidebar.vue'
import Header from '@/components/common/Header.vue'
import '../assets/main.css'
import '../assets/base.css'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import BaseNotification from '@/components/common/BaseNotification.vue'
import { useNotificationStore } from '@/stores/NotificationStore.ts'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const notificationStore = useNotificationStore()
</script>

<template>
  <div class="app">
    <Sidebar :isOpen="isSidebarOpen" />
    <div class="main">
      <Header @toggle-sidebar="toggleSidebar" />
      <div class="content">
        <RouterView />
      </div>
      <BaseNotification
        v-if="notificationStore.notification"
        :title="notificationStore.notification.title"
        :message="notificationStore.notification.message"
        :type="notificationStore.notification.type"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
