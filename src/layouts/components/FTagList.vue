<template>
    <div class="nav-list">
        <el-tabs v-model="activeTab" type="card" class="flex-1" @tab-change="tabChange" @tab-remove="tabRemove"
            style="min-width: 100px;">
            <el-tab-pane :closable="item.path != '/'" v-for="item in editableTabs" :key="item.path" :label="item.title"
                :name="item.path">
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
                        <el-dropdown-item command="clearother">关闭其它</el-dropdown-item>
                        <el-dropdown-item command="clearall">全部关闭</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>

    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { router } from '../../router';

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
    if (localTabs) {
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
    activeTab.value = to.path
    addTab({
        title: to.meta.title,
        path: to.path
    })
})

const tabChange = ((t) => {
    activeTab.value = t
    router.push(t)
})

const tabRemove = ((t) => {
    let tabs = editableTabs.value
    let a = activeTab.value
    // 如果删除的是当前激活的,转移激活状态
    if (t == a) {
        tabs.forEach((tab, index) => {
            if (t == tab.path) {
                const nextTab = tabs[index+1] || tabs[index-1]
                if (nextTab){
                    a = nextTab.path
                }
            }
        });
    }
    activeTab.value = a
    editableTabs.value = editableTabs.value.filter(tab => tab.path == "/" || tab.path != t);
    localStorage.setItem("editableTabs", JSON.stringify(editableTabs.value))
    router.push(a)
})

const handleCommand = (command) => {
    switch (command) {
        case "clearall":
            editableTabs.value = editableTabs.value.filter(tab => tab.path == "/");
            localStorage.removeItem("editableTabs")
        case "clearother":
            editableTabs.value = editableTabs.value.filter(tab => tab.path == activeTab.value || tab.path == "/");
            localStorage.setItem("editableTabs", JSON.stringify(editableTabs.value))
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
    @apply bg-gray-100 mb-0
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