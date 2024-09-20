<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn"

import Layout from "@/layout/index.vue";

</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <Layout />
  </ElConfigProvider>
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  @apply overflow-hidden h-full;
}
body {
  @apply text-white bg-gray-100;
  font-family: HarmonyOS Sans SC;
  
}

#app {
  @apply h-full;
}

.can-edit {
    position: relative;
    cursor: pointer;
    &:hover:after {
      content: "";
      position: absolute;
      inset: 0;
      border: 2px solid #43cf7c;
    }
  }
</style>
