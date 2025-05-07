export default [
  {
    path: '/categories',
    name: 'home-categories',
    component: () => import('@/views/categories/Categories.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/add-category',
    name: 'category-add',
    component: () => import('@/views/categories/AddCategory.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/update-category/:id',
    name: 'category-update',
    component: () => import('@/views/categories/UpdateCategory.vue'),
    meta: { requiresAuth: true },
  }
]
