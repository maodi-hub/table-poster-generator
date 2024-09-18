import type { DataType, TableProps, ValueType } from "../type";

import { provide, computed } from "vue";

import { COLUMNS_KEY, ROWS_KEY } from "../../constants";

export function useTableLayout(
  rows: TableProps<any>["rows"],
  columns: TableProps<any>["columns"]
) {
  const handleAddRow = (
    type: "img" | "text" | "group" | "group-text",
    label: string,
    idx: number,
    props = {}
  ) => {
    const keys = Object.keys(rows[rows.length - 1].data);
    const isGroup = ["group", "group-text"].includes(type);
    const data: DataType = keys.reduce((pre, cur) => {
      pre[cur] = isGroup
        ? [{ value: "---", style: {} }, { value: "---", style: {} }]
        : ({ value: "---", style: {} } as ValueType);
      return pre;
    }, {} as DataType);
    
    rows.splice(idx, 0, {
      label,
      type,
      style: {},
      renderTypeAsKey: [],
      data,
      props,
      cellStyles: columns.map(() => ({})),
    });
  };

  const handleDelRow = (index: number) => {
    rows.splice(index, 1);
  };

  const handleAddColumn = (idx: number) => {
    const index = idx === 0 ? 1 : idx;
    const dataIndex = `v${columns.length}`;
    columns.splice(index, 0, {
      dataIndex,
    });

    rows.forEach(({ type, data }) => {
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
    columns.splice(index, 1);
  };

  provide(COLUMNS_KEY, [
    computed({
      get() {
        return columns;
      },
      set(val) {
        columns.splice(0, columns.length, ...val);
      },
    }),
    handleAddColumn,
    handleDelColumn,
  ]);
  provide(ROWS_KEY, [
    computed({
      get() {
        return rows;
      },
      set(val) {
        rows.splice(0, rows.length, ...val);
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
