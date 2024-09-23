<template>
  <aside class="w-64 bg-white p-4 flex-shrink-0 text-black flex flex-col">
    <div class="flex items-center justify-between">
      <h2 class="text-lg">设置</h2>
      <el-button
        :icon="Grid"
        v-if="!!$poster.currentPostInfo"
        size="small"
        text
        @click="$emit('layoutChange')"
      />
    </div>
    <el-divider />

    <el-scrollbar class="flex-1 min-h-0">
      <Transition mode="out-in" appear name="el-fade-in">
        <el-form
          :model="form"
          label-position="top"
          @submit.prevent
          v-if="canEdit"
        >
          <template v-for="(layItem, idx) in layout" :key="idx">
            <template v-if="!!layItem.children.length">
              <h3 class="mb-4">{{ layItem.label }}</h3>
              <el-form-item
                v-for="(item, idx) in layItem.children"
                :key="idx"
                :label="item.label"
              >
                <component
                  v-if="
                    ['style', 'content'].includes(layItem.type) &&
                    item.type !== 'image'
                  "
                  :is="components[item.type]"
                  v-model="form[item.field]"
                  :options="item.options"
                />
                <component
                  v-else-if="item.type === 'image'"
                  :is="components[item.type]"
                  :data="form"
                  :valueKey="item.field"
                />
                <component
                  v-else-if="layItem.type === 'rowStyle'"
                  :is="components[item.type]"
                  v-model="form.style[item.field]"
                />

                <component
                  v-else
                  :is="components[item.type]"
                  v-model="form.props[item.field]"
                  :options="item.options"
                />
              </el-form-item>
              <el-divider />
            </template>
          </template>
          <el-form-item>
            <component
              v-if="dataInfo.col && dataInfo.col.dataIndex === 'title'"
              :is="components['image']"
              class="bg-gray-100 rounded-lg overflow-hidden"
              :data="form"
              valueKey="icon"
            />
          </el-form-item>
        </el-form>
        <template v-else>
          <ElEmpty description="请选择需要修改的部分" />
        </template>
      </Transition>
    </el-scrollbar>

    <Teleport to="body" v-if="poster">
      <img :src="poster" class="absolute top-0 left-0" width="810" />
    </Teleport>
  </aside>
</template>

<script setup lang="ts">
import {
  ElForm,
  ElFormItem,
  ElDivider,
  ElInput,
  ElEmpty,
  ElScrollbar,
  ElButton,
} from "element-plus";
import { Grid } from "@element-plus/icons-vue";
import { type Props as LayoutProps } from "@/components/TableLayoutOpe.vue";
export type { LayoutProps };
import type { TableProps } from "../../components/type";

import { ref, type Component, defineAsyncComponent, nextTick } from "vue";
import usePosterStore from "@/store/poster";
import { useOpeLayout } from "../../components/hooks/useOpeLayout";
import { useOpeForm } from "../../components/hooks/useOpeForm";

interface Emit {
  (e: "cancel"): void;
  (e: "layoutChange"): void;
}

const $emit = defineEmits<Emit>();

const $poster = usePosterStore();

const show = ref(false);
const poster = ref("");

const { layout, handleSetLayout } = useOpeLayout();
const { form, handleSetDataStorage, hydrateForm, canEdit, dataInfo } =
  useOpeForm(layout);

const components: Record<string, Component> = {
  color: defineAsyncComponent(() => import("@/components/PanelColor.vue")),
  text: ElInput,
  size: ElInput,
  group: defineAsyncComponent(
    () => import("@/components/PanelGroupSelector.vue")
  ),
  "group-text": defineAsyncComponent(
    () => import("@/components/PanelGroupSelector.vue")
  ),
  single: defineAsyncComponent(() => import("@/components/PanelRadio.vue")),
  image: defineAsyncComponent(() => import("@/components/Image.vue")),
};

const handleSet = (
  row: TableProps<any>["rows"][number],
  column: TableProps<any>["columns"][number],
  rowIdx: number,
  colIdx: number
) => {
  handleSetLayout(colIdx === 0 ? "text" : row.type || "text");
  handleSetDataStorage(row, column, rowIdx, colIdx);
  hydrateForm(row, column, rowIdx, colIdx);

  nextTick(() => {
    show.value = true;
  });
};

const handleClose = () => {
  $emit("cancel");
  show.value = false;
};

defineExpose({
  handleSet,
  handleClose,
});
</script>

<style lang="scss">
.ope-drawer-modal {
  width: 500px;
  top: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  left: unset !important;
}

.ope-drawer {
  .el-drawer__footer {
    text-align: left;
  }
}
</style>
