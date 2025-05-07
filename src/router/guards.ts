import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/AuthStore.ts'

export function authGuard(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'auth-login' })
  } else if (to.name === 'auth-login' && authStore.isAuthenticated) {
    next({ name: 'home-dashboard' })
  } else {
    next()
  }
}
