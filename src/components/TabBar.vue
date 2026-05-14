<template>
  <nav class="tabbar">
    <div class="tabbar-item" :class="{ active: route === '/' }" @click="go('/')">
      <span class="tabbar-icon">🏠</span>
      <span>首页</span>
    </div>
    <div class="tabbar-item" :class="{ active: route.startsWith('/goods') }" @click="go('/goods')">
      <span class="tabbar-icon">🛍️</span>
      <span>商品</span>
    </div>
    <div class="tabbar-item" :class="{ active: route === '/contact' }" @click="go('/contact')">
      <span class="tabbar-icon">📞</span>
      <span>联系</span>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = computed(() => useRoute().path)
const go = (path) => router.push(path)
</script>
