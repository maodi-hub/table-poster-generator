<template>
  <div
    id="container"
    class=" bg-[url('@/assets/bg.png')] bg-cover bg-center bg-no-repeat bg-[#0E0E0E] flex-shrink-0"
    :style="{ width: width + 'px', height: height + 'px' }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  width: number;
  height: number
}
defineProps<Props>();
</script>

<style scoped></style>
