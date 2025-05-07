import dashboardRoutes from './modules/dashboard'
import productRoutes from './modules/products'
import categoryRoutes from './modules/categories'
import authorRoutes from './modules/authors'
import authRoutes from './modules/auth'

export default [
  {
    path: '/',
    component: () => import('@/layouts/BaseLayout.vue'),
    redirect: '/dashboard',
    meta: { requiresAuth: true },
    children: [
      ...dashboardRoutes,
      ...productRoutes,
      ...categoryRoutes,
      ...authorRoutes
    ]
  },
  {
    path: '/auth',
    component: () => import('@/layouts/BaseAuth.vue'),
    children: authRoutes
  }
]