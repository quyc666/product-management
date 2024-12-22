<template>
    <el-row :gutter="20" class="my-5">
        <el-col :span="3" :offset="0" v-for="(item, index) in iconNavs" :key="index">
            <el-card shadow="hover" @click="$router.push(item.path)" class="cursor-pointer">
                <div class="flex flex-col items-center justify-center">
                    <el-icon :class="item.color" size="20">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span class="mt-3 text-sm">{{ item.title }}</span>
                </div>
            </el-card>
        </el-col>
    </el-row>

</template>


<script setup>
const iconNavs = [
    {
        icon: "user",
        color: "text-blue-500",
        title: "用户",
        path: "/user/list"
    },
    {
        icon: "shopping-cart",
        color: "text-violet-500",
        title: "商品",
        path: "/goods/list"
    },
    {
        icon: "tickets",
        color: "text-fuchsia-500",
        title: "订单",
        path: "/order/list"
    },
    {
        icon: "ChatLineSquare",
        color: "text-emerald-500",
        title: "评价",
        path: "/assess/list"
    },
    {
        icon: "PictureFilled",
        color: "text-rose-500",
        title: "图库",
        path: "/image/list"
    },
    {
        icon: "bell",
        color: "text-green-500",
        title: "公告",
        path: "/notice/list"
    },
    {
        icon: "set-up",
        color: "text-light-grey-500",
        title: "配置",
        path: "/setting/list"
    },
    {
        icon: "files",
        color: "text-yellow-500",
        title: "优惠券",
        path: "/coupon/list"
    },
]
</script>
