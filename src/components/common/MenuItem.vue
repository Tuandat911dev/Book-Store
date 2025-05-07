<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import {useAuthStore} from "@/stores/AuthStore.ts";

const authStore = useAuthStore()

defineProps({
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  divActive: {
    type: String,
    required: true
  },
  menuActive: {
    type: String,
    required: true
  }
})

const router = useRouter()

const handleLogout = async () => {
  authStore.logout()
  await router.push('/login')
}
</script>

<template>
  <RouterLink
    v-if="link !== 'logout'"
    :to="link"
    class="menu-item"
  >
    <span class="active-indicator" :class="{'menu-active': menuActive}"></span>
    <div :class="{'div-active': divActive}">
      <i :class="icon"></i>
      <span>{{ label }}</span>
    </div>
  </RouterLink>

  <a
    v-else
    href="#"
    class="menu-item"
    @click.prevent="handleLogout"
  >
    <span class="active-indicator" :class="{'menu-active': menuActive}"></span>
    <div :class="{'div-active': divActive}">
      <i :class="icon"></i>
      <span>{{ label }}</span>
    </div>
  </a>
</template>

<style>
.menu-item {
  display: flex;
  align-items: center;
  color: #202224;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  justify-content: center;
  position: relative;
  outline: none;
}

.menu-item i {
  font-size: 22px;
  margin-right: 16px;
}

.div-active {
  background-color: #4880ff;
  color: #fff;
}

.menu-active {
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 50px;
  background-color: #4880ff;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.menu-item > div {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-radius: 6px;
  width: 192px;
  height: 50px;
  white-space: nowrap;
}
</style>
