import { createWebHashHistory, createRouter } from 'vue-router'

import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import Goods from '../pages/goods/goods.vue'
import { iconProps } from 'element-plus'

// 路由懒加载
const Admin = () => import('../layouts/admin.vue')
const Category = () => import('../pages/category/category.vue')

// 默认路由
const routes = [
  {
    name: "admin",
    path: '/',
    component: Admin,
    children: [{
      path: '/',
      component: Index,
      meta: {
        title: "首页",
        icon: ""
      },
    },
    ]
  },
  {
    path: '/login',
    name:'/login',
    component: Login,
    meta: {
      title: "登录"
    }
  },
  {
    name: '/:pathMatch(.*)*',
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

// 动态路由
const asyncRouter = [
  {
    name: '/goods/list',
    path: '/goods/list',
    component: Goods,
    meta: {
      title: "商品管理",
      icon:"",
    },
  },
  {
    name:'/category/list',
    path: '/category/list',
    component: Category,
    meta: {
      title: "分类管理",
      icon: ""
    },
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 通过获取后端接口动态添加路由
export const asyncAddRouter = (menus) => {
  // 是否有新的路由
  let hasNewRouter = false
  const findRouterByMenus = (arr) => {
    arr.forEach(element => {
      let item = asyncRouter.find(o => o.path == element.frontpath)
      // 如果前后端的路由数据匹配，并且路由没有添加
      if (item && !router.hasRoute(element.frontpath)) {
        // 添加路由
        item.meta.icon = element.icon
        // 只有一个层级时候使用“admin”
        router.addRoute("admin", item)
        hasNewRouter = true
      }
      // 判断子路由，递归添加
      if (element.child && element.child.length > 0) {
        findRouterByMenus(element.child)
      }
    });
  }
  findRouterByMenus(menus)
  return hasNewRouter;
};