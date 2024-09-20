<template>
  <div class="h-[62px] leading-[62px] can-edit text-center">
    <span class="rounded-lg min-w-[38px] px-2.5 h-5 inline-flex justify-center items-center align-middle mr-1" :style="iconBgStyle"><img :src="icon" alt="" class="h-[14px]"></span><span class="text-xs leading-[18px]">{{ copyright }}</span>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

interface Props {
  icon: string;
  copyright: string;
  iconBgStyle: CSSProperties;
}
defineProps<Props>()
</script>

<style scoped>

</style>