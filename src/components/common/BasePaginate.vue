<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    default: 9
  },
  currentPage: {
    type: Number,
    required: true
  },
})

const emit = defineEmits(['update:currentPage'])

const handlePageChange = (page: number) => {
  emit('update:currentPage', page)
}
</script>

<template>
  <div class="pagination">
    <p>
      Showing
      <span
        >{{ (currentPage - 1) * pageSize + 1 }} -
        {{ Math.min(currentPage * pageSize, total) }}</span
      >
      of
      <span>{{ total }}</span>
    </p>
    <div class="paginate">
      <el-pagination
        size="small"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="handlePageChange"
        class="mt-4"
      />
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 5px;
}

.pagination > p {
  color: #75777a;
  font-size: 14px;
  font-weight: 520;
}

.paginate > a {
  text-decoration: none;
  color: #646464;
  font-size: 18px;
  padding: 2px 10px;
  border: 1px solid #d5d5d5;
}

::v-deep(.btn-prev.is-first) {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: 0.4px solid #d5d5d5;
  background-color: #fafbfd !important;
  color: #202224 !important;
  width: 43px;
}

::v-deep(.btn-next.is-last) {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: 0.4px solid #d5d5d5;
  background-color: #fafbfd !important;
  color: #202224 !important;
  width: 43px;
}

::v-deep(.number) {
  border: 0.4px solid #d5d5d5;
  background-color: #fafbfd !important;
}

::v-deep(.number.is-active) {
  background-color: #4880ff !important;
}
</style>
