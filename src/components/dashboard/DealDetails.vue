<script setup lang="ts">
import BaseChart from '@/components/common/BaseChart.vue'
import { provide, ref } from 'vue'
import BaseTable from '@/components/common/BaseTable.vue'
import Watch from '@/assets/images/svg/watch.svg'
import type { TableHeader, TableRow } from '@/types'

const headers = ref<TableHeader[]>([
  { key: 'product', label: 'Product Name' },
  { key: 'location', label: 'Location' },
  { key: 'date', label: 'Date - Time' },
  { key: 'price', label: 'Price' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
])

const rows = ref<TableRow[]>([
  {
    img: Watch,
    product: 'Smart Watch',
    location: '6096 Marjolaine Landing',
    date: '12.09.2019 - 12.53 PM',
    price: '$423',
    amount: '$34,295',
    status: 'Delivered',
  },
  {
    img: Watch,
    product: 'Smart Watch',
    location: '1020 Sunshine Blvd',
    date: '14.10.2019 - 10.00 AM',
    price: '$500',
    amount: '$20,000',
    status: 'Pending',
  },
  {
    img: Watch,
    product: 'Smart Watch',
    location: '1020 Sunshine Blvd',
    date: '14.10.2019 - 10.00 AM',
    price: '$500',
    amount: '$20,000',
    status: 'Pending',
  },
  {
    img: Watch,
    product: 'Smart Watch',
    location: '1020 Sunshine Blvd',
    date: '14.10.2019 - 10.00 AM',
    price: '$500',
    amount: '$20,000',
    status: 'Pending',
  },
  {
    img: Watch,
    product: 'Smart Watch',
    location: '1020 Sunshine Blvd',
    date: '14.10.2019 - 10.00 AM',
    price: '$500',
    amount: '$20,000',
    status: 'Pending',
  },
  {
    img: Watch,
    product: 'Smart Watch',
    location: '1020 Sunshine Blvd',
    date: '14.10.2019 - 10.00 AM',
    price: '$500',
    amount: '$20,000',
    status: 'Pending',
  },
  {
    img: Watch,
    product: 'Smart Watch',
    location: '1020 Sunshine Blvd',
    date: '14.10.2019 - 10.00 AM',
    price: '$500',
    amount: '$20,000',
    status: 'Pending',
  },
])

</script>

<template>
  <BaseChart title="Deals Details">
    <template #content>
      <BaseTable :headers="headers" :rows="rows" />
    </template>
  </BaseChart>
</template>

<style scoped>
::v-deep(img) {
  width: 36px;
  height: 36px;
}

::v-deep(.wrap-table) {
  border: none;
}

::v-deep(thead) {
  background: #f1f4f9;
}

::v-deep(thead tr th:first-child) {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

::v-deep(thead tr th:last-child) {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

::v-deep(tbody tr:first-child td) {
  border-top: none;
}
</style>
