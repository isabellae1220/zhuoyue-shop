<template>
  <div class="page" v-if="goods">
    <div class="navbar">
      <span class="navbar-back" @click="router.back()">‹</span>
      <span class="navbar-title">商品详情</span>
      <span></span>
    </div>

    <!-- 商品图片区 -->
    <div class="goods-hero">
      <img :src="goods.img" :alt="goods.name" class="goods-hero-img" />
      <span v-if="goods.tag" class="goods-tag" :class="goods.tagClass">{{ goods.tag }}</span>
    </div>

    <!-- 价格信息 -->
    <div class="price-block card">
      <div class="price-row">
        <span class="price-big">¥{{ goods.price }}</span>
        <span v-if="goods.origin" class="price-origin">¥{{ goods.origin }}</span>
        <span v-if="goods.origin" class="price-save">省¥{{ goods.origin - goods.price }}</span>
      </div>
      <div class="goods-name-big">{{ goods.name }}</div>
      <div class="goods-spec-text">{{ goods.spec }}</div>
      <div class="goods-sales">已售 {{ goods.sales }}+ 件</div>
    </div>

    <!-- 规格参数 -->
    <div class="section">
      <div class="section-header"><span class="section-title">商品规格</span></div>
      <div class="card spec-list">
        <div v-for="(item, i) in goods.specs" :key="i" class="spec-item">
          <span class="spec-label">{{ item.label }}</span>
          <span class="spec-value">{{ item.value }}</span>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="section">
      <div class="section-header"><span class="section-title">商品介绍</span></div>
      <div class="card desc-block">
        <p v-for="(line, i) in goods.desc" :key="i" class="desc-line">{{ line }}</p>
      </div>
    </div>

    <!-- 保障信息 -->
    <div class="guarantee-bar">
      <div v-for="g in guarantees" :key="g" class="guarantee-item">
        <span>{{ g }}</span>
      </div>
    </div>

    <!-- 底部操作栏 -->
    <div class="action-bar">
      <div class="action-contact" @click="goContact">
        <span>📞</span>
        <span>联系</span>
      </div>
      <button class="btn-add-cart" @click="showToast('已加入购物车')">加入购物车</button>
      <button class="btn-buy-now" @click="showToast('请联系店主下单')">立即购买</button>
    </div>

    <!-- Toast 提示 -->
    <div v-if="toastText" class="toast">{{ toastText }}</div>
  </div>

  <div class="page not-found" v-else>
    <div class="navbar">
      <span class="navbar-back" @click="router.back()">‹</span>
      <span class="navbar-title">商品详情</span>
      <span></span>
    </div>
    <div class="empty" style="padding-top:80px">
      <div class="empty-icon">😕</div>
      <div class="empty-text">商品不存在</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const toastText = ref('')

const allGoods = [
  {
    id: 1, name: '茅台金王子', spec: '500ml/盒 53°酱香型白酒', price: 229, origin: 0,
    img: '/goods/maotai-jinwangzi.jpg', tag: '', tagClass: '',
    sales: 280,
    specs: [
      { label: '品牌', value: '贵州茅台' }, { label: '香型', value: '酱香型' },
      { label: '度数', value: '53°' }, { label: '净含量', value: '500ml' },
      { label: '包装', value: '盒装' }, { label: '产地', value: '贵州省仁怀市' },
    ],
    desc: [
      '茅台金王子是贵州茅台酒股份有限公司出品的酱香型白酒，选用优质红缨子糯高粱为原料，以赤水河水精心酿制。',
      '酱香突出，酒体醇厚，回味悠长，是茅台系列中兼具品质与性价比的优选。',
    ],
  },
  {
    id: 2, name: '珍酒·珍十五', spec: '500ml/瓶 53°酱香型白酒', price: 399, origin: 0,
    img: '/goods/zhenjiu-zhen15.jpg', tag: '', tagClass: '',
    sales: 160,
    specs: [
      { label: '品牌', value: '珍酒' }, { label: '香型', value: '酱香型' },
      { label: '度数', value: '53°' }, { label: '净含量', value: '500ml' },
      { label: '陈酿', value: '15年基酒勾调' }, { label: '产地', value: '贵州省遵义市' },
    ],
    desc: [
      '珍酒珍十五选用15年以上优质陈年基酒精心勾调而成，采用传统茅台镇工艺，酱香馥郁，口感醇厚绵柔。',
      '珍酒是国家名酒，品质有保障，是商务宴请、馈赠亲友的佳品。',
    ],
  },
  {
    id: 3, name: '红花郎（十五年）', spec: '500ml/瓶 53°酱香型白酒', price: 459, origin: 0,
    img: '/goods/langjiu-honghuanlang15.jpg', tag: '', tagClass: '',
    sales: 210,
    specs: [
      { label: '品牌', value: '郎酒' }, { label: '系列', value: '红花郎' },
      { label: '香型', value: '酱香型' }, { label: '度数', value: '53°' },
      { label: '净含量', value: '500ml' }, { label: '陈酿', value: '15年' },
    ],
    desc: [
      '红花郎（十五年）是郎酒旗下高端酱香产品，以15年老酒为主体基酒精心勾调，酱香馥郁，口感醇厚细腻。',
      '品质卓越，包装大气，是宴请宾客、馈赠佳礼的上乘之选。',
    ],
  },
  {
    id: 4, name: '剑南春', spec: '500ml/瓶 52°浓香型白酒', price: 438, origin: 0,
    img: '/goods/jiannanchun-52.jpg', tag: '', tagClass: '',
    sales: 130,
    specs: [
      { label: '品牌', value: '剑南春' }, { label: '香型', value: '浓香型' },
      { label: '度数', value: '52°' }, { label: '净含量', value: '500ml' },
      { label: '产地', value: '四川省绵竹市' }, { label: '保质期', value: '无保质期' },
    ],
    desc: [
      '剑南春是四川名酒，选用优质多粮酿制，浓香纯正，绵甜甘爽，入口柔顺，余味悠长。',
      '历史悠久，品质稳定，是宴席送礼的经典之选。',
    ],
  },
  {
    id: 5, name: '习酒·醇钻', spec: '500ml/盒 53°酱香型白酒', price: 178, origin: 0,
    img: '/goods/xijiu-chunzuan.jpg', tag: '', tagClass: '',
    sales: 320,
    specs: [
      { label: '品牌', value: '贵州习酒' }, { label: '系列', value: '醇钻' },
      { label: '香型', value: '酱香型' }, { label: '度数', value: '53°' },
      { label: '净含量', value: '500ml' }, { label: '包装', value: '盒装' },
    ],
    desc: [
      '习酒醇钻是贵州习酒系列入门款，采用优质酱香工艺酿制，酱香突出，口感圆润，性价比极高。',
      '产自贵州赤水河流域，传承习酒经典工艺，日常自饮、朋友聚会的好选择。',
    ],
  },
  {
    id: 6, name: '享悠然', spec: '500ml 53°酱香型白酒', price: 168, origin: 0,
    img: '/goods/xijiu-xiangyouran-500.jpg', tag: '', tagClass: '',
    sales: 380,
    specs: [
      { label: '品牌', value: '习湖享悠然' }, { label: '香型', value: '酱香型' },
      { label: '度数', value: '53°' }, { label: '净含量', value: '500ml' },
      { label: '产地', value: '贵州省习水县' }, { label: '保质期', value: '无保质期' },
    ],
    desc: [
      '享悠然酱香型白酒产自贵州赤水河流域核心产区，采用传统大曲坤沙工艺酿制。',
      '酱香纯正，口感柔和，余味悠长，性价比高，是口粮酒的优质之选。',
    ],
  },
  {
    id: 7, name: '享悠然·悦享', spec: '1000ml 53°酱香型白酒', price: 338, origin: 0,
    img: '/goods/xijiu-xiangyouran-1000.jpg', tag: '大瓶', tagClass: 'tag-import',
    sales: 150,
    specs: [
      { label: '品牌', value: '习湖享悠然' }, { label: '系列', value: '悦享' },
      { label: '香型', value: '酱香型' }, { label: '度数', value: '53°' },
      { label: '净含量', value: '1000ml' }, { label: '产地', value: '贵州省习水县' },
    ],
    desc: [
      '享悠然悦享大瓶装，容量加倍，价值超值，适合家庭聚会、宴请宾客。',
      '同等品质，大瓶更划算，酱香纯正，回味悠长。',
    ],
  },
  {
    id: 8, name: '享悠然（小瓶）', spec: '100ml 53°酱香型白酒', price: 25, origin: 0,
    img: '/goods/xijiu-xiangyouran-100.jpg', tag: '尝鲜', tagClass: 'tag-import',
    sales: 520,
    specs: [
      { label: '品牌', value: '习湖享悠然' }, { label: '香型', value: '酱香型' },
      { label: '度数', value: '53°' }, { label: '净含量', value: '100ml' },
      { label: '产地', value: '贵州省习水县' }, { label: '保质期', value: '无保质期' },
    ],
    desc: [
      '享悠然小瓶装便于携带，适合尝鲜体验或出行随身携带，同等工艺品质，随时随地享受酱香之美。',
    ],
  },
  {
    id: 9, name: '太享福', spec: '500ml/瓶 53°酱香型白酒', price: 108, origin: 0,
    img: '/goods/xijiu-taixiangfu.jpg', tag: '', tagClass: '',
    sales: 410,
    specs: [
      { label: '品牌', value: '太享福' }, { label: '香型', value: '酱香型' },
      { label: '度数', value: '53°' }, { label: '净含量', value: '500ml' },
      { label: '产地', value: '贵州省' }, { label: '保质期', value: '无保质期' },
    ],
    desc: [
      '太享福酱香型白酒精选贵州优质糯高粱为原料，传统工艺酿造，酱香自然纯正，口感舒适。',
      '价格实惠，物美价廉，是日常自饮的好选择。',
    ],
  },
  {
    id: 10, name: '老习酒', spec: '500ml/盒 53°酱香型白酒', price: 168, origin: 0,
    img: '/goods/xijiu-laoxijiu.jpg', tag: '', tagClass: '',
    sales: 290,
    specs: [
      { label: '品牌', value: '贵州习酒' }, { label: '系列', value: '老习酒' },
      { label: '香型', value: '酱香型' }, { label: '度数', value: '53°' },
      { label: '净含量', value: '500ml' }, { label: '包装', value: '盒装' },
    ],
    desc: [
      '老习酒是贵州习酒的经典系列，传承习酒传统酱香工艺，酱香醇厚，入口绵柔，留香持久。',
      '是送礼自饮的好选择，深受广大消费者喜爱。',
    ],
  },
]

const goods = computed(() => allGoods.find(g => g.id === Number(route.params.id)))

const guarantees = ['✅ 正品保障', '🚀 2小时达', '🎁 精品包装']

let toastTimer = null
const showToast = (msg) => {
  toastText.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastText.value = '' }, 2000)
}

const goContact = () => router.push('/contact')
</script>

<style scoped>
.goods-hero {
  position: relative; height: 280px;
  overflow: hidden; background: #f5f5f5;
}
.goods-hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.goods-tag { position: absolute; top: 12px; left: 12px; font-size: 12px; padding: 3px 10px; border-radius: 20px; }

.price-block { padding: 16px; margin: 0; border-radius: 0; }
.price-row { display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px; }
.price-big { font-size: 28px; font-weight: 800; color: var(--primary); }
.price-origin { font-size: 14px; color: var(--text-muted); text-decoration: line-through; }
.price-save { font-size: 12px; color: #fff; background: var(--primary); padding: 2px 8px; border-radius: 10px; }
.goods-name-big { font-size: 18px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
.goods-spec-text { font-size: 13px; color: var(--text-secondary); margin-bottom: 4px; }
.goods-sales { font-size: 12px; color: var(--text-muted); }

.spec-list { padding: 0 16px; }
.spec-item { display: flex; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 13px; }
.spec-item:last-child { border-bottom: none; }
.spec-label { width: 80px; color: var(--text-muted); flex-shrink: 0; }
.spec-value { color: var(--text-primary); }

.desc-block { padding: 12px 16px; }
.desc-line { font-size: 13px; color: var(--text-secondary); line-height: 1.7; margin: 0 0 8px; }
.desc-line:last-child { margin-bottom: 0; }

.guarantee-bar {
  display: flex; justify-content: space-around;
  background: #fff9f0; padding: 12px 8px;
  border-top: 1px solid #ffe5b4; border-bottom: 1px solid #ffe5b4;
  margin-bottom: 70px;
}
.guarantee-item { font-size: 12px; color: #b07800; }

.action-bar {
  position: fixed; bottom: 0; left: 50%; transform: translateX(-50%);
  width: 100%; max-width: 480px;
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; background: #fff;
  border-top: 1px solid var(--border);
  box-sizing: border-box;
}
.action-contact {
  display: flex; flex-direction: column; align-items: center;
  font-size: 11px; color: var(--text-muted); gap: 2px;
  cursor: pointer; padding: 0 8px; flex-shrink: 0;
}
.action-contact span:first-child { font-size: 20px; }
.btn-add-cart {
  flex: 1; padding: 10px 0; border-radius: 22px;
  background: #fff3e0; color: var(--primary); border: none;
  font-size: 14px; font-weight: 600; cursor: pointer;
}
.btn-buy-now {
  flex: 1; padding: 10px 0; border-radius: 22px;
  background: var(--primary); color: #fff; border: none;
  font-size: 14px; font-weight: 600; cursor: pointer;
}

.toast {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  background: rgba(0,0,0,.7); color: #fff;
  padding: 10px 24px; border-radius: 20px; font-size: 14px;
  z-index: 9999; pointer-events: none;
}

.empty { text-align: center; }
.empty-icon { font-size: 48px; margin-bottom: 12px; }
.empty-text { font-size: 14px; color: var(--text-muted); }
</style>
