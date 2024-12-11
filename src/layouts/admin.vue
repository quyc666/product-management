<template>
  <div class="layout">
    <el-container>
      <f-menu></f-menu>
      <el-container class="flex flex-col bg-white">
        <f-header></f-header>
          <f-main></f-main>
          <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FMain from './components/FTagList.vue';
</script>


<style></style>
