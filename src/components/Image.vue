<template>
  <el-upload
    :auto-upload="false"
    :show-file-list="false"
    @change="onChange"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <div
      v-else
      class="border border-dashed border-gray-700 rounded-md w-full h-full flex justify-center items-center"
    >
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
import { isObject } from "radash";

const $props = defineProps<ImageProps<T>>();

const getValue = () => {
  const value = $props.data[$props.valueKey];
  return isObject(value) ? (value as unknown as ValueType).value : value;
};

const imageUrl = ref(getValue());

const onChange = (upload: UploadFile) => {
  handleReaderFile(upload.raw as File);
};

const handleReaderFile = (file: File) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = e.target?.result;
    imageUrl.value = data as string;
    // @ts-ignore
    $props.data[$props.valueKey] = isObject($props.data[$props.valueKey])
      ? { ...$props.data[$props.valueKey], value: data }
      : data;
  };
  reader.readAsDataURL(file);
};

watch(
  () => $props.data[$props.valueKey],
  () => {
    imageUrl.value = getValue();
  },
  { deep: true }
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
