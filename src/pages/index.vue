<template>
    <div class="mx-5">
        <el-row :gutter="20">
            <el-col v-if="panels.length == 0" :span="6" v-for="i in 4" :key="i">
                <el-skeleton style="width: 100%">
                    <template #template>
                        <el-card shadow="hover" class="border-0">
                            <template #header>
                                <div class="flex justify-between">
                                    <el-skeleton-item variant="text" style="width: 50%" />
                                    <el-skeleton-item variant="text" style="width: 10%" />
                                </div>
                            </template>
                            <el-skeleton-item variant="text" style="width: 30%" />
                            <el-divider />
                            <div class="flex justify-between">
                                <el-skeleton-item variant="text" style="width: 50%" />
                                <el-skeleton-item variant="text" style="width: 10%" />
                            </div>
                        </el-card>
                    </template>
                </el-skeleton>
            </el-col>
            <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
                <el-card shadow="hover" class="border-0">
                    <template #header>
                        <div class="flex justify-between">
                            <span class="text-sm">{{ item.title }}</span>
                            <el-tag :type="item.unitColor" effect="plain">
                                {{ item.unit }}
                            </el-tag>
                        </div>
                    </template>
                    <span class="text-3xl font-bold text-gray-500">
                        <CountTo :value="item.value"></CountTo>
                    </span>
                    <el-divider />
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <indexNav></indexNav>
        <el-row :gutter="20">
            <el-col :span="12" :offset="0">
                <IndexChart></IndexChart>
            </el-col>
            <el-col :span="12" :offset="0">
                <IndexTip :goods=goods :order=order></IndexTip>
            </el-col>
        </el-row>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { getstatistics1, getstatistics2 } from '../api';
import CountTo from '../components/countTo.vue';
import indexNav from '../components/indexNav.vue';
import IndexChart from '../components/indexChart.vue';
import IndexTip from '../components/IndexTip.vue';
const panels = ref([])
getstatistics1().then(res => {
    panels.value = res.panels
})

const goods = ref([])
const order = ref([])
getstatistics2().then(res => {
    goods.value = res.goods
    order.value = res.order
})
</script>
