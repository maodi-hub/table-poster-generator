<template>
  <div :class="['flex-1 flex flex-col min-w-0 text-xs', direction, { separate }]">
    <template v-for="(item, idx) in groupData" :key="item">
      <span class="text-center px-1" :style="item.style">{{ item.value }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import type { ValueType, GroupTextProps } from "./type";

const $props = withDefaults(defineProps<GroupTextProps<ValueType>>(), {
  direction: "vertical"
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

<style scoped lang="scss">
.vertical {
  @apply flex-col;
}

.horizontal {
  @apply flex-row;
}

.normal {
  @apply block text-center;
}

.separate {
  @apply block text-center #{!important};
  span {
    @apply border-r border-black break-all;
    &:last-child {
      @apply border-r-0;
    }
  }
}
</style>
