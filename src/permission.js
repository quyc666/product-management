import router from "./router";
import { getToken } from "./composable/auth";
import { toast } from "./composable/util";
// 路由全局前置守卫
router.beforeEach((to, from)=>{
    const token = getToken()
    if (!token && to.path !== "/login"){
        toast("请先登录", "error")
        return "/login"
    }
    // 防止重复登录
    if (token && to.path === "/login"){
        return from.path
    }
})