<template>
  <el-dialog
    v-model="show"
    title="添加海报"
    width="350px"
    append-to-body
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" hide-required-asterisk>
      <el-form-item
        prop="value"
        :rules="[{ required: true, message: '必填项' }]"
      >
        <el-input v-model.trim="form.value" clearable placeholder="海报名称"/>
      </el-form-item>
      <el-form-item>
        <div class="flex-1 flex justify-center">
          <el-button type="primary" @click="onSubmit(form)">确定</el-button>
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
  ElInput,
  ElButton,
  type FormInstance,
} from "element-plus";

import { ref, reactive } from "vue";

interface Emit {
  (e: "add", value: string): void;
}
const $emit = defineEmits<Emit>();

const show = ref(false);

const form = reactive({
  value: "",
});

const formRef = ref<FormInstance>();
const onSubmit = (payload: { value: string }) => {
  formRef.value?.validate().then((validate) => {
    if (!validate) return;
    $emit("add", payload.value);
    handleClose();
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
