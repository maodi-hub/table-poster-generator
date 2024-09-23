<template>
  <div>
    <div
      class="wrapper rounded-lg overflow-hidden bg-[#ffffff05] backdrop-blur"
    >
      <template v-for="(row, rowIdx) in rows" :key="row">
        <div :class="['row flex', { 'bg-[#ffffff0d]': rowIdx % 2 === 1 }]" :style="row.style">
          <template v-for="(col, colIdx) in columns" :key="col">
            <div
              :class="[
                'col relative',
                {
                  'flex-1 min-w-0 overflow-hidden': colIdx >= 1,
                  'bg-white': colIdx > 0,
                  'rounded-tl-lg': rowIdx === 0 && colIdx === 1,
                  'rounded-bl-lg': rowIdx === rows.length - 1 && colIdx === 1,
                  'has-before-mask': colIdx > 0 && rowIdx % 2 === 1,
                  'has-after-mask': colIdx > 0 && colIdx % 2 === 1,
                },
              ]"
              :style="{ width: col.width }"
            >
              <div
                ref="cellRef"
                :class="[
                  'cell h-full w-full flex justify-center items-center py-2.5 px-2 absolute top-0 right-0 bottom-0 left-0 z-10 can-edit',
                  {
                    'cell-header': colIdx === 0,
                  },
                ]"
                :data-rowIdx="rowIdx"
                :data-colIdx="colIdx"
                :style="getCellStyle(row, colIdx)"
                @click="$emit('open', row, col, rowIdx, colIdx)"
              >
                <template v-if="colIdx !== 0">
                  <template
                    v-if="
                      row.renderTypeAsKey &&
                      (!row.renderTypeAsKey.length ||
                        row.renderTypeAsKey.includes(col.dataIndex))
                    "
                  >
                    <component
                      :is="component[row.type || 'text']"
                      :data="row.data"
                      :value-key="col.dataIndex"
                      v-bind="row.props"
                    />
                  </template>
                  <template v-else>
                    <component
                      :is="component.text"
                      :data="row.data"
                      :value-key="col.dataIndex"
                      v-bind="row.props"
                    />
                  </template>
                </template>
                <template v-else>
                  <img v-if="row.icon" :src="row.icon" alt="" class="mr-2.5 flex-shrink-0 flex-grow-0 w-4 h-[unset]"/>
                  <component
                    :is="component.text"
                    :data="row"
                    value-key="label"
                    v-bind="row.props"
                  />
                </template>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends DataType">
import type { DataType, TableProps, TableEmit } from "./type";

import {
  defineAsyncComponent,
  type Component,
} from "vue";

withDefaults(defineProps<TableProps<T>>(), {
  columns: () => [],
  rows: () => [],
});

defineEmits<TableEmit<T>>();

const component: Record<"img" | "group" | "group-text" | "text", Component> = {
  img: defineAsyncComponent(() => import("./Image.vue")),
  group: defineAsyncComponent(() => import("./Group.vue")),
  "group-text": defineAsyncComponent(() => import("./GroupText.vue")),
  text: defineAsyncComponent(() => import("./Text.vue")),
};


const getCellStyle = (row: TableProps<T>["rows"][number], colIdx: number) => {
  if (!row.cellStyles) {
    row.cellStyles = [];
  }
  let style = row.cellStyles[colIdx];
  if (!style) {
    style = row.cellStyles[colIdx] = {};
  }
  return style;
};

</script>

<style scoped lang="scss">
.col {
  &::after,
  &::before {
    content: none;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    background-color: #0000000d;
    pointer-events: none;
  }

  &.has-after-mask::after {
    content: "";
  }

  &.has-before-mask::before {
    content: "";
  }
}
.cell {
  position: relative;
  border: none;
  align-items: center;

  &.cell-header {
    @apply text-xs px-6 justify-start;
  }

  &:not(.cell-header) {
    @apply text-sm font-bold text-black flex-shrink-0;
  }
}
</style>
