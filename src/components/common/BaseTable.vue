<script setup lang="ts">
import type { TableHeader, TableRow } from '@/types'

defineProps({
  headers: {
    type: Array<TableHeader>,
    required: true,
  },
  rows: {
    type: Array<TableRow>,
    required: true,
  },
})

const emit = defineEmits(['delete'])

const emitDelete = (deleteLink: string) => {
  const id = deleteLink.split('/').pop()
  emit('delete', Number(id))
}
</script>

<template>
  <div class="wrap-table">
    <table>
      <thead>
        <tr class="table-head">
          <th v-for="header in headers" :key="header.key">{{ header.label }}</th>
        </tr>
      </thead>

      <tbody>
        <tr class="table-body" v-for="(row, index) in rows" :key="index">
          <td v-for="header in headers" :key="header.key">
            <template v-if="header.key === 'img'">
              <img :src="row[header.key]" alt="" />
            </template>
            <template v-else-if="header.key === 'action'">
              <div class="action">
                <RouterLink :to="row['editLink']" class="edit-btn">
                  <i class="lar la-edit"></i>
                </RouterLink>
                <a href="#" @click.prevent="emitDelete(row['deleteLink'])" class="delete-btn">
                  <i class="lar la-trash-alt"></i>
                </a>
              </div>
            </template>
            <template v-else-if="header.key === 'product'">
              <div class="product-image">
                <img :src="row.img" alt="" />
                <p>{{ row[header.key] }}</p>
              </div>
            </template>
            <template v-else-if="header.key === 'status'">
              <span :class="row[header.key].toLowerCase()">{{ row[header.key] }}</span>
            </template>
            <template v-else-if="header.key === 'productColor'">
              <div class="product-color">
                <span v-for="color in row.productColor" :key="color" :class="color"></span>
              </div>
            </template>
            <template v-else>
              {{ row[header.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.wrap-table {
  max-height: 811px;
  overflow-y: auto;
  border-radius: 8px;
  border: 0.4px solid #d5d5d5;
  scrollbar-width: none;
}

table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  z-index: 1;
}

.table-head th {
  text-align: left;
  color: #202224;
  font-size: 14px;
  font-style: normal;
  line-height: normal;
  padding: 20px;
}

thead {
  position: sticky;
  top: 0;
  background-color: #fff;
}

thead tr th:first-child {
  border-top-left-radius: 8px;
}

thead tr th:last-child {
  border-top-right-radius: 8px;
}

.table-body td {
  padding: 20px;
  font-size: 14px;
  border-top: 0.4px solid #d5d5d5;
  color: #202224;
  font-style: normal;
  line-height: normal;
}

.product-color {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}

img {
  width: 75px;
  height: 100px;
}

.black {
  background-color: #202224;
  padding: 10px;
  border-radius: 50px;
}

.blue {
  background-color: #4d88ef;
  padding: 10px;
  border-radius: 50px;
}

.green {
  background-color: #4caf50;
  padding: 10px;
  border-radius: 50px;
}

.yellow {
  background-color: #e9c157;
  padding: 10px;
  border-radius: 50px;
}

.action {
  display: flex;
  align-items: center;
  text-align: center;
}

.action > a {
  text-decoration: none;
}

.edit-btn {
  border: 0.4px solid #d5d5d5;
  border-right: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  padding: 2px 12px;
  font-size: 20px;
  background-color: #fafbfd;
}

.edit-btn > i {
  color: #646464;
}

.delete-btn {
  border: 0.4px solid #d5d5d5;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 2px 12px;
  font-size: 20px;
  background-color: #fafbfd;
}

.delete-btn > i {
  color: red;
}

.delivered {
  background: #00b69b;
  padding: 4px 16px;
  border-radius: 13.5px;
  display: inline-block;
  color: white;
  font-size: 14px;
  font-weight: 700;
}

.pending {
  background: #fec53d;
  padding: 4px 16px;
  border-radius: 13.5px;
  display: inline-block;
  color: white;
  font-size: 14px;
  font-weight: 700;
}

.product-image {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
</style>
