<template>
  <VueDraggable
    :animation="150"
    v-model="layout"
    handle=".handle"
    draggable=".cursor-move"
    :class="['flex gap-2', config.direction]"
    @update="$emit('update', {sortEvent: $event, type: direction})"
  >
    <template v-for="(item, idx) in layout" :key="item[config.indexKey]">
      <div
        class="handle flex cursor-move border bg-white border-gray-700 rounded-md box-border justify-center items-center relative"
        v-show="direction === 'vertical' ? idx != 0 : true"
        :style="config.size"
      >
        {{ item[config.indexKey] }}
        <el-button
          text
          link
          :icon="Minus"
          class="absolute after:[content-''] after:absolute after:inset-0 after:scale-150"
          :style="config.minusBtnStyle"
          @click="$emit('del', { type: direction, idx })"
        />
      </div>
    </template>
    <div
      class="flex border bg-white cursor-pointer border-gray-700 rounded-md box-border justify-center items-center"
      :style="config.size"
      @click="$emit('add', direction)"
    >
      <el-button text link :icon="Plus" />
    </div>
  </VueDraggable>
</template>

<script setup lang="ts">
import { VueDraggable, type SortableEvent
 } from "vue-draggable-plus";
import { ElButton } from "element-plus";
import { Plus, Minus } from "@element-plus/icons-vue";

import { computed } from "vue";

export interface Props {
  direction: "horizontal" | "vertical";
  data: any[];
}
interface Emit {
  (e: "update:data", value: Props["data"]): void;
  (e: "add", type: Props["direction"]): void;
  (e: "del", val: { type: Props["direction"]; idx: number }): void;
  (e: "update", val: {sortEvent:SortableEvent, type: Props["direction"]}):void;
}

const $props = defineProps<Props>();
const $emit = defineEmits<Emit>();

const config = computed(() => {
  const isVertical = $props.direction === "vertical";
  return {
    direction: isVertical ? "flex-row" : "flex-col",
    itemName: isVertical ? "列" : "行",
    size: isVertical
      ? "width: 30px;min-height: 150px;"
      : "height: 30px;min-width: 150px;",
    indexKey: isVertical ? "dataIndex" : "label",
    minusBtnStyle: isVertical
      ? "bottom:8px;left:50%;transform:translateX(-50%)"
      : "right:8px;top:50%;transform:translateY(-50%)",
  };
});

const layout = computed({
  get() {
    return $props.data;
  },
  set(val) {
    $emit("update:data", val);
  },
});

</script>

<style scoped></style>
