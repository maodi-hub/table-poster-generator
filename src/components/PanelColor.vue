<template>
  <div class="flex-1 flex flex-col gap-2 min-w-0">
    <el-input v-model="value" />

    <div class="flex gap-2">
      <ElColorPicker v-model="value" size="small" :teleported="toBody"/>

      <template v-for="item in DEFAULT_COLORS" :key="item">
        <span
          :style="{ backgroundColor: item }"
          class="size-6 cursor-pointer"
          @click="value = item"
        ></span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElColorPicker, ElInput } from "element-plus";

import { computed } from "vue";

import { DEFAULT_COLORS } from "./constants";

interface Props {
  modelValue?: string;
  toBody?: boolean
}

interface Emits {
  (e: "update:modelValue", value: Props["modelValue"]): void;
}

const $props = withDefaults(defineProps<Props>(), {
  toBody: true
});
const $emit = defineEmits<Emits>();

const value = computed({
  get() {
    return $props.modelValue;
  },
  set(val) {
    $emit("update:modelValue", val);
  },
});
</script>

<style scoped></style>
