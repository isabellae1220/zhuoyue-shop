<template>
  <div class="page">
    <div class="navbar">
      <span style="width:32px"></span>
      <span class="navbar-title">联系我们</span>
      <span style="width:32px"></span>
    </div>

    <!-- 店铺头部 -->
    <div class="shop-hero">
      <img src="/mascot/xiaomi.jpg" class="shop-avatar" alt="店长小米" />
      <div class="shop-name">卓越烟酒店</div>
      <div class="shop-tagline">习酒·窖藏1988</div>
      <div class="shop-slogan">店长小米坐镇，正品把关，假一赔十</div>
    </div>

    <!-- 快捷联系 -->
    <div class="quick-actions">
      <a class="quick-btn" href="tel:13595334370">
        <span class="quick-icon">📞</span>
        <span>135-9533-4370</span>
      </a>
      <a class="quick-btn quick-btn-outline" href="tel:13595370678">
        <span class="quick-icon">📞</span>
        <span>135-9537-0678</span>
      </a>
      <div class="quick-addr">
        <span class="quick-icon">📍</span>
        <span>贵州省安顺市西秀区中华东路99号（建设路路口对面）</span>
      </div>
    </div>

    <!-- 小米店长介绍 -->
    <div class="section mascot-section">
      <div class="mascot-profile card">
        <img src="/mascot/xiaomi.jpg" class="profile-avatar" alt="小米" />
        <div class="profile-name">小米店长</div>
        <div class="profile-badge">首席品控官</div>
        <div class="profile-bio">
          <p>今年七岁，蓝白英短 🐱</p>
          <p>最爱冻干和罐罐 🐟</p>
          <p>欢迎来我家买烟酒</p>
          <p>来了可以免费 rua 我噢～</p>
        </div>
      </div>
    </div>

    <!-- 联系信息 -->
    <div class="section">
      <div class="section-header"><span class="section-title">联系方式</span></div>
      <div class="card info-list">
        <div v-for="item in contactInfo" :key="item.label" class="info-item">
          <span class="info-icon">{{ item.icon }}</span>
          <div class="info-content">
            <div class="info-label">{{ item.label }}</div>
            <div class="info-value">{{ item.value }}</div>
          </div>
          <span v-if="item.action" class="info-action" @click="item.action()">{{ item.actionText }}</span>
        </div>
      </div>
    </div>

    <!-- 营业时间 -->
    <div class="section">
      <div class="section-header"><span class="section-title">营业时间</span></div>
      <div class="card hours-list">
        <div v-for="h in hours" :key="h.day" class="hours-item">
          <span class="hours-day">{{ h.day }}</span>
          <span class="hours-time" :class="{ 'hours-open': h.open }">{{ h.time }}</span>
        </div>
      </div>
    </div>

    <!-- 地图区域 -->
    <div class="section">
      <div class="section-header"><span class="section-title">店铺位置</span></div>
      <div class="card map-block">
        <div class="map-placeholder">
          <div class="map-pin">📍</div>
          <div class="map-addr">贵州省安顺市西秀区中华东路99号</div>
          <div class="map-sub">建设路路口对面</div>
        </div>
        <a class="map-btn" href="#" @click.prevent="showToast('请使用手机地图导航')">
          导航到店 ›
        </a>
      </div>
    </div>

    <!-- 服务承诺 -->
    <div class="section">
      <div class="section-header"><span class="section-title">服务承诺</span></div>
      <div class="card promise-list">
        <div v-for="p in promises" :key="p.title" class="promise-item">
          <span class="promise-icon">{{ p.icon }}</span>
          <div>
            <div class="promise-title">{{ p.title }}</div>
            <div class="promise-desc">{{ p.desc }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toastText" class="toast">{{ toastText }}</div>

    <TabBar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TabBar from '../components/TabBar.vue'

const toastText = ref('')
let toastTimer = null
const showToast = (msg) => {
  toastText.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastText.value = '' }, 2000)
}

const contactInfo = [
  { icon: '📞', label: '联系电话', value: '135-9533-4370', actionText: '拨打', action: () => { window.location.href = 'tel:13595334370' } },
  { icon: '📞', label: '备用电话', value: '135-9537-0678', actionText: '拨打', action: () => { window.location.href = 'tel:13595370678' } },
  { icon: '📍', label: '店铺地址', value: '贵州省安顺市西秀区中华东路99号（建设路路口对面）', actionText: '', action: null },
]

const hours = [
  { day: '周一 ~ 周五', time: '09:00 — 21:00', open: true },
  { day: '周六 ~ 周日', time: '08:00 — 22:00', open: true },
  { day: '法定节假日', time: '正常营业', open: true },
  { day: '特殊情况', time: '提前通知', open: false },
]

const promises = [
  { icon: '✅', title: '假一赔十', desc: '所有商品均为正规渠道进货，假一赔十无条件退款' },
  { icon: '🚀', title: '2小时配送', desc: '同城2小时闪送到家，也可上门自提' },
{ icon: '🎁', title: '免费包装', desc: '免费提供精美礼品包装，送礼更有面子' },
  { icon: '💰', title: '大量批发优惠', desc: '批量采购享受专属折扣，欢迎企业合作' },
]
</script>

<style scoped>
.shop-hero {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary));
  padding: 32px 16px 28px;
  text-align: center;
}
.shop-avatar {
  width: 84px; height: 84px; border-radius: 50%; object-fit: cover;
  border: 3px solid var(--gold);
  display: block; margin: 0 auto 12px;
}
.shop-name { font-size: 20px; font-weight: 800; color: #fff; letter-spacing: 2px; margin-bottom: 4px; }
.shop-tagline { font-size: 12px; color: var(--gold); letter-spacing: 1px; margin-bottom: 6px; }
.shop-slogan { font-size: 13px; color: rgba(255,255,255,.9); }

.quick-actions { display: flex; flex-direction: column; gap: 8px; padding: 16px 12px; }
.quick-btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  background: var(--primary); color: #fff; border-radius: 24px;
  padding: 12px 0; font-size: 15px; font-weight: 600;
  text-decoration: none; width: 100%;
}
.quick-btn-outline { background: #fff; color: var(--primary); border: 2px solid var(--primary); }
.quick-addr {
  display: flex; align-items: center; gap: 8px;
  background: #fff9f0; border: 1px solid #ffe5b4; border-radius: 24px;
  padding: 11px 16px; font-size: 13px; color: var(--text-secondary); line-height: 1.4;
}
.quick-icon { font-size: 18px; }

.info-list { padding: 0 16px; }
.info-item { display: flex; align-items: center; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.info-item:last-child { border-bottom: none; }
.info-icon { font-size: 20px; flex-shrink: 0; width: 28px; text-align: center; }
.info-content { flex: 1; }
.info-label { font-size: 12px; color: var(--text-muted); margin-bottom: 2px; }
.info-value { font-size: 14px; color: var(--text-primary); }
.info-action {
  font-size: 12px; color: var(--primary); border: 1px solid var(--primary);
  padding: 3px 10px; border-radius: 12px; cursor: pointer; flex-shrink: 0;
}

.hours-list { padding: 0 16px; }
.hours-item { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 14px; }
.hours-item:last-child { border-bottom: none; }
.hours-day { color: var(--text-secondary); }
.hours-time { color: var(--text-muted); }
.hours-open { color: #27ae60; font-weight: 600; }

.map-block { padding: 0; overflow: hidden; }
.map-placeholder {
  height: 160px; background: linear-gradient(135deg, #f0f0f0, #e0e0e0);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
}
.map-pin { font-size: 36px; }
.map-addr { font-size: 14px; color: var(--text-primary); font-weight: 600; }
.map-sub { font-size: 12px; color: var(--text-muted); }
.map-btn {
  display: block; text-align: center; padding: 12px;
  font-size: 14px; color: var(--primary); font-weight: 600;
  text-decoration: none; border-top: 1px solid var(--border);
  background: #fff;
}

.promise-list { padding: 0 16px; }
.promise-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--border); }
.promise-item:last-child { border-bottom: none; }
.promise-icon { font-size: 20px; flex-shrink: 0; width: 28px; text-align: center; margin-top: 1px; }
.promise-title { font-size: 14px; font-weight: 600; color: var(--text-primary); margin-bottom: 2px; }
.promise-desc { font-size: 12px; color: var(--text-secondary); line-height: 1.5; }

.mascot-section { margin-bottom: 24px; }

/* 小米店长卡片 */
.mascot-profile {
  text-align: center;
  padding: 28px 20px 22px;
}
.profile-avatar {
  width: 90px; height: 90px;
  border-radius: 50%; object-fit: cover;
  border: 3px solid var(--gold);
  display: block; margin: 0 auto 14px;
  box-shadow: 0 4px 16px rgba(139,26,26,.18);
}
.profile-name {
  font-size: 18px; font-weight: 800;
  color: var(--primary); letter-spacing: 1px;
  margin-bottom: 8px;
}
.profile-badge {
  display: inline-block;
  font-size: 11px; color: #fff;
  background: var(--primary);
  padding: 3px 14px; border-radius: 20px;
  margin-bottom: 16px;
  letter-spacing: 1px;
}
.profile-bio {
  font-size: 14px; line-height: 2;
  color: var(--text-secondary);
}
.profile-bio p { margin: 0; }

.toast {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  background: rgba(0,0,0,.7); color: #fff;
  padding: 10px 24px; border-radius: 20px; font-size: 14px;
  z-index: 9999; pointer-events: none;
}
</style>
