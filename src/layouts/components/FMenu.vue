<template>
    <el-aside>
        <el-menu :default-active="defaultActive" class="border-0" unique-opened :collapse="$store.state.asideMenuIsColse" router>
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
                    <el-menu-item v-for="(item2, index2) in item.child" :key="index2" :index="item2.frontpath">
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
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import store from '../../store';

const route = useRoute()
const defaultActive = ref(route.path)

const asideMenus = computed(()=>store.state.menus);
</script>

<style>
.el-aside {
    width: auto;
    height: 100vh;
    display: flex;
    /* @apply shadow-md fixed bg-indigo-300 border-x-2; */
}

.el-menu {
    background-color: #bdc6f1;
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