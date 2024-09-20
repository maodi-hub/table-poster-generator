import type { DataType, TableProps, ValueType } from "../type";

import { type ComputedRef,provide, computed, unref } from "vue";

import { COLUMNS_KEY, ROWS_KEY } from "../constants";

export function useTableLayout(
  rows: ComputedRef<TableProps<any>["rows"]>,
  columns: ComputedRef<TableProps<any>["columns"]>
) {
  const handleAddRow = (
    type: "img" | "text" | "group" | "group-text",
    label: string,
    idx: number,
    props = {}
  ) => {
    const keys = Object.keys(unref(rows)[unref(rows).length - 1].data);
    const isGroup = ["group", "group-text"].includes(type);
    const data: DataType = keys.reduce((pre, cur) => {
      pre[cur] = isGroup
        ? [{ value: "---", style: {} }, { value: "---", style: {} }]
        : ({ value: "---", style: {} } as ValueType);
      return pre;
    }, {} as DataType);
    
    unref(rows).splice(idx, 0, {
      label,
      type,
      style: {},
      renderTypeAsKey: [],
      data,
      props,
      cellStyles: unref(columns).map(() => ({})),
    });
  };

  const handleDelRow = (index: number) => {
    unref(rows).splice(index, 1);
  };

  const handleAddColumn = (idx: number) => {
    const index = idx === 0 ? 1 : idx;
    const dataIndex = `v${unref(columns).length}`;
    unref(columns).splice(index, 0, {
      dataIndex,
    });

    unref(rows).forEach(({ type, data }) => {
      if (Reflect.has(data, dataIndex)) return;
      if (["img", "text"].includes(type || "text")) {
        data[dataIndex] = { value: type === "img" ? "" : "---" };
        return;
      }
      if (["group", "group-text"].includes(type || "text")) {
        data[dataIndex] = [{ value: "---" }, { value: "---" }];
        return;
      }
    });
  };

  const handleDelColumn = (index: number) => {
    unref(columns).splice(index, 1);
  };

  provide(COLUMNS_KEY, [
    computed({
      get() {
        return unref(columns);
      },
      set(val) {
        unref(columns).splice(0, unref(columns).length, ...val);
      },
    }),
    handleAddColumn,
    handleDelColumn,
  ]);
  provide(ROWS_KEY, [
    computed({
      get() {
        return unref(rows);
      },
      set(val) {
        unref(rows).splice(0, unref(rows).length, ...val);
      },
    }),
    handleAddRow,
    handleDelRow,
  ]);

  return {
    handleAddColumn,
    handleDelColumn,
    handleAddRow,
    handleDelRow,
  };
}
