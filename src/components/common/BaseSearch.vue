<script setup lang="ts">
defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: false,
    default: ''
  }
})

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="search-bar-product" role="search">
    <i style="color: #d5d5d5" class="lab la-sistrix"></i>
    <input type="text" :placeholder="placeholder" class="search-input-product" @input="updateValue" />
  </div>
</template>

<style scoped>
.search-bar-product {
  display: flex;
  align-items: center;
  border-radius: 19px;
  padding: 8px 16px;
  width: 253px;
  height: 38px;
  background-color: #fff;
  border: 1px solid #d5d5d5;
}

.search-input-product {
  border: none;
  background-color: #fff;
  margin-left: 8px;
  width: 100%;
  outline: none;
  color: #202224;
  font-size: 14px;
  font-weight: 300;
}
</style>
