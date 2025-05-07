import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Notification } from '@/types'

export const useNotificationStore = defineStore('notification', () => {
  const notification = ref<Notification | null>(null)
  const setNotification = (newNotification: Notification) => {
    notification.value = newNotification

    setTimeout(() => {
      notification.value = null
    }, 5000)
  }

  return { notification, setNotification }
})
