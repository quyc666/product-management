<template>
    <div>
        后台首页
        <el-button @click="loginPage">登录</el-button>
        {{ $store.state.user}}
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useCookies } from 'vue3-cookies';

const router = useRouter();
const { cookies } = useCookies();

const loginPage = ()=>{
    cookies.remove("token");
    router.push("/login");
}

</script>

<style lang="css">
</style>