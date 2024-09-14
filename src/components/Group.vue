<template>
  <div
    :class="[
      'flex flex-1 min-w-0 text-white text-xs group flex-wrap',
      {
        vertical: direction === 'vertical',
        horintal: direction === 'horizontal',
      },
    ]"
  >
    <template v-for="(item, idx) in groupData" :key="item">
      <span
        :class="[
          'min-w-0 whitespace-nowrap flex flex-1 justify-center items-center group-[.vertical]:min-h-[38px] py-1 px-2',
          {
            'group-[.horintal]:rounded-l-md group-[.vertical]:rounded-t-md':
              idx === 0,
            'group-[.horintal]:rounded-r-md group-[.vertical]:rounded-b-md':
              idx === groupData.length - 1,
          },
        ]"
        :style="{
          backgroundColor:
            colors[idx] ?? DEFAULT_COLORS[idx % DEFAULT_COLORS.length],
          ...item.style,
        }"
      >
        {{ item.value }}
      </span>
    </template>
  </div>
</template>

<script setup lang="ts" generic="T">
import { reactive, watch } from "vue";
import type { GroupProps, ValueType } from "./type";

import { DEFAULT_COLORS } from "../constants";

const $props = withDefaults(defineProps<GroupProps<T>>(), {
  direction: "horizontal",
  colors: () => [],
});

const groupData = reactive($props.data[$props.valueKey] as ValueType[]);

watch(
  () => $props.data[$props.valueKey],
  () => {
    groupData.length = 0;
    groupData.push(...($props.data?.[$props.valueKey] as ValueType[]));
  }
);
</script>

<style lang="scss">
.vertical {
  @apply flex-col;
}
</style>
