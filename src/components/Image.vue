<template>
  <el-upload
    :auto-upload="false"
    :show-file-list="false"
    @change="onChange"
    @click.stop
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <div v-else class="border border-dashed border-gray-700 rounded-md w-full h-full flex justify-center items-center">
      <el-icon class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </div>
  </el-upload>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ElUpload, ElIcon, type UploadFile } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { ImageProps, ValueType } from "./type";

import { ref, watch } from "vue";

const $props = defineProps<ImageProps<T>>();

const imageUrl = ref(($props.data[$props.valueKey] as ValueType).value);

const onChange = (upload: UploadFile) => {
  handleReaderFile(upload.raw as File);
};

const handleReaderFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = e.target?.result;
    imageUrl.value = data as string;
  };
  reader.readAsDataURL(file);
};

watch(
  () => $props.data[$props.valueKey],
  () => {
    imageUrl.value = ($props.data?.[$props.valueKey] as ValueType)?.value;
  }
);
</script>

<style scoped lang="scss">
:deep(.el-upload) {
  width: 84px;
  height: 81px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
}
</style>
