<template>
    <div class="nav-list">
        <el-tabs v-model="activeTab" type="card" editable class="flex-1" @edit="handleTabsEdit"
            style="min-width: 100px;">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
            </el-tab-pane>
        </el-tabs>
        <span class="nav-dropdown-btn">
            <el-dropdown @command="handleCommand">
                <span class="dropdown-link">
                    <el-icon>
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="clear">全部清除</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>

    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import store from '../../store';

const route = useRoute()
const activeTab = ref(route.path)
const editableTabs = ref([
    {
        title: '主控台',
        path: '/',
    }
])

onBeforeMount(() => {
    const localTabs = localStorage.getItem("editableTabs")
    if (localTabs){
        editableTabs.value = JSON.parse(localTabs)
    }
})

function addTab(tab) {
    let noTab = editableTabs.value.findIndex(t => t.path == tab.path) == -1
    if (noTab) {
        editableTabs.value.push(tab)
    }
    localStorage.setItem("editableTabs", JSON.stringify(editableTabs.value))
}

onBeforeRouteUpdate((to, from) => {
    addTab({
        title: to.meta.title,
        path: to.path
    })
})

const handleTabsEdit = () => {

}

const handleCommand = (command) => {
    switch (command) {
        case "clear":
            editableTabs.value = editableTabs.value.filter(tab => tab.path == "/");
    }
}
</script>

<style scoped>
.nav-list {
    --el-main-padding: 10px;
    display: flex;
    flex: none;
    flex-basis: auto;
    overflow: auto;
    padding: var(--el-main-padding);
    background-color: white;
    margin: 10px 10px;
    border-radius: 5px;
}

.nav-dropdown-btn {
    min-width: 35px;
    min-height: 35px;
    border-radius: 5px;
    margin-bottom: 5px;
    @apply bg-indigo-200 ml-auto flex items-center justify-center
}

.el-icon {
    color: black;
}

:deep(.is-disabled) {
    cursor: not-allowed;
    @apply text-gray-300
}

:deep(.el-tabs__header) {
    border: 0 !important;
    @apply bg-white mb-0
}

:deep(.el-tabs__new-tab) {
    display: none;
}

:deep(.el-tabs__nav) {
    border: 0 !important;
}

:deep(.el-tabs__item) {
    border-radius: 5px;
    @apply bg-indigo-100 mx-1
}
</style>