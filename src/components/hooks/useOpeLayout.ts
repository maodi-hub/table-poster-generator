import { type LayoutConfig, textConfig, groupConfig, groupTextConfig, imgConfig } from "./settingConfig";

import { ref, computed } from "vue";

export function useOpeLayout() {
  const layoutConfig: Record<string, LayoutConfig[]> = {
    text: textConfig,
    group: groupConfig,
    'group-text': groupTextConfig,
    img: imgConfig
  };
  const layout = ref<LayoutConfig[]>(layoutConfig["text"]);
  const handleSetLayout = (type: string) => {
    layout.value = layoutConfig[type];
  };
  return {
    layout: computed(() => layout.value),
    handleSetLayout
  }
}
