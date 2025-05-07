export default [
  {
    path: '/authors',
    name: 'home-authors',
    component: () => import('@/views/authors/Authors.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/add-author',
    name: 'author add',
    component: () => import('@/views/authors/AddAuthor.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/update-author/:id',
    name: 'author update',
    component: () => import('@/views/authors/UpdateAuthor.vue'),
    meta: { requiresAuth: true },
  },
]
