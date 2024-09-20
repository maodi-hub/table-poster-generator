<template>
  <main class="flex-1 flex min-w-0 pt-4">
    <el-scrollbar
      class="flex-1 min-w-0"
      view-class="flex items-start min-h-full"
      view-style="justify-content: safe center"
    >
      <slot />
    </el-scrollbar>
  </main>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
</script>

<style scoped lang="scss"></style>
