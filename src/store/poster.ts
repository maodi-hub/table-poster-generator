import type { TableProps, DataType, ValueType } from "@/components/type";

import { defineStore } from "pinia";

import { uid } from "radash";

import phoneImg from "@/assets/phone.png";
import phone2Img from "@/assets/phone2.png";
import phone3Img from "@/assets/phone3.png";
import phone4Img from "@/assets/phone4.png";
import { CSSProperties } from "vue";

const getIcon = (uri: string, prefix: string = "icon") => new URL(`../assets/${prefix}/${uri}.png`, import.meta.url).href;

export interface PosterItem extends TableProps<DataType> {
  width: number;
  height: number;
  tag: string;
  id: string;
  title: string;
  subTitle: string;
  tagCaption: string;
  platIcon: { value: string, style:CSSProperties };
  copyright: string;
  tips: (ValueType & { isHtml?: boolean })[];
  posterTitle: string;
}

interface State {
  currentPosterId: string;
  poster: PosterItem[];
}

const DefaultData1 = (): PosterItem => ({
  id: uid(20, "----"),
  tagCaption: "参数一图知",
  copyright: "@果核的日常",
  platIcon: { value: getIcon("redbook", "logo"), style:{ backgroundColor: "#FF0000" } },
  title: "Apple",
  posterTitle: "iPhone16参数图一",
  subTitle: "iPhone16/16Plus/16Pro/16ProMax",
  tag: "其一",
  tips: [
    {
      value: "参数来自厂商官方已公布数据以及网友爆料综合得出",
      style: {
        color: "#fff",
        fontWeight: 400,
        fontSize: "8px",
        textAlign: "right",
      },
      isHtml: false,
    },
    {
      value: "如数据有误请指出",
      style: {
        color: "#fff",
        fontWeight: 400,
        fontSize: "8px",
        textAlign: "right",
      },
      isHtml: false,
    },
    {
      value: "如需转载请注明出处",
      style: {
        color: "#fff",
        fontWeight: 400,
        fontSize: "8px",
        textAlign: "right",
      },
      isHtml: false,
    },
    {
      value: "最后做图时间：2024.9.10 10:30",
      style: {
        color: "#fff",
        fontWeight: 400,
        fontSize: "8px",
        textAlign: "right",
      },
      isHtml: false,
    },
    { value: "", style: {}, isHtml: false },
    {
      value:
        "<span style='color: #43CF7C'>水绿色</span>文字，为与前一款机型的差别标记",
      isHtml: true,
      style: {
        color: "#fff",
        fontWeight: 400,
        fontSize: "8px",
        textAlign: "right",
      },
    },
  ],
  width: 810,
  height: 1080,
  columns: [
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
  ],
  rows: [
    {
      label: "机器型号",
      icon: getIcon("1"),
      renderTypeAsKey: [],
      style: { height: "42px" },
      data: {
        v1: { value: "iPhone16" },
        v2: { value: "iphone16 Plus" },
        v3: { value: "iphone16 Pro" },
        v4: { value: "iphone16 Pro Max" },
      },
    },
    {
      label: "真机外观",
      icon: getIcon("2"),
      type: "img",
      renderTypeAsKey: [],
      style: { height: "105px" },
      data: {
        v1: { value: phoneImg },
        v2: { value: phone2Img },
        v3: { value: phone3Img },
        v4: { value: phone4Img },
      },
    },
    {
      label: "屏幕尺寸（英寸）",
      icon: getIcon("3"),
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: { value: "6.1" },
        v2: { value: "6.7" },
        v3: { value: "6.3" },
        v4: { value: "6.9" },
      },
    },
    {
      label: "刷新率",
      icon: getIcon("4"),
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: { value: "60hz" },
        v2: { value: "60hz" },
        v3: { value: "120 ProMotion" },
        v4: { value: "120 ProMotion" },
      },
    },
    {
      label: "触控采样率",
      icon: getIcon("5"),
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: { value: "240Hz" },
        v2: { value: "240Hz" },
        v3: { value: "240Hz" },
        v4: { value: "240Hz" },
      },
    },
    {
      label: "色彩表现",
      icon: getIcon("6"),
      type: "group",
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: ["P3广色域", "10bit"].map((item) => ({ value: item })),
        v2: ["P3广色域", "10bit"].map((item) => ({ value: item })),
        v3: ["P3广色域", "10bit"].map((item) => ({ value: item })),
        v4: ["P3广色域", "10bit"].map((item) => ({ value: item })),
      },
    },
    {
      label: "屏幕材质",
      icon: getIcon("7"),
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: { value: "OLED" },
        v2: { value: "OLED" },
        v3: { value: "OLED" },
        v4: { value: "OLED" },
      },
    },
    {
      label: "分辨率",
      icon: getIcon("8"),
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: { value: "2556×1179" },
        v2: { value: "2796×1290" },
        v3: { value: "2622×1206" },
        v4: { value: "2868×1320" },
      },
    },
    {
      label: "调光技术",
      icon: getIcon("9"),
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: { value: "480hz PWM" },
        v2: { value: "480hz PWM" },
        v3: { value: "480hz PWM" },
        v4: { value: "480hz PWM" },
      },
    },
    {
      label: "CPU类型",
      icon: getIcon("10"),
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: { value: "A 18" },
        v2: { value: "A 18" },
        v3: { value: "A 18 Pro" },
        v4: { value: "A 18 Pro" },
      },
    },
    {
      label: "影像参数",
      icon: getIcon("11"),
      type: "group",
      renderTypeAsKey: [],
      props: { direction: "vertical" },
      style: {height: '170px'},
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
      icon: getIcon("12"),
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: { value: "NVMe" },
        v2: { value: "NVMe" },
        v3: { value: "NVMe" },
        v4: { value: "NVMe" },
      },
    },
    {
      label: "内存类型",
      icon: getIcon("3"),
      renderTypeAsKey: [],
      style: { height: "78px" },
      data: {
        v1: { value: "LPDDR5" },
        v2: { value: "LPDDR5" },
        v3: { value: "LPDDR5X" },
        v4: { value: "LPDDR5X" },
      },
    },
  ],
});

const DefaultData2 = (): PosterItem => ({
  id: uid(20, "----"),
  tagCaption: "参数一图知",
  copyright: "@果核的日常",
  platIcon: { value: getIcon("redbook", "logo"), style:{ backgroundColor: "#FF0000" } },
  title: "Apple",
  posterTitle: "iPhone16参数图二",
  subTitle: "iPhone16/16Plus/16Pro/16ProMax",
  tag: "其二",
  tips: [
    {
      value: "参数来自厂商官方已公布数据以及网友爆料综合得出",
      style: {
        color: "#fff",
        fontWeight: 400,
        fontSize: "8px",
        textAlign: "right",
      },
      isHtml: false,
    },
    {
      value: "如数据有误请指出",
      style: {
        color: "#fff",
        fontWeight: 400,
        fontSize: "8px",
        textAlign: "right",
      },
      isHtml: false,
    },
    {
      value: "如需转载请注明出处",
      style: {
        color: "#fff",
        fontWeight: 400,
        fontSize: "8px",
        textAlign: "right",
      },
      isHtml: false,
    },
    {
      value: "最后做图时间：2024.9.10 10:30",
      style: {
        color: "#fff",
        fontWeight: 400,
        fontSize: "8px",
        textAlign: "right",
      },
      isHtml: false,
    },
    { value: "", style: {}, isHtml: false },
    {
      value:
        "<span style='color: #43CF7C'>水绿色</span>文字，为与前一款机型的差别标记",
      isHtml: true,
      style: {
        color: "#fff",
        fontWeight: 400,
        fontSize: "8px",
        textAlign: "right",
      },
    },
  ],
  width: 810,
  height: 1080,
  columns: [
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
  ],
  rows: [
    {
      label: "机器型号",
      icon: getIcon("1"),
      renderTypeAsKey: [],
      style: { height: "42px" },
      data: {
        v1: { value: "iPhone16" },
        v2: { value: "iphone16 Plus" },
        v3: { value: "iphone16 Pro" },
        v4: { value: "iphone16 Pro Max" },
      },
    },
    {
      label: "电池容量",
      icon: getIcon("1-2"),
      renderTypeAsKey: [],
      style: { height: "40px" },
      data: {
        v1: { value: "3561" },
        v2: { value: "4006" },
        v3: { value: "3577" },
        v4: { value: "4676" },
      },
    },
    {
      label: "充电信息",
      type: "group",
      icon: getIcon("1-3"),
      style: {height: "135px"},
      props: { direction: "vertical" },
      renderTypeAsKey: [],
      data: {
        v1: [
          { value: "20W有线" },
          { value: "15W 无线(国行)", style: { backgroundColor: "#2A82E4" } },
          { value: "----", style: { backgroundColor: "#00BAAD" } },
        ],
        v2: [
          { value: "20W有线" },
          { value: "15W 无线(国行)", style: { backgroundColor: "#2A82E4" } },
          { value: "----", style: { backgroundColor: "#00BAAD" } },
        ],
        v3: [
          { value: "27W有线" },
          { value: "15W 无线(国行)", style: { backgroundColor: "#2A82E4" } },
          { value: "----", style: { backgroundColor: "#00BAAD" } },
        ],
        v4: [
          { value: "27W有线" },
          { value: "15W 无线(国行)", style: { backgroundColor: "#2A82E4" } },
          { value: "----", style: { backgroundColor: "#00BAAD" } },
        ],
      },
    },
    {
      label: "机身尺寸 (毫米)",
      type: "group-text",
      icon: getIcon("1-4"),
      props: { direction: "vertical" },
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: [{ value: "高147.6", style: { fontSize: "10px" } }, { value: "宽71.6", style: { fontSize: "10px" } }, { value: "厚7.8", style: { fontSize: "10px" } }],
        v2: [{ value: "高147.6", style: { fontSize: "10px" } }, { value: "宽71.6", style: { fontSize: "10px" } }, { value: "厚7.8", style: { fontSize: "10px" } }],
        v3: [{ value: "高147.6", style: { fontSize: "10px" } }, { value: "宽71.6", style: { fontSize: "10px" } }, { value: "厚7.8", style: { fontSize: "10px" } }],
        v4: [{ value: "高147.6", style: { fontSize: "10px" } }, { value: "宽71.6", style: { fontSize: "10px" } }, { value: "厚7.8", style: { fontSize: "10px" } }],
      },
    },
    {
      label: "机身材质",
      icon: getIcon("1-5"),
      type: "group-text",
      props: { direction: "vertical" },
      renderTypeAsKey: [],
      style: { height: "51px" },
      data: {
        v1: [
          { value: "金属边框", style: { fontSize: "14px" } },
          { value: "玻璃后盖", style: { fontSize: "14px" } },
        ],
        v2: [
          { value: "金属边框", style: { fontSize: "14px" } },
          { value: "玻璃后盖", style: { fontSize: "14px" } },
        ],
        v3: [
          {
            value: "钛金属边框",
            style: { fontSize: "14px", color: "#43CF7C" },
          },
          { value: "玻璃后盖", style: { fontSize: "14px" } },
        ],
        v4: [
          {
            value: "钛金属边框",
            style: { fontSize: "14px", color: "#43CF7C" },
          },
          { value: "玻璃后盖", style: { fontSize: "14px" } },
        ],
      },
    },
    {
      label: "机身重量 (克)",
      icon: getIcon("1-6"),
      style: { height: "51px" },
      renderTypeAsKey: [],
      data: {
        v1: { value: "170" },
        v2: { value: "199" },
        v3: { value: "199" },
        v4: { value: "227" },
      },
    },
    {
      label: "屏幕外观",
      icon: getIcon("1-7"),
      style: { height: "80px" },
      renderTypeAsKey: [],
      data: {
        v1: { value: "中置药丸屏" },
        v2: { value: "中置药丸屏" },
        v3: { value: "中置药丸屏" },
        v4: { value: "中置药丸屏" },
      },
    },
    {
      label: "配色",
      icon: getIcon("1-8"),
      style: { height: "70px" },
      type: "group-text",
      props: { direction: "normal" },
      renderTypeAsKey: [],
      data: {
        v1: [
          { value: "群青色", style: { fontSize: "16px", color: "#A3B4F7" } },
          { value: "深青色", style: { fontSize: "16px", color: "#9CBAB9" } },
          { value: "粉色", style: { fontSize: "16px", color: "#F4B1DC" } },
          { value: "白色", style: { fontSize: "16px", color: "#FAFAFA" } },
          { value: "黑色", style: { fontSize: "16px", color: "#4F5356" } },
        ],
        v2: [
          { value: "群青色", style: { fontSize: "16px", color: "#A3B4F7" } },
          { value: "深青色", style: { fontSize: "16px", color: "#9CBAB9" } },
          { value: "粉色", style: { fontSize: "16px", color: "#F4B1DC" } },
          { value: "白色", style: { fontSize: "16px", color: "#FAFAFA" } },
          { value: "黑色", style: { fontSize: "16px", color: "#4F5356" } },
        ],
        v3: [
          { value: "群青色", style: { fontSize: "16px", color: "#A3B4F7" } },
          { value: "深青色", style: { fontSize: "16px", color: "#9CBAB9" } },
          { value: "白色", style: { fontSize: "16px", color: "#FAFAFA" } },
          { value: "黑色", style: { fontSize: "16px", color: "#4F5356" } },
        ],
        v4: [
          { value: "群青色", style: { fontSize: "16px", color: "#A3B4F7" } },
          { value: "深青色", style: { fontSize: "16px", color: "#9CBAB9" } },
          { value: "白色", style: { fontSize: "16px", color: "#FAFAFA" } },
          { value: "黑色", style: { fontSize: "16px", color: "#4F5356" } },
        ],
      },
    },
    {
      label: "机型特色",
      icon: getIcon("1-9"),
      style: { height: "150px" },
      type: "group-text",
      props: { direction: "normal", separate: true },
      renderTypeAsKey: [],
      data: {
        v1: [
          { value: "iOS 18", style: { fontSize: "10px"} },
          { value: "人脸识别", style: { fontSize: "10px"}  },
          { value: "X轴线性马达", style: { fontSize: "10px"}  },
          { value: "IP68", style: { fontSize: "10px"}  },
          { value: "灵动岛", style: { fontSize: "10px"}  },
          { value: "HDR显示", style: { fontSize: "10px"}  },
          { value: "NFC", style: { fontSize: "10px"}  },
          { value: "Apple 智能", style: { fontSize: "10px"}  },
          { value: "USB 2", style: { fontSize: "10px"}  },
          { value: "MsgSafe", style: { fontSize: "10px"}  },
          { value: "Type-C", style: { fontSize: "10px"}  },
          { value: "单频卫星", style: { fontSize: "10px"}  },
        ],
        v2: [
          { value: "iOS 18", style: { fontSize: "10px"}  },
          { value: "人脸识别", style: { fontSize: "10px"}  },
          { value: "X轴线性马达", style: { fontSize: "10px"}  },
          { value: "IP68" , style: { fontSize: "10px"} },
          { value: "灵动岛", style: { fontSize: "10px"}  },
          { value: "HDR显示", style: { fontSize: "10px"}  },
          { value: "NFC", style: { fontSize: "10px"}  },
          { value: "Apple 智能", style: { fontSize: "10px"}  },
          { value: "USB 2", style: { fontSize: "10px"}  },
          { value: "MsgSafe", style: { fontSize: "10px"}  },
          { value: "Type-C", style: { fontSize: "10px"}  },
          { value: "单频卫星", style: { fontSize: "10px"}  },
        ],
        v3: [
          { value: "iOS 18", style: { fontSize: "10px"}  },
          { value: "相机控制按键", style: { color: "#43CF7C", fontSize: "10px" } },
          { value: "人脸识别", style: { fontSize: "10px"}  },
          { value: "X轴线性马达", style: { fontSize: "10px"}  },
          { value: "IP68", style: { fontSize: "10px"}  },
          { value: "灵动岛", style: { fontSize: "10px"}  },
          { value: "HDR显示", style: { fontSize: "10px"}  },
          { value: "NFC", style: { fontSize: "10px"}  },
          { value: "Apple 智能", style: { fontSize: "10px"}  },
          { value: "USB 3", style: { color: "#43CF7C", fontSize: "10px" } },
          { value: "MsgSafe", style: { fontSize: "10px"}  },
          { value: "Type-C", style: { fontSize: "10px"}  },
          { value: "双频卫星", style: { color: "#43CF7C", fontSize: "10px" } },
        ],
        v4: [
          { value: "iOS 18", style: { fontSize: "10px"}  },
          { value: "相机控制按键", style: { color: "#43CF7C",fontSize: "10px" } },
          { value: "人脸识别", style: { fontSize: "10px"}  },
          { value: "X轴线性马达", style: { fontSize: "10px"}  },
          { value: "IP68", style: { fontSize: "10px"}  },
          { value: "灵动岛", style: { fontSize: "10px"}  },
          { value: "HDR显示", style: { fontSize: "10px"}  },
          { value: "NFC", style: { fontSize: "10px"}  },
          { value: "Apple 智能", style: { fontSize: "10px"}  },
          { value: "USB 3", style: { color: "#43CF7C", fontSize: "10px" } },
          { value: "MsgSafe", style: { fontSize: "10px"}  },
          { value: "Type-C", style: { fontSize: "10px"}  },
          { value: "双频卫星", style: { color: "#43CF7C",fontSize: "10px" } },
        ],
      },
    },
    {
      label: "官方售价",
      type: "group-text",
      icon: getIcon("1-10"),
      props: { direction: "vertical", card: true, cardBgColor: "#fff" },
      renderTypeAsKey: [],
      style: { height: "232px" },
      data: {
        v1: [
          { value: "<p style='color: #FF7A7A;font-size: 16px'>5999元</p><p style='font-size: 10px;'>8G+128G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>6999元</p><p style='font-size: 10px'>8G+256G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>8999元</p><p style='font-size: 10px'>8G+512G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>\\</p>", style: { fontSize: "16px" }, isHtml: true },

        ],
        v2: [
          { value: "<p style='color: #FF7A7A;font-size: 16px'>6999元</p><p style='font-size: 10px'>8G+128G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>7999元</p><p style='font-size: 10px'>8G+256G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>9999元</p><p style='font-size: 10px'>8G+512G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>\\</p>", style: { fontSize: "16px" }, isHtml: true },

        ],
        v3: [
          { value: "<p style='color: #FF7A7A;font-size: 16px'>7999元</p><p style='font-size: 10px'>8G+128G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>8999元</p><p style='font-size: 10px'>8G+256G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>10999元</p><p style='font-size: 10px'>8G+512G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>12999元</p><p style='font-size: 10px'>8G+1T</p>", style: { fontSize: "16px" }, isHtml: true },

        ],
        v4: [
          { value: "<p style='color: #FF7A7A;font-size: 16px'>\\</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>9999元</p><p style='font-size: 10px'>8G+256G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>11999元</p><p style='font-size: 10px'>8G+512G</p>", style: { fontSize: "16px" }, isHtml: true },
          { value: "<p style='color: #FF7A7A;font-size: 16px'>12999元</p><p style='font-size: 10px'>8G+1T</p>", style: { fontSize: "16px" }, isHtml: true },

        ],
      },
    },
  ],
});

const usePosterStore = defineStore("poster", {
  state: (): State => ({
    currentPosterId: "",
    poster: [DefaultData1(), DefaultData2()],
  }),
  getters: {
    currentPostInfo(state) {
      if (!state.currentPosterId) return;
      return state.poster.find((item) => item.id === state.currentPosterId);
    },
  },
  actions: {
    setCurrentPoster(payload: string) {
      this.currentPosterId = payload;
    },
    addPoster(title: string = "默认标题") {
      this.poster.push({
        id: uid(20, "----"),
        tag: "--",
        title: "默认标题",
        posterTitle: title,
        platIcon: DefaultData1().platIcon,
        copyright: DefaultData1().copyright,
        subTitle: "--",
        tagCaption: "---",
        tips: DefaultData1().tips,
        width: 810,
        height: 1080,
        rows: DefaultData1().rows,
        columns: DefaultData1().columns,
      });
      this.currentPosterId = this.poster[this.poster.length - 1].id;
    },
    delPoster(idx: number) {
      this.poster.splice(idx, 1);
    },
  },
  persist: true,
});

export default usePosterStore;
