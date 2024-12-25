<template>
    <div class="flex flex-col">
        <el-card shadow="never">
            <template #header>
                <div class="flex justify-between">
                    <span class="text-sm">店铺及商品提示</span>
                    <el-tag :type="'danger'" effect="plain">
                        店铺及商品提示
                    </el-tag>
                </div>
            </template>
            <el-row :gutter="20">
                <el-col :span="6" v-for="(good, index) in goods" :key="index">
                    <el-card shadow="hover" class="bg-slate-50">
                        <div class="flex flex-col items-center justify-center">
                            <span class="my-2 text-xl">{{ good.value }}</span>
                            <span class="my-2">{{ good.label }}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
        <el-card shadow="never">
            <template #header>
                <div class="flex justify-between">
                    <span class="text-sm">交易提示</span>
                    <el-tag :type="'danger'" effect="plain">
                        需要立即处理的交易订单
                    </el-tag>
                </div>
            </template>
            <el-row :gutter="20">
                <el-col :span="6" v-for="(o, index) in order" :key="index">
                    <el-card shadow="hover" class="bg-slate-50">
                        <div class="flex flex-col items-center justify-center">
                            <span class="my-2 text-xl">{{ o.value }}</span>
                            <span class="my-2">{{ o.label }}</span>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>

</template>

<script setup>
defineProps({
    goods: {
        type: Array,
        default: []
    },
    order: {
        type: Array,
        default: []
    }
})
</script>