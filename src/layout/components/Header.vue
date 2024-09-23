<template>
  <header class="flex justify-center bg-white shadow h-12 z-10">
    <div class="h-full flex items-center" v-if="!!$poster.currentPosterId">
      <el-button :icon="Download" text type="primary" @click="handleOpen" />
    </div>
    <ExportModal ref="exportModalRef"/>
  </header>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { Download } from "@element-plus/icons-vue";
import ExportModal from "@/components/ExportModal.vue";

import { shallowRef } from "vue";
import usePosterStore from "@/store/poster";

const $poster = usePosterStore();

const exportModalRef = shallowRef<InstanceType<typeof ExportModal>>();
const handleOpen = () => {
  exportModalRef.value?.handleOpen();
};
</script>

<style scoped></style>
