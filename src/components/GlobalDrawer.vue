<template>
  <el-drawer
    v-model="show"
    :size="500"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :modal="false"
    modal-class="ope-drawer-modal"
    destroy-on-close
    @close="handleClose"
    :lock-scroll="false"
    class="text-black ope-drawer"
  >
    <template #header>
      <div>
        <span>海报配置</span>
        <el-button :icon="Download" circle @click="getPoster" />
      </div>
    </template>
    <el-form :model="form" label-position="top" @submit.prevent>
      <el-form-item label="布局">
        <div class="flex-1">
          <el-radio-group v-model="layoutType">
            <el-radio :value="0">列</el-radio>
            <el-radio :value="1">行</el-radio>
          </el-radio-group>
          <TableLayoutOpe
            v-if="!layoutType"
            v-model:data="columns"
            direction="vertical"
            @add="$emit('add', $event)"
            @del="$emit('del', $event)"
            @update="$emit('sortUpdate', $event)"
          />
          <TableLayoutOpe
            v-else
            v-model:data="rows"
            direction="horizontal"
            @add="$emit('add', $event)"
            @del="$emit('del', $event)"
            @update="$emit('sortUpdate', $event)"
          />
        </div>
      </el-form-item>
      <el-form-item label="海报标签">
        <el-input :model-value="posterTag" @input="handlePosterTagSet" />
      </el-form-item>
      <el-form-item label="海报尺寸">
        <el-form-item>
          <el-input-number
            :model-value="containerWidth"
            :min="0"
            :max="width"
            @change="onWidthChange"
          />
        </el-form-item>
        <el-form-item class="flex-1 min-w-0 ml-2">
          <el-slider v-model="percent" />
        </el-form-item>
      </el-form-item>
    </el-form>
    <Teleport to="body" v-if="poster">
      <img :src="poster" class="absolute top-0 left-0" width="810" />
    </Teleport>
  </el-drawer>
</template>

<script setup lang="ts">
import {
  ElDrawer,
  ElSlider,
  ElForm,
  ElFormItem,
  ElInputNumber,
  ElInput,
  ElRadio,
  ElRadioGroup,
  ElButton,
} from "element-plus";
import { Download } from "@element-plus/icons-vue";
import type { SortableEvent } from "vue-draggable-plus";
import TableLayoutOpe, {
  type Props as LayoutProps,
} from "./TableLayoutOpe.vue";
export type { LayoutProps };

import { ref, inject, computed, reactive } from "vue";
import { useContainer } from "./hooks/useContainer";

import { COLUMNS_KEY, ROWS_KEY } from "../constants";
import toImage from "@/utils/toImage";

interface Emit {
  (e: "cancel"): void;
  (e: "add", type: LayoutProps["direction"]): void;
  (e: "del", val: { type: LayoutProps["direction"]; idx: number }): void;
  (
    e: "sortUpdate",
    val: { sortEvent: SortableEvent; type: LayoutProps["direction"] }
  ): void;
}

const layoutType = ref(0);
const [columns] = inject(COLUMNS_KEY, [computed(() => []), () => {}, () => {}]);
const [rows] = inject(ROWS_KEY, [computed(() => []), () => {}, () => {}]);

const $emit = defineEmits<Emit>();

const show = ref(false);
const poster = ref("");

const {
  width,
  containerWidth,
  percent,
  onWidthChange,
  posterTag,
  handlePosterTagSet,
} = useContainer();
const form = reactive({});

const getPoster = () => {
  toImage(document.querySelector("#container") as HTMLElement).then((ctx) => {
    poster.value = ctx;
  });
};

const handleShow = () => {
  show.value = true;
};

const handleClose = () => {
  $emit("cancel");
  show.value = false;
};

defineExpose({
  handleShow,
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
