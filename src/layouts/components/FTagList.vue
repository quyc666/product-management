<template>
    <el-main>
        <el-tabs v-model="editableTabsValue" type="card" editable class="demo-tabs bg-slate-50" @edit="handleTabsEdit">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            </el-tab-pane>
        </el-tabs>
        <el-dropdown class="ml-auto">
            <span class="dropdown-link">
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </el-main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabPaneName } from 'element-plus'

let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
    {
        title: 'Tab 1',
        name: '1',
    },
    {
        title: 'Tab 2',
        name: '2',
    },
])

const handleTabsEdit = () => {

}
</script>

<style scoped>
.el-main {
    --el-main-padding: 10px;
    display: flex;
    flex: none;
    flex-basis: auto;
    overflow: auto;
    padding: var(--el-main-padding);
    background-color: rgba(229, 232, 249, 0.904);
    margin: 10px 10px;
    border-radius: 5px;
}

.dropdown-link:focus{
    outline: none;
}
</style>