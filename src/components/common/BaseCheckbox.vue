<script setup lang="ts">
  defineProps({
    checked: {
      type: Boolean,
      required: true,
      default: false
    },
    content: {
      type: String,
      required: true,
      default: false
    }
  });
</script>

<template>
  <div class="remember-container">
    <label class="remember-label">
      <input type="checkbox" :checked="checked"  class="remember-checkbox" />
      <span class="checkbox-text">{{ content }}</span>
    </label>
  </div>
</template>

<style scoped>
.remember-container {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.remember-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.remember-checkbox {
  margin-right: 8px;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  accent-color: #4880ff;
}

.checkbox-text {
  font-size: 18px;
  font-weight: 600;
  color: #202224;
  opacity: 0.6;
}
</style>
