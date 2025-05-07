import { useAuthStore } from '@/stores/AuthStore.ts'
import api from '@/services/asios.ts'
import type { Admin } from '@/types'

export default {
  async login(email: string, password: string) {
    const response = await api.post<{ data: { token: string; admin: Admin } }>('/login', {
      email,
      password,
    })

    const { token, admin } = response.data
    const authStore = useAuthStore()
    authStore.setToken(token)
    authStore.setUser(admin)
  },
}
