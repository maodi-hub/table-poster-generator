<template>
  <div :class="['flex-1 flex flex-col min-w-0 text-xs', direction, { separate, card}]" :style="{ '--bg-color': card ? cardBgColor : 'transparent'  }">
    <template v-for="(item, idx) in groupData" :key="item">
      <span class="text-center px-1 whitespace-nowrap" :style="item.style">{{ item.value }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from "vue";
import type { ValueType, GroupTextProps } from "./type";

const $props = withDefaults(defineProps<GroupTextProps<ValueType>>(), {
  direction: "vertical",
  cardBgColor: "#fff"
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

.card {
  --bg-color: transparent;
  @apply rounded p-2.5 h-full justify-center;
  background-color: var(--bg-color);
}

.separate {
  @apply text-center #{!important};
  span {
    @apply inline-block border-black;
    border-right-width: 1.5px;
    line-height: 1em;
    &:last-child {
      @apply border-r-0;
    }
  }
}
</style>
