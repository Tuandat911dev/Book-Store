<script setup lang="ts">

defineProps({
  title: {
    type: String,
    required: true,
    default: ''
  },
  number: {
    type: Number,
    required: true,
    default: 0
  },
  icon: {
    type: String,
    required: true,
    default: ''
  },
  percent: {
    type: Number,
    required: true,
    default: 0
  },
  img: {
    type: String,
    required: true,
    default: ''
  },
  des: {
    type: String,
    required: true,
    default: ''
  },
  type: {
    type: String,
    required: true,
    default: ''
  },
})
</script>

<template>
  <div class="stat-card">
    <div class="stat-up">
      <div class="stat-value">
        <p>{{ title }}</p>
        <span id="total-books">{{ number }}</span>
      </div>

      <div class="stat-icon">
        <img v-bind:src="icon" alt="" />
      </div>
    </div>

    <div class="stat-change">
      <img v-bind:src="img" alt="" />
      <p><span v-bind:class="type">{{ percent }}%</span> {{ des }}</p>
    </div>
  </div>
</template>

<style scoped>
.stat-card {
  border-radius: 14px;
  background-color: #fff;
  width: 262px;
  height: 161px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
}

.stat-card p {
  color: #202224;
  font-size: 16px;
  font-weight: 600;
  padding: 0;
}

.stat-card span {
  color: #202224;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 1px;
}

.stat-up {
  display: flex;
  justify-content: space-between;
}

.stat-change {
  display: flex;
  align-items: center;
  white-space: nowrap;
  gap: 5px;
}

.stat-value {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 15px;
}

.positive {
  color: #00b69b !important;
  font-size: 16px !important;
  font-weight: 600 !important;
}

.negative {
  color: #f93c65 !important;
  font-size: 16px !important;
  font-weight: 600 !important;
}
</style>
