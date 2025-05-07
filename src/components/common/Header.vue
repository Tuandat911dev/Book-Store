<script setup lang="ts">
import { computed, ref } from 'vue'
import DropIcon from '@/assets/images/svg/drop-icon.svg'
import { useAuthStore } from '@/stores/AuthStore.ts'

defineEmits(['toggle-sidebar'])
const languages = ref([
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'es',
    label: 'Spanish',
  },
  {
    value: 'fr',
    label: 'French',
  },
  {
    value: 'ger',
    label: 'Germany',
  },
])

const authStore = useAuthStore()
const username = ref(authStore.user.name)
const shortUsername = computed(() => {
  if (username.value.length < 10) return username.value
  return username.value.substring(0, 9) + '...'
})
const role = ref('Admin')
</script>

<template>
  <div class="header">
    <div class="list-and-search">
      <img
        @click="$emit('toggle-sidebar')"
        class="list-icon"
        src="../../assets/images/list.png"
        alt=""
      />
      <div class="search-bar" role="search">
        <i style="color: #d5d5d5" class="lab la-sistrix"></i>
        <input type="text" placeholder="Search" class="search-input" aria-label="Search" />
      </div>
    </div>

    <div class="header-right">
      <div class="notification-icon">
        <img src="../../assets/images/bell.png" alt="" />
        <span class="notification-badge">2</span>
      </div>
      <div class="language-selector">
        <img src="../../assets/images/flag.png" alt="English flag" class="language-flag" />
        <select name="language" id="language">
          <option v-for="language in languages" :key="language.value" :value="language.value">
            {{ language.label }}
          </option>
        </select>
      </div>
      <div class="user-profile">
        <img src="../../assets/images/avatar.png" alt="User profile" class="profile-img" />
        <div class="profile-detail">
          <div class="info-detail">
            <p>{{ shortUsername }}</p>
            <span>{{ role }}</span>
          </div>
          <img :src="DropIcon" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  height: 70px;
  width: 100%;
  background-color: #fff;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 25px;
}

.list-and-search {
  display: flex;
  align-items: center;
  gap: 16px;
}

.list-and-search > img {
  cursor: pointer;
}

.search-bar {
  display: flex;
  align-items: center;
  border-radius: 19px;
  padding: 8px 16px;
  width: 300px;
  background-color: #f5f6fa;
  border: 1px solid #d5d5d5;
}

.search-input {
  border: none;
  background-color: #f5f6fa;
  margin-left: 8px;
  width: 100%;
  outline: none;
}

.notification-icon {
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  color: #fff;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #ff4d4f;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.language-selector > select {
  border: none;
  color: #646464;
  font-size: 14px;
  font-weight: 550;
  outline: none;
}

.profile-detail {
  display: flex;
  gap: 20px;
  align-items: center;
}

.profile-detail p {
  color: #404040;
  font-size: 14px;
  font-weight: 700;
  opacity: 0.8;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.profile-img {
  width: 45px;
  height: 45px;
}

.user-profile span {
  border: none;
  color: #565656;
  font-size: 12px;
  font-weight: 600;
  opacity: 0.8;
  outline: none;
}

.info-detail {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}
</style>
