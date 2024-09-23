import { FLEX_ALIGN } from "../constants";

export interface LayoutConfig {
  label: string;
  type: "style" | "content" | "row" | "rowStyle";
  children: {
    label: string;
    field: string;
    type: "color" | "size" | "text" | "group" | "single" | "image";
    unit?: string;
    defaultValue?: any;
    cellHeaderDefaultValue?: string;
    options?: { label: string; value: any }[];
  }[];
}

export const textConfig: LayoutConfig[] = [
  {
    label: "行样式",
    type: "rowStyle",
    children: [
      {
        label: "高度",
        field: "height",
        type: "size",
        defaultValue: "51px",
        cellHeaderDefaultValue: "51px",
      },
    ],
  },
  {
    label: "单元格样式",
    type: "style",
    children: [
      {
        label: "字体颜色",
        field: "color",
        type: "color",
        defaultValue: "#000",
        cellHeaderDefaultValue: "#fff",
      },
      {
        label: "字体大小",
        field: "fontSize",
        type: "size",
        unit: "px",
        defaultValue: "14px",
        cellHeaderDefaultValue: "12px",
      },
      {
        label: "字体加粗",
        field: "fontWeight",
        type: "size",
        defaultValue: "700",
        cellHeaderDefaultValue: "400",
      },
      {
        label: "对齐方式",
        field: "justifyContent",
        type: "single",
        defaultValue: "center",
        cellHeaderDefaultValue: "flex-start",
        options: FLEX_ALIGN,
      },
    ],
  },
  {
    label: "内容",
    type: "content",
    children: [{ label: "", field: "content", type: "text" }],
  },
];

export const groupConfig: LayoutConfig[] = [
  {
    label: "行样式",
    type: "rowStyle",
    children: [
      {
        label: "高度",
        field: "height",
        type: "size",
        defaultValue: "51px",
        cellHeaderDefaultValue: "51px",
      },
    ],
  },
  {
    label: "行配置",
    type: "row",
    children: [
      {
        label: "模式",
        field: "direction",
        type: "single",
        defaultValue: "horizontal",
        options: [
          { label: "水平", value: "horizontal" },
          { label: "垂直", value: "vertical" },
        ],
      },
    ],
  },
  {
    label: "",
    type: "content",
    children: [
      { label: "内容", field: "content", type: "group", defaultValue: [] },
    ],
  },
];

export const imgConfig: LayoutConfig[] = [
  {
    label: "行样式",
    type: "rowStyle",
    children: [
      {
        label: "高度",
        field: "height",
        type: "size",
        defaultValue: "51px",
        cellHeaderDefaultValue: "51px",
      },
    ],
  },
  {
    label: "",
    type: "content",
    children: [
      { label: "内容", field: "content", type: "image", defaultValue: "" },
    ],
  },
];

export const groupTextConfig: LayoutConfig[] = [
  {
    label: "行样式",
    type: "rowStyle",
    children: [
      {
        label: "高度",
        field: "height",
        type: "size",
        defaultValue: "51px",
        cellHeaderDefaultValue: "51px",
      },
    ],
  },
  {
    label: "单元格样式",
    type: "style",
    children: [
      {
        label: "字体颜色",
        field: "color",
        type: "color",
        defaultValue: "#000",
        cellHeaderDefaultValue: "#fff",
      },
    ],
  },
  {
    label: "单元格配置",
    type: "row",
    children: [
      {
        label: "卡片",
        field: "card",
        type: "single",
        defaultValue: false,
        options: [
          { label: "是", value: true },
          { label: "否", value: false },
        ],
      },
      {
        label: "卡片背景",
        field: "cardBgColor",
        type: "color",
        defaultValue: "#fff",
      },
      {
        label: "模式",
        field: "direction",
        type: "single",
        defaultValue: "horizontal",
        options: [
          { label: "水平", value: "horizontal" },
          { label: "垂直", value: "vertical" },
          { label: "自适应", value: "normal" },
        ],
      },
      {
        label: "分隔符",
        field: "separate",
        type: "single",
        defaultValue: false,
        options: [
          { label: "是", value: true },
          { label: "否", value: false },
        ],
      },
    ],
  },
  {
    label: "",
    type: "content",
    children: [
      { label: "内容", field: "content", type: "group", defaultValue: [] },
    ],
  },
];
