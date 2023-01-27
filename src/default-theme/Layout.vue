<script setup lang="ts">
import { ref } from 'vue'

const num = ref(0)
const add = () => {
  num.value++
}
</script>

<template>
  <div>
    This is Layout Component
    <span>当前值: {{ num }}</span>
    <button @click="add">
      点击
    </button>
  </div>
</template>
