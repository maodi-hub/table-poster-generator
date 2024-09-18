<template>
  <el-input v-model="value.value">
    <template v-if="$slots.prefix" #prefix>
      <slot name="prefix" />
    </template>
    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template #suffix>
      <el-popover placement="bottom-end" :width="300" trigger="click">
        <template #reference>
          <el-button text link :icon="Setting"/>
        </template>
        <el-form :model="value.style" labelPosition="top">
          <el-form-item label="背景色">
            <ColorPicker
              v-model="value.style!.backgroundColor"
              :toBody="false"
            />
          </el-form-item>
          <ElDivider />
          <el-form-item label="字体颜色">
            <ColorPicker v-model="value.style!.color" :toBody="false" />
          </el-form-item>
          <ElDivider />
          <el-form-item label="字体大小">
            <el-input v-model="value.style!.fontSize" />
          </el-form-item>
          <el-form-item label="字体加粗">
            <el-input v-model="value.style!.fontWeight" />
          </el-form-item>
        </el-form>
      </el-popover>
    </template>
  </el-input>
</template>

<script setup lang="ts">
import {
  ElInput,
  ElPopover,
  ElForm,
  ElFormItem,
  ElDivider,
  ElButton
} from "element-plus";
import { Setting } from "@element-plus/icons-vue";
import ColorPicker from "./Color.vue";


import type { ValueType } from "./type";

import { computed } from "vue";

interface Props {
  modelValue: ValueType;
}

interface Emit {
  (e: "update:modelValue", val: ValueType): void;
  (e: "change", val: ValueType): void;

}

const $props = defineProps<Props>();
const $emit = defineEmits<Emit>();

const value = computed({
  get() {
    return $props.modelValue;
  },
  set(val) {
    $emit("change", val);
    $emit("update:modelValue", val);
  },
});
</script>

<style scoped></style>
