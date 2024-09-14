<template>
  <div>
    <div
      class="wrapper rounded-lg overflow-hidden bg-[#ffffff05] backdrop-blur"
    >
      <template v-for="(row, rowIdx) in rows" :key="row">
        <div :class="['row flex', { 'bg-[#ffffff0d]': rowIdx % 2 === 1 }]">
          <template v-for="(col, colIdx) in columns" :key="col">
            <div
              :class="[
                'col flex',
                {
                  'flex-1 min-w-0 overflow-hidden': colIdx >= 1,
                  'bg-white': colIdx > 0,
                  'rounded-tl-lg': rowIdx === 0 && colIdx === 1,
                  'rounded-bl-lg': rowIdx === rows.length - 1 && colIdx === 1,
                },
              ]"
              :style="{ width: col.width }"
            >
              <div
                ref="cellRef"
                :class="[
                  'cell flex-1 min-w-0 flex justify-center items-center px-6 py-4',
                  {
                    'cell-header': colIdx === 0,
                    'has-before-mask': colIdx > 0 && rowIdx % 2 === 1,
                    'has-after-mask': colIdx > 0 && colIdx % 2 === 1,
                    'is-current':
                      anchorPostion.x === colIdx && anchorPostion.y === rowIdx,
                  },
                ]"
                :data-rowIdx="rowIdx"
                :data-colIdx="colIdx"
                :style="row.cellStyles![colIdx]"
                @click="handleOpen(row, col, rowIdx, colIdx)"
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

    <ope-drawer
      ref="opeDrawerRef"
      @cancel="handleSetPotion(void 0, void 0)"
      @add="onLayoutAdd"
      @del="onLayoutDel"
      @sort-update="onLayoutSort"
    />
    <AddTableRowModal ref="tableRowAddRef" @add="onLayoutSubmit" />
  </div>
</template>

<script setup lang="ts" generic="T extends DataType">
import OpeDrawer, { type LayoutProps } from "./OpeDrawer.vue";
import AddTableRowModal from "./AddTableRowModal.vue";
import type { SortableEvent } from "vue-draggable-plus";

import type { DataType, TableProps } from "./type";

import {
  defineAsyncComponent,
  reactive,
  type Component,
  shallowRef,
} from "vue";
import { useTableLayout } from "./hooks/useTableLayout";
import { ElMessage } from "element-plus";

const $props = withDefaults(defineProps<TableProps<T>>(), {
  columns: () => [],
  rows: () => [],
});

$props.rows.forEach(
  (row) =>
    (row.cellStyles = $props.columns.map(
      (_, idx) => row.cellStyles?.[idx] || {}
    ))
);

const component: Record<"img" | "group" | "group-text" | "text", Component> = {
  img: defineAsyncComponent(() => import("./Image.vue")),
  group: defineAsyncComponent(() => import("./Group.vue")),
  "group-text": defineAsyncComponent(() => import("./GroupText.vue")),
  text: defineAsyncComponent(() => import("./Text.vue")),
};

const { handleAddColumn, handleAddRow, handleDelColumn, handleDelRow } =
  useTableLayout($props.rows, $props.columns);

const onLayoutSubmit = ({
  type,
  value: label,
  ...props
}: {
  type: string;
  value: string;
  direction?: string;
}) => {
  handleAddRow(
    type as "img" | "group" | "text",
    label,
    $props.rows.length,
    props
  );
};

const tableRowAddRef = shallowRef<InstanceType<typeof AddTableRowModal>>();
const onLayoutAdd = (type: LayoutProps["direction"]) => {
  if (type === "vertical") {
    handleAddColumn($props.columns.length);
  }

  if (type === "horizontal") {
    tableRowAddRef.value?.handleOpen();
  }
};

const onLayoutDel = ({
  type,
  idx,
}: {
  type: LayoutProps["direction"];
  idx: number;
}) => {
  if (type === "vertical") {
    if ($props.columns.length <= 2) {
      ElMessage.warning("至少保留一列");
      return;
    }
    handleDelColumn(idx);
  }

  if (type === "horizontal") {
    if ($props.rows.length <= 2) {
      ElMessage.warning("至少保留一行");
      return;
    }
    handleDelRow(idx);
  }
};

const onLayoutSort = ({
  sortEvent,
  type,
}: {
  sortEvent: SortableEvent;
  type: LayoutProps["direction"];
}) => {
  if (type === "horizontal") return;

  const { oldIndex, newIndex } = sortEvent;
  if (oldIndex === newIndex) return;

  $props.rows.map((item) => {
    [item.cellStyles![newIndex!], item.cellStyles![oldIndex!]] = [
      item.cellStyles![oldIndex!],
      item.cellStyles![newIndex!],
    ];
  });
};

const anchorPostion = reactive<{
  x: number | undefined;
  y: number | undefined;
}>({
  x: void 0,
  y: void 0,
});

const handleSetPotion = (x?: number, y?: number) => {
  anchorPostion.x = x;
  anchorPostion.y = y;
};

const opeDrawerRef = shallowRef<InstanceType<typeof OpeDrawer>>();
const handleOpen = (
  row: TableProps<T>["rows"][number],
  column: TableProps<T>["columns"][number],
  rowIdx: number,
  colIdx: number
) => {
  if (colIdx > 0 && row.type === "img") {
    handleClose();
    return;
  }
  handleSetPotion(colIdx, rowIdx);
  opeDrawerRef.value?.handleShow(row, column, rowIdx, colIdx);
};

const handleClose = () => {
  opeDrawerRef.value?.handleClose();
};
</script>

<style scoped lang="scss">
.cell {
  position: relative;
  &.is-current {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      border: 2px solid #43cf7c;
    }
  }

  &.cell-header {
    @apply text-xs justify-start;
  }

  &:not(.cell-header) {
    @apply text-sm font-bold text-black p-3 flex-shrink-0;
  }

  &::after,
  &::before {
    content: none;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
</style>
