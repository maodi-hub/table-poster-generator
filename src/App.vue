<script setup lang="ts">
import phoneImg from "@/assets/phone.png";
import phone2Img from "@/assets/phone2.png";
import phone3Img from "@/assets/phone3.png";
import phone4Img from "@/assets/phone4.png";

import { ElConfigProvider } from "element-plus";
import Container from "./components/Container.vue";
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import type { TableProps, DataType } from "./components/type";

import { computed, provide, reactive, ref, shallowRef } from "vue";


import { POSTER_TAG, POSTER_TAG_SET_KEY } from "./constants";

const containerRef = shallowRef<InstanceType<typeof Container>>();

const containerConfig = reactive({
  width: 810,
});

const columns = reactive<TableProps<DataType>["columns"]>([
  { dataIndex: "title", width: "172px" },
  {
    dataIndex: "v1",
  },
  {
    dataIndex: "v2",
  },
  {
    dataIndex: "v3",
  },
  {
    dataIndex: "v4",
  },
]);

const rows = reactive<TableProps<DataType>["rows"]>([
  {
    label: "机器型号",
    renderTypeAsKey: [],
    data: {
      v1: { value: "iPhone16" },
      v2: { value: "iphone16 Plus" },
      v3: { value: "iphone16 Pro" },
      v4: { value: "iphone16 Pro Max" },
    },
  },
  {
    label: "真机外观",
    type: "img",
    renderTypeAsKey: [],
    data: {
      v1: { value: phoneImg },
      v2: { value: phone2Img },
      v3: { value: phone3Img },
      v4: { value: phone4Img },
    },
  },
  {
    label: "屏幕尺寸（英寸）",
    renderTypeAsKey: [],
    data: {
      v1: { value: "6.1" },
      v2: { value: "6.7" },
      v3: { value: "6.3" },
      v4: { value: "6.9" },
    },
  },
  {
    label: "刷新率",
    renderTypeAsKey: [],
    data: {
      v1: { value: "60hz" },
      v2: { value: "60hz" },
      v3: { value: "120 ProMotion" },
      v4: { value: "120 ProMotion" },
    },
  },
  {
    label: "触控采样率",
    renderTypeAsKey: [],
    data: {
      v1: { value: "240Hz" },
      v2: { value: "240Hz" },
      v3: { value: "240Hz" },
      v4: { value: "240Hz" },
    },
  },
  {
    label: "色彩表现",
    type: "group",
    renderTypeAsKey: [],
    data: {
      v1: ["P3广色域", "10bit"].map((item) => ({ value: item })),
      v2: ["P3广色域", "10bit"].map((item) => ({ value: item })),
      v3: ["P3广色域", "10bit"].map((item) => ({ value: item })),
      v4: ["P3广色域", "10bit"].map((item) => ({ value: item })),
    },
  },
  {
    label: "屏幕材质",
    renderTypeAsKey: [],
    data: {
      v1: { value: "OLED" },
      v2: { value: "OLED" },
      v3: { value: "OLED" },
      v4: { value: "OLED" },
    },
  },
  {
    label: "分辨率",
    renderTypeAsKey: [],
    data: {
      v1: { value: "2556×1179" },
      v2: { value: "2796×1290" },
      v3: { value: "2622×1206" },
      v4: { value: "2868×1320" },
    },
  },
  {
    label: "调光技术",
    renderTypeAsKey: [],
    data: {
      v1: { value: "480hz PWM" },
      v2: { value: "480hz PWM" },
      v3: { value: "480hz PWM" },
      v4: { value: "480hz PWM" },
    },
  },
  {
    label: "CPU类型",
    renderTypeAsKey: [],
    data: {
      v1: { value: "A 18" },
      v2: { value: "A 18" },
      v3: { value: "A 18 Pro" },
      v4: { value: "A 18 Pro" },
    },
  },
  {
    label: "影像参数",
    type: "group",
    renderTypeAsKey: [],
    props: { direction: "vertical" },
    data: {
      v1: ["48MP 主摄", "12MP长焦", "12MP前摄", "-----"].map((item) => ({
        value: item,
      })),
      v2: ["48MP 主摄", "12MP长焦", "12MP前摄", "-----"].map((item) => ({
        value: item,
      })),
      v3: ["48MP 主摄", "12MP长焦", "12MP前摄", "-----"].map((item) => ({
        value: item,
      })),
      v4: ["48MP 主摄", "12MP长焦", "12MP前摄", "-----"].map((item) => ({
        value: item,
      })),
    },
  },
  {
    label: "存储类型",
    renderTypeAsKey: [],
    data: {
      v1: { value: "NVMe" },
      v2: { value: "NVMe" },
      v3: { value: "NVMe" },
      v4: { value: "NVMe" },
    },
  },
  {
    label: "内存类型",
    renderTypeAsKey: [],
    data: {
      v1: { value: "LPDDR5" },
      v2: { value: "LPDDR5" },
      v3: { value: "LPDDR5X" },
      v4: { value: "LPDDR5X" },
    },
  },
  {
    label: "机身尺寸 (毫米)",
    type: "group-text",
    props: { direction: "normal"},
    renderTypeAsKey: [],
    data: {
      v1: [{ value: "高147.6" }, { value: "宽71.6" }, { value: "厚7.8" }],
      v2: [{ value: "高147.6" }, { value: "宽71.6" }, { value: "厚7.8" }],
      v3: [{ value: "高147.6" }, { value: "宽71.6" }, { value: "厚7.8" }],
      v4: [{ value: "高147.6" }, { value: "宽71.6" }, { value: "厚7.8" }],
    },
  },
  {
    label: "机型特色",
    type: "group-text",
    props: { separate: true},
    renderTypeAsKey: [],
    data: {
      v1: [{ value: "IOS 18 人脸识别" }, { value: "X轴线性马达" }, { value: "IP68" }, { value: "灵动岛" }, { value: "HDR显示" }, { value: "APPLE 智能" }, { value: "USB2.0" }, { value: "MsgSafe" }, { value: "Type-C" }, {value: '单频卫星'} ],
      v2: [{ value: "IOS 18 人脸识别" }, { value: "X轴线性马达" }, { value: "IP68" }, { value: "灵动岛" }, { value: "HDR显示" }, { value: "APPLE 智能" }, { value: "USB2.0" }, { value: "MsgSafe" }, { value: "Type-C" }, {value: '单频卫星'} ],
      v3: [{ value: "IOS 18 人脸识别" }, { value: "X轴线性马达" }, { value: "IP68" }, { value: "灵动岛" }, { value: "HDR显示" }, { value: "APPLE 智能" }, { value: "USB2.0" }, { value: "MsgSafe" }, { value: "Type-C" }, {value: '单频卫星'} ],
      v4: [{ value: "IOS 18 人脸识别" }, { value: "X轴线性马达" }, { value: "IP68" }, { value: "灵动岛" }, { value: "HDR显示" }, { value: "APPLE 智能" }, { value: "USB2.0" }, { value: "MsgSafe" }, { value: "Type-C" }, {value: '单频卫星'} ],
    },
  },
]);

const tag = ref("其一");

provide(POSTER_TAG, computed(() => tag.value));
provide(POSTER_TAG_SET_KEY, (payload: string) => (tag.value = payload));
</script>

<template>
  <ElConfigProvider size="default">
    <Container :width="containerConfig.width" ref="containerRef">
      <Header class="mb-12" :tag="tag" />
      <main class="px-6">
        <Table :columns="columns" :rows="rows" />
      </main>
    </Container>
  </ElConfigProvider>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply text-white;
  font-family: HarmonyOS Sans SC;
}
</style>
