import { createStore } from 'vuex'
import { login, getinfo } from '../api/manager'
import { setToken, removeToken } from '../composable/auth'

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            // 用户信息
            user: {},
            // 侧边栏折叠
            asideMenuIsColse: false,
            // 侧边菜单
            menus:[],
            // 权限
            ruleNames:[],
        }
    },
    mutations: {
        // 记录用户信息
        SET_USERINFO(state, user) {
            state.user = user
        },
        // 设置侧边栏折叠
        SET_ASIDEMENU_ISCOLSE(state) {
            state.asideMenuIsColse = !state.asideMenuIsColse ;
        },
         // 设置侧边菜单内容
         SET_MENUS(state, menus) {
            state.menus = menus
        },
         // 设置权限
         SET_RULENAMES(state, ruleNames) {
            state.ruleNames = ruleNames
        }
    },
    actions: {
        // 登录逻辑
        login({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                login(username, password)
                    .then(res => {
                        setToken(res.token)
                        resolve(res)
                    }).catch(err => { reject(err) })
            })
        },
        // 获取当前登录的用户信息
        getuserinfo({ commit }) {
            return new Promise((resolve, reject) => {
                getinfo().then(res => {
                    commit("SET_USERINFO", res)
                    commit("SET_MENUS", res.menus)
                    commit("SET_RULENAMES", res.ruleNames)
                    resolve(res)
                }).catch(err => reject(err))
            })
        },
        // 退出登录
        logout({ commit }) {
            //移除cookie中的token
            removeToken()
            //清楚vuex中的用户信息
            commit("SET_USERINFO", {})
        }
    }
})

export default store;