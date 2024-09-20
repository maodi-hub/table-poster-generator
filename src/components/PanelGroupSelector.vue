<template>
  <VueDraggable
    ref="el"
    v-model="value"
    :animation="150"
    handle=".handle"
    class="flex flex-col gap-2"
    draggable=".move"
  >
    <template v-for="(item, idx) in value" :key="item">
      <TextInput :model-value="item" class="move">
        <template #prefix>
          <ElIcon class="handle cursor-move"><Rank /></ElIcon>
        </template>
        <template #append>
          <el-button type="danger" :icon="Minus" @click="handleClose(idx)" />
        </template>
      </TextInput>
    </template>
    <ElButton :icon="Plus" class="w-full" @click="handleAdd">新增</ElButton>
  </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import { ElIcon, ElButton } from "element-plus";
import { Rank, Minus, Plus } from "@element-plus/icons-vue";
import TextInput from "./PanelTextInput.vue";

import type { ValueType } from "./type";

import { computed } from "vue";

import { DEFAULT_COLORS } from "./constants";

interface Props {
  modelValue?: ValueType[];
}
interface Emits {
  (e: "update:modelValue", value: Props["modelValue"]): void;
}
const $props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
});

const $emit = defineEmits<Emits>();

const value = computed({
  get() {
    return $props.modelValue;
  },
  set(val) {
    return $emit("update:modelValue", val);
  },
});

const handleAdd = () => {
  value.value.push({
    value: "默认",
    style: {
      backgroundColor: DEFAULT_COLORS[0],
      color: "#fff",
      fontSize: "12",
    },
  });
};

const handleClose = (idx: number) => {
  value.value.splice(idx, 1);
};
</script>

<style scoped lang="scss"></style>
