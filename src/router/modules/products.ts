export default [
  {
    path: '/product-stock',
    name: 'home-product-stock',
    component: () => import('@/views/books/Book.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/add-product',
    name: 'product-add',
    component: () => import('@/views/books/AddBook.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/update-product/:id',
    name: 'product-update',
    component: () => import('@/views/books/UpdateBook.vue'),
    meta: { requiresAuth: true },
  }
]
