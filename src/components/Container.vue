<template>
  <div id="container"
    class="h-screen bg-[url('@/assets/bg.png')] bg-cover bg-center bg-no-repeat bg-[#0E0E0E] mx-auto max-w-full"
    :style="{ width: width + 'px' }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed, watch } from "vue";

import { CONTAINER_WIDTH_KEY, CONTAINER_SET_WIDTH_KEY } from "../constants";

interface Props {
  width: number;
}

const $props = defineProps<Props>();

const width = ref($props.width);

const handleSetWidth = (payload: number) => {
  width.value = payload;
};

provide(
  CONTAINER_WIDTH_KEY,
  computed(() => width.value)
);
provide(CONTAINER_SET_WIDTH_KEY, handleSetWidth);

watch(
  () => $props.width,
  (w) => {
    handleSetWidth(w);
  }
);
</script>

<style scoped></style>
