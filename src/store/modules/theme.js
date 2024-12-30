// theme.js
export default {
    namespaced: true,
    state: {
        theme: localStorage.getItem('theme') || 'light' // 默认浅色主题
    },
    mutations: {
        SET_THEME(state, theme) {
            state.theme = theme
            localStorage.setItem('theme', theme)
            // 在根元素上设置主题class
            document.documentElement.className = theme
        }
    },
    actions: {
        toggleTheme({ commit, state }) {
            const newTheme = state.theme === 'light' ? 'dark' : 'light'
            commit('SET_THEME', newTheme)
        }
    }
}
