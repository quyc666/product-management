<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="login-left">
            <div>
                <div class="text-top">数字藏品</div>
                <div class="text-down">艺术，创造无限可能</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="login-right">
            <h2 class="login-right-title">登录</h2>
            <div class="login-right-content">
                <span class="login-right-line"></span>
                <span>账号密码登录</span>
                <span class="login-right-line"></span>
            </div>
            <el-form ref="loginFormRef" :rules="rules" :model="loginForm" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" show-password placeholder="请输入密码">
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="flex justify-between">
                    <el-form-item>
                        <el-button color="#8b5cf6" class="w-[100px] h-[40px]" type="primary" @click="onSubmit">
                            注册
                        </el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button color="#8b5cf6" class="w-[100px] h-[40px]" type="primary" @click="onSubmit">
                            登录
                        </el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
    </el-row>
</template>


<script setup>
import { reactive, ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { login } from '~/api/manager'
import { ElNotification } from 'element-plus'

const router = useRouter();
const loginForm = reactive({
    username: '',
    password: ''
})

const rules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
        },
    ],
    password: [
        {

            required: true,
            message: '密码不能为空',
            trigger: 'blur'
        }
    ]
}

const loginFormRef = ref(null);

const onSubmit = () => {
    loginFormRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        login(loginForm.username, loginForm.password)
            .then(res => {
                console.log("success:", res.data.data)
                // 提示成功
                ElNotification({
                    message: '登录成功',
                    type: 'success',
                    duration: 3000,
                })
                // 存储token和用户信息
                // 跳转到后台页面
                router.push('/')
            }
            )
            .catch(err => {
                ElNotification({
                    message: err.response.data.msg || "请求失败",
                    type: 'error',
                    duration: 3000
                })
            }
            )
        console.log("验证通过")
    })
}

</script>


<style lang="css">
.login-container {
    @apply min-h-screen bg-violet-500
}

.login-container .login-left, .login-container .login-right {
    @apply flex justify-center items-center
}

.login-right {
    @apply bg-slate-50 flex-col
}

.login-left .text-top {
    @apply font-extrabold tracking-widest text-5xl text-neutral-50 mb-4
}

.login-left .text-down {
    @apply tracking-widest text-3xl text-neutral-50
}

.login-right-title {
    @apply font-bold text-4xl text-gray-800
}

.login-right-content {
    @apply flex items-center justify-center my-5 text-gray-400 space-x-2
}

.login-right-line {
    @apply h-[1px] w-16 bg-gray-300
}
</style>
