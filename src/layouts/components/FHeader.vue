<template>
    <el-header>
        <el-icon class="icon-btn" @click="operatAsideMenu" v-show="!$store.state.asideMenuIsColse">
            <Fold />
        </el-icon>
        <el-icon class="icon-btn" @click="operatAsideMenu" v-show="$store.state.asideMenuIsColse">
            <Expand />
        </el-icon>
        <div class="header-right">
            <el-dropdown @command="handleCommand" class="dropdown">
                <span class="dropdown-link">
                    <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="a">修改用户信息</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { showModal, toast} from '../../composable/util';
import { logout } from '../../api/manager';
import store from '../../store';

const router = useRouter();

const handleCommand = (command) => {
    switch (command) {
        case "logout":
            handleLogout()
    }
}

// 退出登录
const handleLogout = () => {
    showModal("是否要退出登录?").then(res => {
        logout().finally(() => {
            store.dispatch("logout")
            // 跳转回登录页面
            router.push("/login")
            // 弹出提示
            toast("退出登录成功")
        })
    })
}

const operatAsideMenu = () => {
    store.commit("SET_ASIDEMENU_ISCOLSE")
}
</script>

<style>
.el-header {
    @apply flex items-center bg-indigo-200 text-white;
    height: 64px;
}

.header-right {
    @apply ml-auto
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 44px;
    cursor: pointer;
    margin-left: -10px;
}

.icon-btn:hover {
    @apply bg-indigo-400
}

.el-header .dropdown {
    height: 44px;
    cursor: pointer;
    @apply flex justify-center items-center text-white mx-5;

}

.dropdown-link {
    @apply flex items-center text-black
}

.dropdown-link:focus {
    outline: none;
}
</style>