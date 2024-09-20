<template>
  <div class="h-full flex flex-col">
    <LayoutHeader />
    <section class="flex-1 min-h-0 flex transform">
      <Side @add="handleOpenPoster" @del="handleDelPoster" />
      <Main>
        <Transition mode="out-in" appear name="el-fade-in-linear">
          <Poster
            v-if="$poster.currentPosterId"
            :key="$poster.currentPosterId"
            @open="handleOpen"
            @header-click="handleOpenLayout"
          />
          <template v-else>
            <div class="flex-1 flex justify-center self-center items-center">
              <el-empty description="请选择或创建海报" />
            </div>
          </template>
        </Transition>
      </Main>
      <OpePanel ref="opePanelRef" @layout-change="handleOpenLayout" />
      <GlobalDrawer
        ref="layoutDrawerRef"
        v-if="!!$poster.currentPostInfo"
        @add="onLayoutAdd"
        @del="onLayoutDel"
        @sort-update="onLayoutSort"
      />
    </section>
  </div>
  <AddPosterModal ref="posterAddModalRef" @add="$poster.addPoster" />
  <AddTableRowModal ref="tableRowAddRef" @add="onLayoutSubmit" />
</template>

<script setup lang="ts">
import LayoutHeader from "./components/Header.vue";
import Side from "./components/Side.vue";
import Main from "./components/Main.vue";
import Poster from "@/components/Poster.vue";
import AddPosterModal from "@/components/AddPosterModal.vue";
import OpePanel, { type LayoutProps } from "@/layout/components/OpePanel.vue";
import AddTableRowModal from "@/components/AddTableRowModal.vue";
import GlobalDrawer from "@/components/GlobalDrawer.vue";
import { ElMessage, ElEmpty, ElMessageBox } from "element-plus";
import type { SortableEvent } from "vue-draggable-plus";
import type { DataType, TableProps } from "@/components/type";

import { ref, computed, unref, shallowRef } from "vue";
import usePosterStore from "@/store/poster";
import { useTableLayout } from "@/components/hooks/useTableLayout";

const $poster = usePosterStore();

const rows = computed(() => $poster.currentPostInfo?.rows || []);
const columns = computed(() => $poster.currentPostInfo?.columns || []);

const posterAddModalRef = ref<InstanceType<typeof AddPosterModal>>();

const handleOpenPoster = () => {
  posterAddModalRef.value?.handleOpen();
};

const handleDelPoster = (idx: number) => {
  ElMessageBox({
    type: "warning",
    message: "删除当前海报？",
    showCancelButton: true
  }).then(() => {
    $poster.setCurrentPoster("");
    $poster.delPoster(idx);
  });
};

const { handleAddColumn, handleAddRow, handleDelColumn, handleDelRow } =
  useTableLayout(rows, columns);

const onLayoutSubmit = ({
  type,
  value: label,
  props,
}: {
  type: string;
  value: string;
  props: any;
}) => {
  handleAddRow(
    type as "img" | "group" | "text",
    label,
    unref(rows).length,
    props
  );
};

const tableRowAddRef = shallowRef<InstanceType<typeof AddTableRowModal>>();
const onLayoutAdd = (type: LayoutProps["direction"]) => {
  if (type === "vertical") {
    handleAddColumn(unref(columns).length);
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
    if (unref(columns).length <= 2) {
      ElMessage.warning("至少保留一列");
      return;
    }
    handleDelColumn(idx);
  }

  if (type === "horizontal") {
    if (unref(rows).length <= 1) {
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

  unref(rows).map((item) => {
    [item.cellStyles![newIndex!], item.cellStyles![oldIndex!]] = [
      item.cellStyles![oldIndex!],
      item.cellStyles![newIndex!],
    ];
  });
};

const opePanelRef = shallowRef<InstanceType<typeof OpePanel>>();
const handleOpen = (
  row: TableProps<DataType>["rows"][number],
  column: TableProps<DataType>["columns"][number],
  rowIdx: number,
  colIdx: number
) => {
  handleCloseLayout();
  opePanelRef.value?.handleSet(row, column, rowIdx, colIdx);
};

const layoutDrawerRef = shallowRef<InstanceType<typeof GlobalDrawer>>();
const handleOpenLayout = () => {
  layoutDrawerRef.value?.handleShow();
};
const handleCloseLayout = () => {
  layoutDrawerRef.value?.handleClose();
};
</script>

<style scoped></style>
