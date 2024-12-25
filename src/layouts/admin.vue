<template>
  <div class="layout">
    <el-container>
      <f-menu></f-menu>
      <el-container class="layout-right">
        <f-header></f-header>
        <f-main></f-main>
        <router-view v-slot="{ Component }" class="overflow-auto">
          <transition name="fade">
            <keep-alive :max="10">
              <component :is="Component"></component>
            </keep-alive>
          </transition>
        </router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FMain from './components/FTagList.vue';
</script>


<style>
.layout-right {
  height: 100vh;
  @apply flex flex-col bg-gray-100;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-from-active {
  transition: all 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}
</style>
