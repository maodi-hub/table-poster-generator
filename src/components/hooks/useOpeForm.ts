import {
  computed,
  reactive,
  watch,
  type ComputedRef,
  type CSSProperties,
} from "vue";
import type { LayoutConfig } from "./settingConfig";
import type { TableProps, ValueType } from "../type";
import { DEFAULT_COLORS } from "@/components/constants";

import usePosterStore from "@/store/poster";
import { debounce, isNumber, omit } from "radash";

const needPxSuffix = ["fontSize", "width", "height"];

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
  const dataInfo = reactive<{
    data?: any;
    row?: TableProps<any>["rows"][number];
    col?: TableProps<any>["columns"][number];
    rowIdx: number;
    colIdx: number;
  }>({
    data: void 0,
    row: void 0,
    col: void 0,
    rowIdx: 0,
    colIdx: 0,
  });
  const form = reactive<Record<string, any>>({
    style: {},
  });

  const clearData = () => {
    dataInfo.row = void 0;
    dataInfo.col = void 0;
    dataInfo.rowIdx = 0;
    dataInfo.colIdx = 0;
    dataInfo.data = void 0;
  };

  const textMerge: MergeGroup = {
    hydrate: (data, row, column, rowIdx, colIdx) => {
      form.content =
        colIdx === 0 ? row.label : (data[column.dataIndex] as ValueType).value;

      if (colIdx === 0) {
        form.icon = row.icon ?? "";
      }
      rowProps.hydrate(data, row, column, rowIdx, colIdx);
    },
    mergeData: () => {
      if (dataInfo.data && dataInfo.col) {
        if (dataInfo.colIdx === 0) dataInfo.row!.label = form.content;
        else
          (dataInfo.data[dataInfo.col.dataIndex] as ValueType).value =
            form.content;
      }

      if (dataInfo.colIdx === 0) {
        dataInfo.row!.icon = form.icon;
      }
      rowProps.mergeData();
    },
  };

  const imgMerge: MergeGroup = {
    hydrate: (data, row, column, rowIdx, colIdx) => {
      form.content = (data[column.dataIndex] as ValueType).value;
      rowProps.hydrate(data, row, column, rowIdx, colIdx);
    },
    mergeData: () => {
      if (dataInfo.data && dataInfo.col) {
        (dataInfo.data[dataInfo.col.dataIndex] as ValueType).value =
          form.content;
      }

      rowProps.mergeData();
    },
  };

  const rowProps: MergeGroup = {
    hydrate: (_data, row, _column, _rowIdx, colIdx) => {
      const rowStyleProps =
        layout.value.find((item) => item.type === "rowStyle")?.children || [];
      const rowStyle = row.style || {};
      form.style = rowStyleProps.reduce((pre, cur) => {
        const defaultValue = cur.defaultValue ?? "";
        return {
          ...pre,
          [cur.field]: (
            rowStyle[cur.field as keyof CSSProperties] ?? defaultValue
          ).toString(),
        };
      }, {});

      const props =
        layout.value.find((item) => item.type === "row")?.children || [];
      const initialProps = (row.props ?? {}) as Record<string, any>;
      form.props = props.reduce((pre, cur) => {
        const defaultValue = cur.defaultValue ?? "";
        return {
          ...pre,
          [cur.field]: initialProps[cur.field] ?? defaultValue,
        };
      }, {});

      const cellStyle = row.cellStyles?.[colIdx] || {};

      layout.value
        .find((item) => item.type === "style")
        ?.children.map((item) => {
          const defaultValue = item.defaultValue ?? "";
          const cellDefaultValue = item.cellHeaderDefaultValue ?? "";

          let value =
            cellStyle[item.field as keyof CSSProperties] ??
            (!colIdx ? cellDefaultValue : defaultValue);

          form[item.field] = value;
        });
    },
    mergeData: () => {
      const props = form.props || {};
      if (dataInfo.row && dataInfo.rowIdx !== void 0) {
        if (!dataInfo.row.props) dataInfo.row.props = {};
        Object.assign(dataInfo.row.props, {...props});
      }

      if (dataInfo.row && isNumber(dataInfo.colIdx)) {
        if (!dataInfo.row.cellStyles) dataInfo.row.cellStyles = [];
        Object.assign(dataInfo.row.cellStyles[dataInfo.colIdx],{...omit(form, ["content", "style", "props"])})

        if (!dataInfo.row.style) dataInfo.row.style = {};
        Object.assign(dataInfo.row!.style, { ...form.style });
      }
    },
  };

  const groupMerge = (type: "text" | "group"): MergeGroup => {
    const isGroup = type === "group";
    const colorDefault = isGroup ? "#fff" : "#000";
    return {
      hydrate(data, row, column, rowIdx, colIdx) {
        form.content = (data[column.dataIndex] as ValueType[]).map<ValueType>(
          (item, idx) => {
            const data = {
              value: item.value,
              style: {
                ...item.style,
                color: (item.style && item.style.color) ?? colorDefault,
                fontWeight: (item.style && item.style.fontWeight) ?? "700",
                fontSize:
                  (item.style &&
                    item.style.fontSize &&
                    parseFloat(item.style.fontSize + "").toString()) ??
                  "12px",
              },
            };

            if (type === "group")
              data.style.backgroundColor =
                (item.style && item.style.backgroundColor) ??
                DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
            return data;
          }
        );

        rowProps.hydrate(data, row, column, rowIdx, colIdx);
      },
      mergeData() {
        if (dataInfo.data && dataInfo.col) {
          dataInfo.data[dataInfo.col.dataIndex] = (
            form.content as ValueType[]
          ).map((item) => ({
            value: item.value,
            style: Object.keys({
              ...item.style,
              color: (item.style && item.style.color) ?? colorDefault,
            }).reduce((pre, cur) => {
              if (needPxSuffix.includes(cur))
                return {
                  ...pre,
                  [cur]:
                    (item.style![cur as keyof CSSProperties] as string).replace(
                      "px",
                      ""
                    ) + "px",
                };

              return {
                ...pre,
                [cur]: item.style![cur as keyof CSSProperties],
              };
            }, {}),
          }));
        }

        rowProps.mergeData();
      },
    };
  };

  const mergeFromType: Record<string, MergeGroup> = {
    text: textMerge,
    group: groupMerge("group"),
    "group-text": groupMerge("text"),
    img: imgMerge,
  };

  const hydrateForm = (
    row: TableProps<any>["rows"][number],
    column: TableProps<any>["columns"][number],
    rowIdx: number,
    colIdx: number
  ) => {
    const type = colIdx === 0 ? "text" : row.type || "text";
    mergeFromType[type].hydrate(row.data, row, column, rowIdx, colIdx);
  };

  const mergeToTable = debounce({ delay: 100 }, () => {
    const type = dataInfo.colIdx === 0 ? "text" : dataInfo.row!.type || "text";
    mergeFromType[type].mergeData();
  });

  watch(form, () => {
    mergeToTable();
  }, {deep: true});

  const $poster = usePosterStore();
  watch(
    () => $poster.currentPosterId,
    () => {
      clearData();
    }
  );

  return {
    form,
    canEdit: computed(() => !!dataInfo.data),
    dataInfo: computed(() => dataInfo),
    hydrateForm,
    mergeToTable,
    handleSetDataStorage(
      row: TableProps<any>["rows"][number],
      column: TableProps<any>["columns"][number],
      rowIdx: number,
      colIdx: number
    ) {
      dataInfo.data = row.data;
      dataInfo.row = row;
      dataInfo.col = column;
      dataInfo.rowIdx = rowIdx;
      dataInfo.colIdx = colIdx;
    },
  };
}
