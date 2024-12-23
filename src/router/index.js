import { createWebHashHistory, createRouter } from 'vue-router'

import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'

// 路由懒加载
const Admin = () => import('../layouts/admin.vue')
const Goods = () => import('~/pages/goods/goods.vue')
const Category = () => import('~/pages/category/category.vue')
const User = () => import('~/pages/user/list.vue')
const Order = () => import('~/pages/order/list.vue')
const Comment = () => import('~/pages/comment/list.vue')
const Image = () => import('~/pages/image/list.vue')
const Notice = () => import('~/pages/notice/list.vue')
const Setting = () => import('~/pages/setting/base.vue')
const Coupon = () => import('~/pages/coupon/list.vue')



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
  {
    name:'/user/list',
    path: '/user/list',
    component: User,
    meta: {
      title: "用户列表",
      icon: ""
    }, 
  },
  {
    name:'/order/list',
    path: '/order/list',
    component: Order,
    meta: {
      title: "订单列表",
      icon: ""
    }, 
  },
  {
    name:'/comment/list',
    path: '/comment/list',
    component: Comment,
    meta: {
      title: "评论列表",
      icon: ""
    }, 
  },
  {
    name:'/image/list',
    path: '/image/list',
    component: Image,
    meta: {
      title: "图库列表",
      icon: ""
    }, 
  },
  {
    name:'/notice/list',
    path: '/notice/list',
    component: Notice,
    meta: {
      title: "公告列表",
      icon: ""
    }, 
  },
  {
    name:'/setting',
    path: '/setting',
    component: Setting,
    meta: {
      title: "配置",
      icon: ""
    }, 
  },
  {
    name:'/coupon/list',
    path: '/coupon/list',
    component: Coupon,
    meta: {
      title: "优惠券列表",
      icon: ""
    }, 
  }
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