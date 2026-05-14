<template>
  <div class="page">
    <div class="navbar">
      <span class="navbar-back" @click="router.back()">‹</span>
      <span class="navbar-title">商品列表</span>
      <span></span>
    </div>

    <!-- 搜索框 -->
    <div class="search-bar">
      <span class="search-icon">🔍</span>
      <input v-model="keyword" class="search-input" placeholder="搜索商品..." />
      <span v-if="keyword" class="search-clear" @click="keyword = ''">✕</span>
    </div>

    <!-- 分类 Tab -->
    <div class="cat-tabs">
      <div
        v-for="cat in categories"
        :key="cat.type"
        class="cat-tab"
        :class="{ active: activeType === cat.type }"
        @click="activeType = cat.type"
      >
        {{ cat.name }}
      </div>
    </div>

    <!-- 排序栏 -->
    <div class="sort-bar">
      <span
        v-for="s in sorts"
        :key="s.key"
        class="sort-item"
        :class="{ active: sortKey === s.key }"
        @click="sortKey = s.key"
      >
        {{ s.label }}
        <span v-if="s.key !== 'default'" class="sort-arrow">{{ sortKey === s.key ? '↑' : '↕' }}</span>
      </span>
    </div>

    <!-- 商品列表 -->
    <div class="goods-grid">
      <div
        v-for="g in filteredGoods"
        :key="g.id"
        class="goods-card card"
        @click="goDetail(g.id)"
      >
        <div class="goods-img">
          <img :src="g.img" :alt="g.name" class="goods-img-photo" />
          <span v-if="g.tag" class="goods-tag" :class="g.tagClass">{{ g.tag }}</span>
        </div>
        <div class="goods-info">
          <div class="goods-name">{{ g.name }}</div>
          <div class="goods-spec">{{ g.spec }}</div>
          <div class="goods-price-row">
            <span class="price">¥{{ g.price }}</span>
            <span v-if="g.origin" class="price-origin">¥{{ g.origin }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredGoods.length === 0" class="empty">
      <div class="empty-icon">🔍</div>
      <div class="empty-text">没有找到相关商品</div>
    </div>

    <TabBar />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TabBar from '../components/TabBar.vue'

const router = useRouter()
const route = useRoute()

const keyword = ref('')
const activeType = ref(route.query.type || '')
const sortKey = ref('default')

const categories = [
  { name: '全部', type: '' },
  { name: '白酒', type: 'baijiu' },
  { name: '红酒', type: 'wine' },
  { name: '香烟', type: 'tobacco' },
  { name: '礼盒', type: 'gift' },
  { name: '啤酒', type: 'beer' },
  { name: '洋酒', type: 'foreign' },
  { name: '茶叶', type: 'tea' },
]

const sorts = [
  { key: 'default', label: '综合' },
  { key: 'price', label: '价格' },
  { key: 'sales', label: '销量' },
]

const allGoods = [
  { id: 1,  name: '茅台金王子',       spec: '500ml/盒 53°酱香型', price: 229, origin: 0, img: '/goods/maotai-jinwangzi.jpg',       tag: '',    tagClass: '',          type: 'baijiu', sales: 280 },
  { id: 2,  name: '珍酒·珍十五',     spec: '500ml/瓶 53°酱香型', price: 399, origin: 0, img: '/goods/zhenjiu-zhen15.jpg',          tag: '',    tagClass: '',          type: 'baijiu', sales: 160 },
  { id: 3,  name: '红花郎（十五年）', spec: '500ml/瓶 53°酱香型', price: 459, origin: 0, img: '/goods/langjiu-honghuanlang15.jpg',  tag: '',    tagClass: '',          type: 'baijiu', sales: 210 },
  { id: 4,  name: '剑南春',           spec: '500ml/瓶 52°浓香型', price: 438, origin: 0, img: '/goods/jiannanchun-52.jpg',           tag: '',    tagClass: '',          type: 'baijiu', sales: 130 },
  { id: 5,  name: '习酒·醇钻',       spec: '500ml/盒 53°酱香型', price: 178, origin: 0, img: '/goods/xijiu-chunzuan.jpg',           tag: '',    tagClass: '',          type: 'baijiu', sales: 320 },
  { id: 6,  name: '享悠然',           spec: '500ml 53°酱香型',    price: 168, origin: 0, img: '/goods/xijiu-xiangyouran-500.jpg',    tag: '',    tagClass: '',          type: 'baijiu', sales: 380 },
  { id: 7,  name: '享悠然·悦享',     spec: '1000ml 53°酱香型',   price: 338, origin: 0, img: '/goods/xijiu-xiangyouran-1000.jpg',   tag: '大瓶', tagClass: 'tag-import', type: 'baijiu', sales: 150 },
  { id: 8,  name: '享悠然（小瓶）',   spec: '100ml 53°酱香型',    price: 25,  origin: 0, img: '/goods/xijiu-xiangyouran-100.jpg',    tag: '尝鲜', tagClass: 'tag-import', type: 'baijiu', sales: 520 },
  { id: 9,  name: '太享福',           spec: '500ml/瓶 53°酱香型', price: 108, origin: 0, img: '/goods/xijiu-taixiangfu.jpg',         tag: '',    tagClass: '',          type: 'baijiu', sales: 410 },
  { id: 10, name: '老习酒',           spec: '500ml/盒 53°酱香型', price: 168, origin: 0, img: '/goods/xijiu-laoxijiu.jpg',           tag: '',    tagClass: '',          type: 'baijiu', sales: 290 },
]

const filteredGoods = computed(() => {
  let list = allGoods
  if (activeType.value) list = list.filter(g => g.type === activeType.value)
  if (keyword.value) list = list.filter(g => g.name.includes(keyword.value) || g.spec.includes(keyword.value))
  if (sortKey.value === 'price') list = [...list].sort((a, b) => a.price - b.price)
  if (sortKey.value === 'sales') list = [...list].sort((a, b) => b.sales - a.sales)
  return list
})

const goDetail = (id) => router.push(`/goods/${id}`)
</script>

<style scoped>
.search-bar {
  display: flex; align-items: center; gap: 8px;
  background: #fff; margin: 10px 12px; padding: 8px 12px;
  border-radius: 20px; border: 1px solid var(--border);
}
.search-icon { font-size: 14px; color: var(--text-muted); }
.search-input { flex: 1; border: none; outline: none; font-size: 14px; background: transparent; }
.search-clear { font-size: 14px; color: var(--text-muted); cursor: pointer; }

.cat-tabs {
  display: flex; overflow-x: auto; padding: 0 12px 8px;
  gap: 8px; scrollbar-width: none;
}
.cat-tabs::-webkit-scrollbar { display: none; }
.cat-tab {
  flex-shrink: 0; padding: 5px 14px; border-radius: 20px;
  font-size: 13px; color: var(--text-secondary); background: #f5f5f5;
  cursor: pointer; white-space: nowrap;
}
.cat-tab.active { background: var(--primary); color: #fff; }

.sort-bar {
  display: flex; padding: 6px 12px; gap: 20px;
  border-bottom: 1px solid var(--border); background: #fff;
}
.sort-item { font-size: 13px; color: var(--text-secondary); cursor: pointer; }
.sort-item.active { color: var(--primary); font-weight: 600; }
.sort-arrow { font-size: 11px; }

.goods-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 12px; padding: 12px;
}
.goods-card { overflow: hidden; cursor: pointer; }
.goods-img { position: relative; height: 200px; overflow: hidden; background: #f9f6f0; }
.goods-img-photo { width: 100%; height: 100%; object-fit: contain; display: block; }
.goods-tag { position: absolute; top: 8px; left: 8px; font-size: 11px; padding: 2px 8px; border-radius: 20px; }
.goods-info { padding: 10px 12px 12px; }
.goods-name { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.goods-spec { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
.goods-price-row { display: flex; align-items: baseline; gap: 6px; }

.empty { text-align: center; padding: 60px 0; }
.empty-icon { font-size: 48px; margin-bottom: 12px; }
.empty-text { font-size: 14px; color: var(--text-muted); }
</style>
