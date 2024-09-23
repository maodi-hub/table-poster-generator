<template>
  <div :class="['flex-1 flex flex-col min-w-0 text-xs', direction, { separate }]">
    <template v-for="(item, idx) in groupData" :key="item">
      <span v-if="!card" :class="['text-center px-1 whitespace-nowrap', { 'storke': direction === 'normal' && (getColor(item?.style?.color) >= '#fafafa') }]" :style="item.style">{{ item.value }}</span>
      <div v-else class="card flex-1 flex flex-col justify-center" :style="{...item.style,'--bg-color': card ? cardBgColor : 'transparent'}" v-html="item.value"></div>
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

const getColor = (color?: string) => {
  if (!color) return "";
  return color.toLocaleLowerCase();
};

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
  line-height: 1
}

.horizontal {
  @apply flex-row;
}

.normal {
  @apply block text-center;
}

.card {
  --bg-color: transparent;
  @apply rounded items-center ;
  background-color: var(--bg-color);
  min-height: 42px;
  &+& {
    margin-top: 10px;
  }
  & > * {
    line-height: 1em;
  } 
}

.separate {
  @apply text-center #{!important};
  line-height: 1em;
  span {
    @apply inline-block border-black;
    border-right-width: 1.5px;
    &:last-child {
      @apply border-r-0;
    }
  }
}

.storke {
  -webkit-text-stroke: 0.05px #000;
}
</style>
