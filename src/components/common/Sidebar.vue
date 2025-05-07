<script setup>
import MenuItem from '@/components/common/MenuItem.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const dashboard = computed(() => [
  {
    icon: 'las la-tachometer-alt',
    label: 'Dashboard',
    link: '/dashboard',
    divActive: route.path === '/dashboard',
    menuActive: route.path === '/dashboard',
  },
  {
    icon: 'las la-th-large',
    label: 'Products',
    link: '#',
    divActive: false,
    menuActive: false,
  },
  {
    icon: 'lar la-heart',
    label: 'Categories',
    link: '/categories',
    divActive:
      route.path === '/categories' ||
      route.path.startsWith('/add-category') ||
      route.path.startsWith('/update-category'),
    menuActive:
      route.path === '/categories' ||
      route.path.startsWith('/add-category') ||
      route.path.startsWith('/update-category'),
  },
  {
    icon: 'las la-inbox',
    label: 'Authors',
    link: '/authors',
    divActive:
      route.path === '/authors' ||
      route.path === '/add-author' ||
      route.path.startsWith('/update-author'),
    menuActive:
      route.path === '/authors' ||
      route.path === '/add-author' ||
      route.path.startsWith('/update-author'),
  },
  {
    icon: 'lar la-list-alt',
    label: 'Order Lists',
    link: '#',
    divActive: false,
    menuActive: false,
  },
  {
    icon: 'las la-database',
    label: 'Product Stock',
    link: '/product-stock',
    divActive:
      route.path === '/product-stock' ||
      route.path.startsWith('/add-product') ||
      route.path.startsWith('/update-product'),
    menuActive:
      route.path === '/product-stock' ||
      route.path.startsWith('/add-product') ||
      route.path.startsWith('/update-product')
  },
])

const pages = computed(() => [
  {
    icon: 'las la-gift',
    label: 'Pricing',
    link: '#',
    divActive: false,
    menuActive: false,
  },
  {
    icon: 'lar la-calendar',
    label: 'Calendar',
    link: '#',
    divActive: false,
    menuActive: false,
  },
  {
    icon: 'las la-paste',
    label: 'To-Do',
    link: '#',
    divActive: false,
    menuActive: false,
  },
  {
    icon: 'las la-user-friends',
    label: 'Contact',
    link: '#',
    divActive: false,
    menuActive: false,
  },
  {
    icon: 'las la-money-bill-wave',
    label: 'Invoice',
    link: '#',
    divActive: false,
    menuActive: false,
  },
  {
    icon: 'las la-chart-bar',
    label: 'UI Elements',
    link: '#',
    divActive: false,
    menuActive: false,
  },
  {
    icon: 'las la-user',
    label: 'Team',
    link: '#',
    divActive: false,
    menuActive: false,
  },
  {
    icon: 'las la-table',
    label: 'Table',
    link: '#',
    divActive: false,
    menuActive: false,
  },
])

const setting = computed(() => [
  {
    icon: 'las la-cog',
    label: 'Settings',
    link: '#',
    divActive: false,
    menuActive: false,
  },
  {
    icon: 'las la-sign-in-alt',
    label: 'Logout',
    link: 'logout',
    divActive: false,
    menuActive: false,
  },
])
</script>

<template>
  <div class="sidebar" :class="{ 'sidebar--close': isOpen }">
    <div class="logo">
      <h1 class="logo-text">
        <span class="dash">Dash</span>
        <span class="stack" >Stack</span>
      </h1>
    </div>

    <div class="menu-list">
      <div class="menu-section">
        <MenuItem
          v-for="(item, index) in dashboard"
          :key="index"
          :icon="item.icon"
          :label="item.label"
          :link="item.link"
          :divActive="item.divActive"
          :menuActive="item.menuActive"
        />
      </div>

      <div class="divider"></div>

      <div class="menu-section">
        <h2 class="menu-label">PAGES</h2>

        <MenuItem
          v-for="(item, index) in pages"
          :key="index"
          :icon="item.icon"
          :label="item.label"
          :link="item.link"
          :divActive="item.divActive"
          :menuActive="item.menuActive"
        />
      </div>

      <div class="divider"></div>

      <div class="menu-section">
        <h2 class="menu-label">SETTINGS</h2>
        <MenuItem
          v-for="(item, index) in setting"
          :key="index"
          :icon="item.icon"
          :label="item.label"
          :link="item.link"
          :divActive="item.divActive"
          :menuActive="item.menuActive"
        />
      </div>
    </div>
  </div>
</template>

<style>
.sidebar {
  width: 240px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  transition: width 0.5s ease-in-out;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow: hidden;
}

.sidebar .logo {
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  padding: 22px;
}

.sidebar .menu-list {
  overflow: auto;
  max-height: calc(100vh - 80px);
  padding-bottom: 16px;
  scrollbar-width: none;
}

.sidebar--close {
  width: 65px;
}

.sidebar .logo > h1,
.sidebar .menu-section span,
.sidebar .menu-section h2 {
  transition: opacity 0.5s ease-in-out;
}

.sidebar--close .logo > h1,
.sidebar--close .menu-section h2,
.sidebar--close .menu-item div span {
  opacity: 0;
}

.sidebar--close .menu-section .menu-item > div {
  width: 50px;
  padding-left: 10px;
  padding-right: 10px;
  transition:
    width 0.5s ease-in-out,
    padding 0.5s ease-in-out;
}

.sidebar--close i {
  margin-left: 4px;
}

.sidebar--close .menu-section span {
  width: 4px;
}

.logo {
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-text {
  font-size: 20px;
  font-weight: 800;
  margin: 0;
  display: flex;
  gap: 1px;
}

.menu-label {
  color: #202224;
  opacity: 0.6;
  font-size: 12px;
  font-weight: 700;
  padding: 0 40px;
  margin-bottom: 16px;
  margin-top: 0;
}

.divider {
  height: 1px;
  margin: 16px 0;
  width: 100%;
  border: 1px solid #e0e0e0;
}

.dash {
  color: #4880ff
}

.stack {
  color: #000;
}
</style>
