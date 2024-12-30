<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
    // 初始化主题
    const theme = localStorage.getItem('theme') || 'light'
    store.commit('theme/SET_THEME', theme)
})
</script>

<template>
  <router-view></router-view>
</template>

<style>
/* 应用主题变量 */
#app {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    min-height: 100vh;
}

/* Element Plus 组件主题适配 */
.el-header {
    background-color: var(--header-bg) !important;
    color: var(--header-text) !important;
    border-bottom: 1px solid var(--border-color);
}

.el-menu {
    background-color: var(--menu-bg) !important;
    border-right: 1px solid var(--border-color) !important;
}

.el-menu-item {
    color: var(--menu-text) !important;
}

.el-menu-item:hover {
    background-color: var(--menu-hover) !important;
}

.el-menu-item.is-active {
    color: var(--menu-active) !important;
    background-color: var(--menu-hover) !important;
}

.el-sub-menu__title {
    color: var(--menu-text) !important;
}

.el-sub-menu__title:hover {
    background-color: var(--menu-hover) !important;
}

/* 表格样式适配 */
.el-table {
    background-color: var(--card-bg) !important;
    color: var(--text-primary) !important;
}

.el-table th.el-table__cell {
    background-color: var(--table-header-bg) !important;
    color: var(--text-primary) !important;
}

.el-table td.el-table__cell {
    background-color: var(--card-bg) !important;
    color: var(--text-primary) !important;
    border-bottom: 1px solid var(--table-border) !important;
}

.el-table--border .el-table__cell {
    border-right: 1px solid var(--table-border) !important;
}

/* 卡片样式适配 */
.el-card {
    background-color: var(--card-bg) !important;
    color: var(--text-primary) !important;
    border: 1px solid var(--border-color) !important;
}

/* 下拉菜单样式适配 */
.el-dropdown-menu {
    background-color: var(--card-bg) !important;
    border: 1px solid var(--border-color) !important;
}

.el-dropdown-menu__item {
    color: var(--text-primary) !important;
}

.el-dropdown-menu__item:hover {
    background-color: var(--hover-bg) !important;
}

/* 过渡动画 */
* {
    transition: background-color 0.3s, color 0.3s;
}
</style>
