import type { CSSProperties } from "vue";

export interface CommonProp<T = any> {
  data: T;
  valueKey: keyof T;
}

export interface GroupProps<T> extends CommonProp<T> {
  direction?: "horizontal" | "vertical";
  colors?: string[];
}

export interface GroupTextProps<T> extends CommonProp<T> {
  direction?: "horizontal" | "vertical" | "normal";
  separate?: boolean;
  card?: boolean;
  cardBgColor?: string;
}

export interface ImageProps<T> extends CommonProp<T> {}

export interface TextProps<T> extends CommonProp<T> {}

export interface ColumnType<T = any> {
  dataIndex: keyof T;
  width?: string;
}

interface RowBaseType<T = any> {
  label: string;
  icon?: string;
  isHtml?: boolean;
  style?: CSSProperties;
  renderTypeAsKey: (keyof T)[];
  data: T;
  cellStyles?: CSSProperties[];
}

interface Image<T> extends RowBaseType<T> {
  type?: "img";
  props?: Omit<ImageProps<T>, "data" | "valueKey">;
}

interface Group<T> extends RowBaseType<T> {
  type?: "group";
  props?: Omit<GroupProps<T>, "data" | "valueKey">;
}

interface Text<T> extends RowBaseType<T> {
  type?: "text";
  props?: Omit<TextProps<T>, "data" | "valueKey">;
}

interface GroupText<T> extends RowBaseType<T> {
  type?: "group-text";
  props?: Omit<GroupTextProps<T>, "data" | "valueKey">;
}

export type RowType<T extends DataType> =
  | Image<T>
  | Group<T>
  | Text<T>
  | GroupText<T>;

export interface TableProps<T extends DataType = DataType> {
  columns: ColumnType<T>[];
  rows: RowType<T>[];
}

type Arrayable<T> = T | T[];
export interface ValueType {
  value: any;
  style?: CSSProperties;
  isHtml?: boolean;
}
export interface DataType {
  [x: string]: Arrayable<ValueType>;
}

export interface TableEmit<T extends DataType> {
  (
    e: "open",
    row: TableProps<T>["rows"][number],
    column: TableProps<T>["columns"][number],
    rowIdx: number,
    colIdx: number
  ): void;
  (e: "headerClick"): void;

}
