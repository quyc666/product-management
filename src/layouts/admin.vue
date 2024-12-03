<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="250px">
        <f-menu></f-menu>
      </el-aside>
      <el-container>
        <el-header>
          <f-header></f-header>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/Fmenu.vue';
</script>
