<template>
  <header class="flex justify-center bg-white shadow h-12 z-10">
    <div class="h-full flex items-center" v-if="!!$poster.currentPosterId">
      <el-button :icon="Download" text type="primary" @click="getPoster" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { Download } from "@element-plus/icons-vue";

import toImage from "@/utils/toImage";
import usePosterStore from "@/store/poster";

const $poster = usePosterStore();

const getPoster = () => {
  toImage(document.querySelector("#container") as HTMLElement).then(
    ([_, ctx]) => {
      const canvas = document.createElement("canvas");
      canvas.width = 1440;
      canvas.height = 1080;
      const ctx2 = canvas.getContext("2d");
      ctx2?.drawImage(ctx, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        // 文件下载
        const a = document.createElement("a");
        const url = URL.createObjectURL(blob!);
        a.href = url;
        a.download = "海报.png";
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
    }
  );
};
</script>

<style scoped></style>
