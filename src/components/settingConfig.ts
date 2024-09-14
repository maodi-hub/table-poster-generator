import {FLEX_ALIGN} from "../constants";

export interface LayoutConfig {
  label: string;
  type: "style" | "content";
  children: {
    label: string;
    field: string;
    type: "color" | "size" | "text" | "group" | "single";
    unit?: string; 
    defaultValue?: any;
    cellHeaderDefaultValue?: string;
    options?: {label: string, value: string}[]
  }[];
}

export const textConfig: LayoutConfig[] = [
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
      }
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
    label: "内容",
    type: "content",
    children: [{ label: "", field: "content", type: "group", defaultValue: [] }],
  },
];
