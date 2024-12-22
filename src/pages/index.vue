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
                    <span class="text-3xl font-bold text-gray-500">{{ item.value }}</span>
                    <el-divider />
                    <div class="flex justify-between text-sm text-gray-500">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { getstatistics1 } from '../api';
const panels = ref([])
getstatistics1().then(res => {
    panels.value = res.panels
    console.log(panels)
})
</script>

<style lang="css"></style>