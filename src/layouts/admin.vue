<template>
  <div class="layout">
    <el-container>
      <f-menu></f-menu>
      <el-container class="flex-col">
        <f-header></f-header>
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


<style>
</style>
