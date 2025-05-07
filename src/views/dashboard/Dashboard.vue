<script setup lang="ts">
import { ref } from 'vue'
import BaseTitle from '@/components/common/BaseTitle.vue'
import ListStaCard from '@/components/dashboard/ListStaCard.vue'
import SaleDetails from '@/components/dashboard/SaleDetails.vue'
import DealDetails from '@/components/dashboard/DealDetails.vue'

const title = 'Dashboard'
</script>

<template>
  <BaseTitle :title="title" />

  <div class="detail">
    <ListStaCard />

    <SaleDetails />

    <DealDetails />
  </div>
</template>

<style scoped>
.detail {
  overflow: auto;
  max-height: calc(100vh - 200px);
  scrollbar-width: none;
}
</style>
