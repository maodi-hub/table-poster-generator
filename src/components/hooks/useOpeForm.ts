import { CSSProperties, reactive, watch, type ComputedRef } from "vue";
import type { LayoutConfig } from "../settingConfig";
import { TableProps, ValueType } from "../type";
import { debounce, isNumber } from "radash";
import { DEFAULT_COLORS } from "@/constants";
import { color } from "html2canvas/dist/types/css/types/color";

const needPxSuffix = ["fontSize"];

interface MergeGroup {
  hydrate(
    data: any,
    row: TableProps<any>["rows"][number],
    column: TableProps<any>["columns"][number],
    rowIdx: number,
    colIdx: number
  ): void;
  mergeData(): void;
}

export function useOpeForm(layout: ComputedRef<LayoutConfig[]>) {
  const dataInfo: {
    data?: any;
    row?: TableProps<any>["rows"][number];
    col?: TableProps<any>["columns"][number];
    rowIdx: number;
    colIdx: number;
  } = {
    data: void 0,
    row: void 0,
    col: void 0,
    rowIdx: 0,
    colIdx: 0,
  };
  const form = reactive<Record<string, any>>({});

  const textMerge: MergeGroup = {
    hydrate: (data, row, column, _, colIdx) => {
      const cellStyle = row.cellStyles?.[colIdx] || {};
      layout.value[0].children.map((item) => {
        let value =
          (cellStyle[item.field as keyof CSSProperties] ??
            (colIdx === 0 ? item.cellHeaderDefaultValue : item.defaultValue) ??
            "") + "";
        if (item.unit) value = value.replace(item.unit, "");
        form[item.field] = value;
      });

      form.content =
        colIdx === 0 ? row.label : (data[column.dataIndex] as ValueType).value;
    },
    mergeData: () => {
      if (dataInfo.data && dataInfo.col) {
        if (dataInfo.colIdx === 0) dataInfo.row!.label = form.content;
        else
          (dataInfo.data[dataInfo.col.dataIndex] as ValueType).value =
            form.content;
      }

      if (dataInfo.row && isNumber(dataInfo.colIdx)) {
        layout.value[0].children.map((item) => {
          if (!dataInfo.row!.cellStyles?.[dataInfo.colIdx]) {
            dataInfo.row!.cellStyles![dataInfo.colIdx] = {};
          }
          //@ts-ignore
          dataInfo.row!.cellStyles![dataInfo.colIdx][
            item.field as keyof CSSProperties
          ] = form[item.field] + (item.unit ?? "");
        });
      }
    },
  };

  const groupMerge = (type: "text" | "group"): MergeGroup => {
    const isGroup = type ==="group";
    const colorDefault = isGroup ? "#fff" : "#000"
    return {
      hydrate(data, _row, column, _rowIdx, _colIdx) {
        form.content = (data[column.dataIndex] as ValueType[]).map<ValueType>(
          (item, idx) => {
            const data = {
              value: item.value,
              style: {
                ...item.style,
                color: (item.style && item.style.color) ?? colorDefault,
                fontSize:
                  (item.style &&
                    item.style.fontSize &&
                    parseFloat(item.style.fontSize + "").toString()) ??
                  "12",
              },
            };

            if (type === "group")
              data.style.backgroundColor =
                (item.style && item.style.backgroundColor) ??
                DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
            return data;
          }
        );
      },
      mergeData() {
        if (dataInfo.data && dataInfo.col) {
          dataInfo.data[dataInfo.col.dataIndex] = (
            form.content as ValueType[]
          ).map((item) => ({
            value: item.value,
            style: Object.keys({ ...item.style, color: (item.style && item.style.color) ?? colorDefault }).reduce((pre, cur) => {
              if (needPxSuffix.includes(cur))
                return {
                  ...pre,
                  [cur]: item.style![cur as keyof CSSProperties] + "px",
                };

              return {
                ...pre,
                [cur]: item.style![cur as keyof CSSProperties],
              };
            }, {}),
          }));
        }
      },
    };
  };

  const mergeFromType: Record<string, MergeGroup> = {
    text: textMerge,
    group: groupMerge("group"),
    "group-text": groupMerge("text"),
  };

  const hydrateForm = (
    row: TableProps<any>["rows"][number],
    column: TableProps<any>["columns"][number],
    rowIdx: number,
    colIdx: number
  ) => {
    const type = colIdx === 0 ? "text" : row.type || "text";
    mergeFromType[type].hydrate(row.data, row, column, rowIdx, colIdx);
    watchHandle.resume();
  };

  const mergeToTable = debounce({ delay: 100 }, () => {
    const type = dataInfo.colIdx === 0 ? "text" : dataInfo.row!.type || "text";
    mergeFromType[type].mergeData();
  });

  const watchHandle = watch(form, () => {
    mergeToTable();
  });

  return {
    form,
    hydrateForm,
    mergeToTable,
    handleSetDataStorage(
      row: TableProps<any>["rows"][number],
      column: TableProps<any>["columns"][number],
      rowIdx: number,
      colIdx: number
    ) {
      watchHandle.pause();
      dataInfo.data = row.data;
      dataInfo.row = row;
      dataInfo.col = column;
      dataInfo.rowIdx = rowIdx;
      dataInfo.colIdx = colIdx;
    },
  };
}
