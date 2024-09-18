<template>
  <el-radio-group v-model="value">
    <el-radio v-for="item in options" :key="item.value" :value="item.value">
      {{ item.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadio } from "element-plus";

import { computed } from "vue";

interface Props {
  modelValue: any;
  options?: { label: string; value: string }[];
}

interface Emit {
  (e: "update:modelValue", value: Props["modelValue"]): void;
}
const $props = withDefaults(defineProps<Props>(), {
  options: () => [],
});
const $emit = defineEmits<Emit>();

const value = computed({
  get() {
    return $props.modelValue;
  },
  set(val) {
    return $emit("update:modelValue", val);
  },
});
</script>

<style scoped></style>
