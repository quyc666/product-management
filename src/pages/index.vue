<template>
    <div>
        后台首页
        <el-button @click="handleLogout">退出登录</el-button>
        {{ $store.state.user.username}}
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { showModal, toast } from '../composable/util';
import { logout } from '../api/manager';
import store from '../store';

const router = useRouter();

const handleLogout = ()=>{
    showModal("是否要退出登录?").then(res=>{
        logout().finally(()=>{
            store.dispatch("logout")
            // 跳转回登录页面
            router.push("/login")
            // 弹出提示
            toast("退出登录成功")
        })
    })
}

</script>

<style lang="css">
</style>