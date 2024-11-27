import { createApp } from 'vue'
import VueCookies from 'vue3-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "tailwindcss/tailwind.css"
import App from './App.vue'
import VueRouter from './router'

const app = createApp(App)
app.use(VueCookies)
app.use(ElementPlus)
app.use(VueRouter)

app.mount('#app')
