<script setup lang="ts">
import type { Select } from '@/types'

defineProps({
  selects: {
    type: Array<Select>,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <div class="form-group" v-for="(select, index) in selects" :key="index">
    <label v-if="select.label !== undefined" :for="select.id" class="label">{{
      select.label
    }}</label>
    <select :name="select.name" v-model="select.value">
      <option
        v-for="(option, index) in select.options"
        :key="index"
        :value="option.value"
        :selected="option.selected"
      >
        {{ option.title }}
      </option>
    </select>
  </div>
</template>

<style scoped>
select {
  color: rgba(43, 48, 52, 0.4);
  font-size: 12px;
  font-weight: 600;
  border-radius: 4px;
  width: 104px;
  height: 28px;
  outline: none;
  border: 1px solid rgba(43, 48, 52, 0.4);
  text-align: center;
}

.label {
  color: #202224;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
  opacity: 0.8;
}
</style>
