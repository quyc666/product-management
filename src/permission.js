import router from "./router";
import { getToken } from "./composable/auth";
import { toast } from "./composable/util";
import store from "./store";
// 路由全局前置守卫
router.beforeEach(async (to, from)=>{
    const token = getToken()
    if (!token && to.path !== "/login"){
        toast("请先登录", "warning")
        return "/login"
    }
    // 防止重复登录
    if (token && to.path === "/login"){
        toast("请勿重复登录", "warning")
        return from.path ? from.path : "/"
    }
    // 用户登录过自动获取用户信息保存到vuex
    if(token){
        await store.dispatch('getuserinfo')
    }
})