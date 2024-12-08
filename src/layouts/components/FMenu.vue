<template>
    <el-aside>
        <el-menu default-active="2" class="border-0" :collapse="$store.state.asideMenuIsColse">
            <a href="/" class="logo">
                <img src="../../assets/images/homepage-icon-big.png" v-if="!$store.state.asideMenuIsColse">
                <img src="../../assets/images/homepage-icon-little.png" v-else style="width: 45px; height: 45px;">
            </a>
            <template v-for="(item, index) in asideMenus" :key="index">
                <el-sub-menu v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2">
                        <el-icon>
                            <component :is="item2.icon"></component>
                        </el-icon>
                        <span>{{ item2.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.frontpath">
                    <template #title>
                        <el-icon>
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                </el-menu-item>
            </template>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { ref } from 'vue'
const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}

const asideMenus = [{
    "name": "后台面板",
    "icon": "help",
    "child": [{
        "name": "主控台",
        "icon": "home-filled",
        "frontpath": "/"
    }]
},
{
    "name": "商城管理",
    "icon": "help",
    "child": [{
        "name": "商品管理",
        "icon": "shopping-cart-full",
        "frontpath": "/goods/list"
    }]
}
]
</script>

<style>
.el-aside {
    width: auto;
    height: 100vh;
    display: flex;
    background-color: #a5b4fc;
    /* @apply shadow-md fixed bg-indigo-300 border-x-2; */
}

.el-menu {
    background-color: #a5b4fc;
    border-right: none;
    width: 250px;

    &.el-menu--collapse {
        width: 60px;
    }
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 150x;
        height: 70px;
        margin: 10px 10px;
    }
}
</style>