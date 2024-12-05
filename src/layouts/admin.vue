<template>
  <div class="common-layout">
    <el-container>
      <f-menu></f-menu>
      <el-container>
        <f-header></f-header>
        <f-main></f-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FMain from './components/FTagList.vue';
</script>
