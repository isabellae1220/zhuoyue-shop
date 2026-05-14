import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import GoodsList from '../pages/GoodsList.vue'
import GoodsDetail from '../pages/GoodsDetail.vue'
import Contact from '../pages/Contact.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/goods', component: GoodsList },
    { path: '/goods/:id', component: GoodsDetail },
    { path: '/contact', component: Contact },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
