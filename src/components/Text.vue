<template>
  <span :style="{...text?.style}">
    {{ text }}
  </span>
</template>

<script setup lang="ts" generic="T">
import { ref, watch } from "vue";
import type { TextProps, ValueType } from "./type";
import { isObject } from "radash";

const $props = defineProps<TextProps<T>>();

const getValue = () => {
  const value = $props.data[$props.valueKey];
  return isObject(value) ? (value as unknown as ValueType).value : value;
};

const text = ref(getValue());

watch(
  () => $props.data[$props.valueKey],
  () => {
    text.value = getValue();
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
</style>
