import { createWebHashHistory, createRouter } from 'vue-router'

import Admin from '../layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import Goods from '../pages/goods.vue'

const routes = [
  {
    path: '/',
    component: Admin,
    children: [{
      path: '/',
      component: Index,
      meta: {
        title: "首页"
      }
    },
    {
      path: '/goods/list',
      component: Goods,
      meta: {
        title: "商品列表"
      }
    }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;