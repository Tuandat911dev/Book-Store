export default [
  {
    path: '/dashboard',
    name: 'home-dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true },
  }
]
