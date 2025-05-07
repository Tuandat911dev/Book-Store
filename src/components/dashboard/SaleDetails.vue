<script setup lang="ts">
import BaseChart from '@/components/common/BaseChart.vue'
import { provide, ref } from 'vue'

const months = ref<{ title: string; value: string }[]>([
  { title: 'October', value: "10" },
  { title: 'November', value: "11" },
  { title: 'December', value: "12" }
]);

provide("months", months);
</script>

<template>
  <BaseChart title="Sale Details" />
</template>

<style scoped></style>
