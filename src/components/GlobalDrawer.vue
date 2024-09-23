<template>
  <el-drawer
    v-model="show"
    :size="500"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
    :modal="false"
    :append-to-body="false"
    modal-class="ope-drawer-modal"
    destroy-on-close
    @close="handleClose"
    :lock-scroll="false"
    class="text-black ope-drawer"
  >
    <template #header>
      <div>
        <span>海报配置</span>
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
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="小标题">
        <el-input v-model="form.subTitle" />
      </el-form-item>
      <!-- <el-form-item label="标签标题">
        <el-input v-model="form.tagCaption" />
      </el-form-item> -->
      <el-form-item label="海报标签">
        <el-input v-model="form.tag" />
      </el-form-item>
      <el-form-item label="海报尺寸">
        <el-form-item>
          <el-input-number v-model="form.width" :min="0" :max="width" />
        </el-form-item>
        <el-form-item class="flex-1 min-w-0 ml-2">
          <el-slider v-model="percent" />
        </el-form-item>
      </el-form-item>
      <el-form-item label="小提示">
        <VueDraggable
          ref="el"
          v-model="form.tips"
          :animation="150"
          handle=".handle"
          class="flex flex-col gap-2"
          draggable=".move"
        >
          <template v-for="(item, idx) in form.tips" :key="item">
            <PanelTextInput :model-value="item" class="move" type="tips">
              <template #prefix>
                <ElIcon class="handle cursor-move"><Rank /></ElIcon>
              </template>
              <template #append>
                <el-button
                  type="danger"
                  :icon="Minus"
                  @click="handleMinus(idx)"
                />
              </template>
            </PanelTextInput>
          </template>
          <ElButton :icon="Plus" class="w-full" @click="handleAdd"
            >新增</ElButton
          >
        </VueDraggable>
      </el-form-item>
      <el-form-item label="平台图标">
        <div class="flex-1">
          <el-form-item class="!mb-4">
            <Image class="bg-gray-50" :data="form.platIcon" value-key="value" />
          </el-form-item>
          <el-form-item>
            <el-select v-model="form.platIcon.value" placeholder="请选择" @change="onPlatChange">
              <el-option
                v-for="item in platFormIcons"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="图标背景">
        <ColorPicker v-model="form.platIcon.style.backgroundColor" />
      </el-form-item>
      <el-form-item label="版权信息">
        <el-input v-model="form.copyright" />
      </el-form-item>
    </el-form>
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
  ElIcon,
  ElButton,
  ElSelect,
  ElOption,
} from "element-plus";
import { VueDraggable } from "vue-draggable-plus";
import { Rank, Minus, Plus } from "@element-plus/icons-vue";
import type { SortableEvent } from "vue-draggable-plus";
import PanelTextInput from "./PanelTextInput.vue";
import ColorPicker from "./PanelColor.vue";
import Image from "./Image.vue";
import TableLayoutOpe, {
  type Props as LayoutProps,
} from "./TableLayoutOpe.vue";
export type { LayoutProps };

import { ref, computed, inject, reactive, watch, CSSProperties } from "vue";
import usePosterStore from "@/store/poster";

import { COLUMNS_KEY, ROWS_KEY } from "./constants";
import { ValueType } from "./type";

interface Emit {
  (e: "cancel"): void;
  (e: "add", type: LayoutProps["direction"]): void;
  (e: "del", val: { type: LayoutProps["direction"]; idx: number }): void;
  (
    e: "sortUpdate",
    val: { sortEvent: SortableEvent; type: LayoutProps["direction"] }
  ): void;
}

const [rows] = inject(ROWS_KEY, [computed(() => []), () => {}, () => {}]);
const [columns] = inject(COLUMNS_KEY, [computed(() => []), () => {}, () => {}]);
const $poster = usePosterStore();

const getIcon = (uri: string, prefix: string = "logo", extention = "png") =>
  new URL(`../assets/${prefix}/${uri}.${extention}`, import.meta.url).href;
const platFormIcons = [
  { value: getIcon("weixin"), label: "微信", color: "#49CC56",copyright: "@极客果核" },
  { value: getIcon("tiao"), label: "头条", color: "#fff",copyright: "@果核剥壳" },
  { value: getIcon("redbook", "logo", "svg"), label: "小红书", color: "#FF0000",copyright: "@果核的日常" },
  { value: getIcon("bili"), label: "阿b", color: "#00ACE5",copyright: "@果核剥壳" },
  { value: getIcon("cool"), label: "酷安",color: "#0EAD66", copyright: "@Applek" },
];

const onPlatChange = (value: string) => {
  if (!value) return;
  const currentPlat = platFormIcons.find(item => item.value === value);
  if (!currentPlat) return;
  
  form.copyright = currentPlat.copyright;
  form.platIcon.value = value;
  form.platIcon.style.backgroundColor = currentPlat.color;
}

const layoutType = ref(0);

const $emit = defineEmits<Emit>();

const show = ref(false);

const width = 1920;
const form = reactive<{
  layoutType: number;
  tag: string;
  width: number;
  title: string;
  subTitle: string;
  tagCaption: string;
  tips: (ValueType & { isHtml?: boolean })[];
  copyright: string;
  platIcon: { value: string; style: CSSProperties };
}>({
  layoutType: 0,
  tag: "",
  width: 810,
  title: "",
  subTitle: "",
  tagCaption: "",
  tips: [],
  copyright: "",
  platIcon: {
    value: "",
    style: {},
  },
});

const percent = computed({
  get() {
    return Math.ceil(((form.width || 810) / width) * 100);
  },
  set(val) {
    form.width = Math.ceil((val / 100) * width);
  },
});

const handleAdd = () => {
  form.tips.push({
    value: "--",
    style: {
      backgroundColor: "",
      color: "#fff",
      fontSize: "12px",
    },
  });
};

const handleMinus = (idx: number) => {
  form.tips.splice(idx, 1);
};

const hydrateForm = (reverse: boolean = false) => {
  if (!reverse) {
    form.tag = $poster.currentPostInfo?.tag || "";
    form.width = $poster.currentPostInfo?.width || 810;
    form.title = $poster.currentPostInfo?.title || "";
    form.subTitle = $poster.currentPostInfo?.subTitle || "";
    form.tagCaption = $poster.currentPostInfo?.tagCaption || "";
    form.tips = $poster.currentPostInfo?.tips || [];
    form.platIcon = $poster.currentPostInfo?.platIcon || {
      value: "",
      style: {},
    };
    form.copyright = $poster.currentPostInfo?.copyright || "";
    return;
  }

  $poster.currentPostInfo!.tag = form.tag;
  $poster.currentPostInfo!.width = form.width;
  $poster.currentPostInfo!.title = form.title;
  $poster.currentPostInfo!.subTitle = form.subTitle;
  $poster.currentPostInfo!.tagCaption = form.tagCaption;
  $poster.currentPostInfo!.tips = form.tips;
  $poster.currentPostInfo!.platIcon = { ...form.platIcon };
  $poster.currentPostInfo!.copyright = form.copyright;
  $poster.currentPostInfo!.height = form.width / 0.75 
  
};

watch(
  form,
  () => {
    hydrateForm(true);
  },
  { deep: true }
);

watch(
  () => $poster.currentPostInfo,
  (val) => {
    handleClose();
    if (!val) return;
    hydrateForm();
  }
);

const handleShow = () => {
  hydrateForm();
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
