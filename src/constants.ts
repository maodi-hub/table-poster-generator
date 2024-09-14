import type { InjectionKey, ComputedRef } from "vue";
import type { ColumnType, DataType, RowType } from "./components/type";

export const DEFAULT_COLORS = [
  "#A5D63F",
  "#2A82E4",
  "#7948EA",
  "#00BAAD",
  "#43CF7C",
];

export const FLEX_ALIGN = [
  { label: "左对齐", value: "flex-start" },
  { label: "居中", value: "center" },
  { label: "右对齐", value: "flex-end" },
  { label: "自适应", value: "unset" },
];

export const TEXT_ALIGN = [
  { label: "左对齐", value: "left" },
  { label: "居中", value: "center" },
  { label: "右对齐", value: "right" },
];

export const POSTER_TAG: InjectionKey<ComputedRef<string>> = Symbol("posterTag");
export const POSTER_TAG_SET_KEY: InjectionKey<(payload: string) => void> =
  Symbol("posterTag");

export const CONTAINER_WIDTH_KEY: InjectionKey<ComputedRef<number>> =
  Symbol("containerWidth");
export const CONTAINER_SET_WIDTH_KEY: InjectionKey<(payload: number) => void> =
  Symbol("containerWidth");

export const COLUMNS_KEY: InjectionKey<
  [ComputedRef<ColumnType[]>, add: (idx: number) => void, del: (idx: number) => void]
> = Symbol("columns");

export const ROWS_KEY: InjectionKey<
  [
    ComputedRef<RowType<DataType>[]>,
    add: (type: "img" | "text" | "group", label: string, idx:number, props?: any) => void,
    del: (idx: number) => void
  ]
> = Symbol("rows");
