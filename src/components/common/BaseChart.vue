<script setup lang="ts">
import BaseSelectBox from '@/components/common/BaseSelectBox.vue'
import { computed } from 'vue'

defineProps({
  title: {
    type: String,
    required: true
  }
});

const months = computed(() => [
  {
    id: 'months',
    name: 'months',
    error: '',
    value: '10',
    options: [
      {
        value: '10',
        selected: true,
        title: 'October'
      },
      {
        value: '11',
        selected: false,
        title: 'November',
      },
      {
        value: '12',
        selected: false,
        title: 'December'
      }
    ]
  }
])

</script>

<template>
  <div class="sale-detail">
    <div class="head">
      <p>{{ title }}</p>
      <BaseSelectBox :selects="months" />
    </div>
    <div class="content-detail">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.sale-detail {
  background-color: white;
  border-radius: 14px;
  width: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: flex-start;
  margin-top: 35px;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.head > p {
  color: #202224;
  font-size: 24px;
  font-weight: 700;
  padding: 0 !important;
}

.content-detail {
  width: 100%;
  padding-left: 0;
  padding-right: 0;
}
</style>
