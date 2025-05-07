<script setup lang="ts">
import StaCard from '@/components/dashboard/StaCard.vue'
import { computed } from 'vue'
import Icon1 from '@/assets/images/svg/icon-1.svg'
import Icon2 from '@/assets/images/svg/icon-2.svg'
import Icon3 from '@/assets/images/svg/icon-3.svg'
import Icon4 from '@/assets/images/svg/icon-4.svg'
import TrenUp from '@/assets/images/svg/tren-up.svg'
import TrenDown from '@/assets/images/svg/tren-down.svg'

const statistical = computed(() => [
  {
    title: 'Total User',
    number: 40689,
    icon: Icon1,
    percent: 8.5,
    img: TrenUp,
    des: 'Up from yesterday',
    type: 'positive',
  },
  {
    title: 'Total Order',
    number: 10293,
    icon: Icon2,
    percent: 1.3,
    img: TrenUp,
    des: 'Up from past week',
    type: 'positive',
  },
  {
    title: 'Total Sales',
    number: 89000,
    icon: Icon3,
    percent: 4.3,
    img: TrenDown,
    des: 'Down from yesterday',
    type: 'negative',
  },
  {
    title: 'Total Pending',
    number: 2040,
    icon: Icon4,
    percent: 1.8,
    img: TrenUp,
    des: 'Up from yesterday',
    type: 'positive',
  },
])
</script>

<template>
  <div class="statistical">
    <StaCard
      v-for="(item, index) in statistical"
      :key="index"
      :title="item.title"
      :number="item.number"
      :icon="item.icon"
      :percent="item.percent"
      :img="item.img"
      :des="item.des"
      :type="item.type"
    />
  </div>
</template>

<style scoped>
.statistical {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  width: 100%;
}
</style>
