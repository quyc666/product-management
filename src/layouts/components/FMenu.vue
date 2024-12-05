<template>
    <el-aside>
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
            @close="handleClose">
            <a>
                <img>
                <h1>艺术藏品</h1>
            </a>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <home-filled></home-filled>
                    </el-icon>
                    <span>后台面板</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <template #title>商品管理</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <el-icon>
                    <document />
                </el-icon>
                <template #title>用户管理</template>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>订单管理</template>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script setup>
import { ref } from 'vue'
import { HomeFilled } from '@element-plus/icons-vue';

const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>

<style>
.el-aside:not(.el-menu--collapse) {
    width: 250px;
    height: 100vh;
    background-color: #eee;
}

.el-menu {
    background-color: #eee;
}
</style>