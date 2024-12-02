<template>
  <div class="common-layout">
    <el-container class="flex">
      <el-container class="flex flex-col h-screen">
        <f-menu class="h-screen"></f-menu>
      </el-container>
      <el-container class="flex flex-col h-screen">
        <f-header class="w-screen"></f-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/Fmenu.vue';
</script>
