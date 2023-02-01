<script setup lang="ts">
import { ref } from 'vue'
import siteData from 'hifa:site-data'
console.log('🚀 ~ file: Layout.vue:4 ~ siteData', siteData)

const num = ref(0)
const add = () => {
  num.value++
}
</script>

<template>
  <div>
    This is Layout Component {{ siteData.title }}
    <span>当前值: {{ num }}</span>
    <button @click="add">
      点击
    </button>
  </div>
</template>
