<template>
    <div>
        后台首页
        <el-button @click="loginPage">登录</el-button>
        {{ $store.state.user}}
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { removeToken } from '../composable/auth';

const router = useRouter();

const loginPage = ()=>{
    removeToken()
    router.push("/login");
}

</script>

<style lang="css">
</style>