import { createApp } from 'vue'
import VueCookies from 'vue3-cookies'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "tailwindcss/tailwind.css"
import './assets/styles/theme.css'  // 引入主题样式
import App from './App.vue'
import {router} from './router'

const app = createApp(App)
app.use(VueCookies)
app.use(store)
app.use(ElementPlus)
// 引入ElementPlusIcons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

app.use(router)

import './permission'
import 'nprogress/nprogress.css'

app.mount('#app')
