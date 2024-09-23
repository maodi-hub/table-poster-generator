<template>
  <el-dialog
    v-model="show"
    title="导出海报"
    width="250px"
    append-to-body
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" hide-required-asterisk>
      <el-form-item
        prop="value"
        :rules="[{ required: true, message: '必填项' }]"
      >
        <div class="flex-1 text-center">
          <el-input-number
            v-model="form.value"
            :min="1"
            placeholder="导出倍数"
            controls-position="right"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <div class="flex-1 flex justify-center">
          <el-button type="primary" @click="onSubmit(form)">导出</el-button>
          <el-button @click="handleClose">取消</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInputNumber,
  ElButton,
  type FormInstance,
} from "element-plus";

import { ref, reactive } from "vue";

import DomToImage from "dom-to-image";

const show = ref(false);

const form = reactive({
  value: 1,
});

const formRef = ref<FormInstance>();
const onSubmit = (payload: { value: number }) => {
  formRef.value?.validate().then((validate) => {
    if (!validate) return;
    getPoster(payload.value);
  });
};
const getPoster = (rate: number) => {
  const el = document.querySelector("#container") as HTMLElement;
  const scale = (810 * rate) / el.offsetWidth;
  const dpi = window.devicePixelRatio;
  DomToImage.toPng(el, {
    height: el.offsetHeight * scale * dpi,
    width: el.offsetWidth * scale * dpi,
    style: {
      transform: "scale(" + scale * dpi + ")",
      transformOrigin: "top left",
      width: el.offsetWidth + "px",
      height: el.offsetHeight + "px",
    },
  }).then((url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "海报.png";
    a.click();
  });
};

const handleOpen = () => {
  show.value = true;
};

const handleClose = () => {
  formRef.value?.resetFields();
  show.value = false;
};

defineExpose({
  handleClose,
  handleOpen,
});
</script>

<style scoped></style>
