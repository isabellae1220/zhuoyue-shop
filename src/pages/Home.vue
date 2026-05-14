<template>
  <div class="page">
    <!-- 顶部 Header -->
    <header class="home-header">
      <div class="header-logo">
        <img src="/mascot/xiaomi.jpg" class="mascot-avatar" alt="小米" />
        <div class="logo-text">
          <div class="logo-title">
            <span class="logo-cn">卓越</span>
            <span class="logo-sub">烟酒店</span>
          </div>
          <span class="logo-tagline">习酒·窖藏1988</span>
        </div>
      </div>
      <div class="header-slogan">正品保障·假一赔十</div>
    </header>

    <!-- Banner 轮播 -->
    <div class="banner-wrap">
      <div class="banner" :style="{ transform: `translateX(-${current * 100}%)` }">
        <div v-for="(b, i) in banners" :key="i" class="banner-slide" :style="b.img ? {} : { background: b.bg }">
          <template v-if="b.img">
            <img :src="b.img" class="banner-bg-img" alt="" />
            <div class="banner-overlay"></div>
          </template>
          <div class="banner-text">
            <span v-if="b.tag" class="banner-tag">{{ b.tag }}</span>
            <div class="banner-title">{{ b.title }}</div>
            <div class="banner-sub">{{ b.sub }}</div>
          </div>
          <div v-if="!b.img" class="banner-emoji">{{ b.emoji }}</div>
        </div>
      </div>
      <div class="banner-dots">
        <span v-for="(_, i) in banners" :key="i" class="dot" :class="{ active: current === i }" @click="current = i" />
      </div>
    </div>

    <!-- 公告 -->
    <div class="notice">
      <span class="notice-icon">📢</span>
      <span class="notice-text">欢迎光临卓越烟酒店！习酒窖藏系列现货供应，正品保障，假一赔十。</span>
    </div>

    <!-- 分类导航 -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">商品分类</span>
      </div>
      <div class="category-grid card">
        <div v-for="cat in categories" :key="cat.type" class="cat-item" @click="goGoods(cat.type)">
          <div class="cat-icon" :style="{ background: cat.bg }">{{ cat.icon }}</div>
          <span class="cat-name">{{ cat.name }}</span>
        </div>
      </div>
    </div>

    <!-- 精选商品 -->
    <div class="section">
      <div class="section-header">
        <span class="section-title">精选推荐</span>
        <span class="section-more" @click="goGoods('')">全部 ›</span>
      </div>
      <div class="goods-grid">
        <div v-for="g in featured" :key="g.id" class="goods-card card" @click="goDetail(g.id)">
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
    </div>

    <!-- 店铺优势 -->
    <div class="section">
      <div class="section-header"><span class="section-title">为什么选择我们</span></div>
      <div class="card advantage-list">
        <div v-for="a in advantages" :key="a.title" class="advantage-item">
          <span class="adv-icon">{{ a.icon }}</span>
          <div class="adv-text">
            <div class="adv-title">{{ a.title }}</div>
            <div class="adv-desc">{{ a.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 小米话术卡片 -->
    <div class="section">
      <div class="mascot-card card">
        <img src="/mascot/xiaomi.jpg" class="mascot-card-img" alt="小米" />
        <div class="mascot-bubble">
          <div class="mascot-name">店长 · 小米 🐱</div>
          <div class="mascot-text">喵～本店所有酒水均正品保障，有问题找我！🐱</div>
        </div>
      </div>
    </div>

    <TabBar />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import TabBar from '../components/TabBar.vue'

const router = useRouter()
const current = ref(0)
let timer = null

const banners = [
  { tag: '', title: '卓越烟酒店', sub: '习酒·窖藏1988 · 正品保障', img: '/images/storefront.jpg' },
  { tag: '名优白酒', title: '茅台金王子', sub: '正品现货 · 酱香佳酿', emoji: '🥃', bg: 'linear-gradient(135deg,#5C1111,#8B1A1A)' },
  { tag: '精品好酒', title: '红花郎十五年', sub: '陈酿15年 · 酱香典范', emoji: '🍶', bg: 'linear-gradient(135deg,#5C4A1A,#C9A84C)' },
]

const categories = [
  { name: '白酒', icon: '🥃', bg: '#fde8e8', type: 'baijiu' },
  { name: '红酒', icon: '🍷', bg: '#f9e8f0', type: 'wine' },
  { name: '香烟', icon: '🚬', bg: '#e8eef9', type: 'tobacco' },
  { name: '礼盒', icon: '🎁', bg: '#fff0d0', type: 'gift' },
  { name: '啤酒', icon: '🍺', bg: '#e8f6f9', type: 'beer' },
  { name: '洋酒', icon: '🥂', bg: '#ede8f9', type: 'foreign' },
  { name: '茶叶', icon: '🍵', bg: '#e8f9ef', type: 'tea' },
  { name: '更多', icon: '➕', bg: '#f0f0f0', type: '' },
]

const featured = [
  { id: 1,  name: '茅台金王子',      spec: '500ml/盒 53°酱香型', price: '229', img: '/goods/maotai-jinwangzi.jpg',      tag: '正品', tagClass: 'tag-hot' },
  { id: 3,  name: '红花郎（十五年）', spec: '500ml/瓶 53°酱香型', price: '459', img: '/goods/langjiu-honghuanlang15.jpg', tag: '热销', tagClass: 'tag-hot' },
  { id: 2,  name: '珍酒·珍十五',    spec: '500ml/瓶 53°酱香型', price: '399', img: '/goods/zhenjiu-zhen15.jpg',         tag: '',    tagClass: '' },
  { id: 10, name: '老习酒',          spec: '500ml/盒 53°酱香型', price: '168', img: '/goods/xijiu-laoxijiu.jpg',         tag: '',    tagClass: '' },
]

const advantages = [
  { icon: '✅', title: '正品保障', desc: '正规渠道进货，假一赔十' },
  { icon: '🚀', title: '同城配送', desc: '2小时送达，支持上门自提' },
  { icon: '🎁', title: '礼品包装', desc: '专业礼品包装，送礼更有面子' },
  { icon: '📞', title: '专业咨询', desc: '10年行业经验，为您推荐好品' },
]

const goGoods = (type) => router.push(type ? `/goods?type=${type}` : '/goods')
const goDetail = (id) => router.push(`/goods/${id}`)

onMounted(() => { timer = setInterval(() => { current.value = (current.value + 1) % banners.length }, 3500) })
onUnmounted(() => clearInterval(timer))
</script>

<style scoped>
.home-header {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  padding: 20px 16px 24px;
  display: flex; align-items: center; justify-content: space-between;
}
.header-logo { display: flex; align-items: center; gap: 10px; }
.mascot-avatar { width: 48px; height: 48px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gold); flex-shrink: 0; }
.logo-text { display: flex; flex-direction: column; gap: 3px; }
.logo-title { display: flex; align-items: baseline; gap: 4px; }
.logo-cn { font-size: 26px; font-weight: 800; color: var(--gold); letter-spacing: 2px; }
.logo-sub { font-size: 14px; color: rgba(255,255,255,.8); }
.logo-tagline { font-size: 11px; color: var(--gold); opacity: .9; letter-spacing: 1px; }
.header-slogan { font-size: 12px; color: rgba(255,255,255,.7); }

/* Banner */
.banner-wrap { position: relative; overflow: hidden; height: 160px; }
.banner { display: flex; height: 100%; transition: transform .4s ease; }
.banner-slide {
  min-width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 24px;
  position: relative; overflow: hidden;
}
.banner-bg-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.banner-overlay { position: absolute; inset: 0; background: rgba(0,0,0,.3); }
.banner-text { display: flex; flex-direction: column; gap: 6px; position: relative; z-index: 1; }
.banner-tag {
  font-size: 11px; color: rgba(255,255,255,.85);
  background: rgba(255,255,255,.2); padding: 2px 10px; border-radius: 20px;
  width: fit-content;
}
.banner-title { font-size: 24px; font-weight: 800; color: #fff; letter-spacing: 2px; }
.banner-sub { font-size: 13px; color: rgba(255,255,255,.8); }
.banner-emoji { font-size: 72px; line-height: 1; }
.banner-dots { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,.5); cursor: pointer; }
.dot.active { background: #fff; width: 16px; border-radius: 3px; }

/* 公告 */
.notice {
  background: #fff9f0; border-bottom: 1px solid #ffe5b4;
  padding: 8px 14px; display: flex; align-items: center; gap: 8px;
  overflow: hidden;
}
.notice-icon { font-size: 14px; flex-shrink: 0; }
.notice-text { font-size: 12px; color: #b07800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* 分类 */
.category-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  padding: 16px 8px; gap: 12px;
}
.cat-item { display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
.cat-icon { width: 52px; height: 52px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 26px; }
.cat-name { font-size: 12px; color: var(--text-secondary); }

/* 商品 */
.goods-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.goods-card { overflow: hidden; cursor: pointer; }
.goods-img { position: relative; height: 140px; overflow: hidden; background: #f5f5f5; }
.goods-img-photo { width: 100%; height: 100%; object-fit: cover; display: block; }
.goods-tag { position: absolute; top: 8px; left: 8px; font-size: 11px; padding: 2px 8px; border-radius: 20px; }
.goods-info { padding: 10px 12px 12px; }
.goods-name { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.goods-spec { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
.goods-price-row { display: flex; align-items: baseline; gap: 6px; }

/* 小米话术卡片 */
.mascot-card { display: flex; align-items: center; gap: 14px; padding: 16px; }
.mascot-card-img { width: 62px; height: 62px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gold); flex-shrink: 0; }
.mascot-bubble {
  flex: 1; background: #fff9f0; border-radius: 12px; padding: 10px 14px;
  position: relative;
}
.mascot-bubble::before {
  content: ''; position: absolute; left: -8px; top: 50%; transform: translateY(-50%);
  border: 7px solid transparent; border-right-color: #fff9f0;
}
.mascot-name { font-size: 12px; color: var(--gold); font-weight: 700; margin-bottom: 4px; }
.mascot-text { font-size: 13px; color: var(--text-secondary); line-height: 1.55; }

/* 优势 */
.advantage-list { padding: 8px 16px; }
.advantage-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.advantage-item:last-child { border-bottom: none; }
.adv-icon { font-size: 22px; flex-shrink: 0; width: 28px; text-align: center; }
.adv-title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
.adv-desc { font-size: 12px; color: var(--text-secondary); }
</style>
