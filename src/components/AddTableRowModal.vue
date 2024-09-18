<template>
  <el-dialog
    v-model="show"
    title="添加行"
    width="450px"
    append-to-body
    @close="handleClose"
  >
    <el-form ref="formRef" :model="form" label-width="80px">
      <el-form-item
        label="行类型"
        prop="type"
        :rules="[{ required: true, message: '必填项' }]"
      >
        <el-radio-group v-model="form.type">
          <el-radio value="group">group</el-radio>
          <el-radio value="group-text">group-text</el-radio>
          <el-radio value="text">text</el-radio>
          <el-radio value="img">img</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="['group', 'group-text'].includes(form.type)"
        label="模式"
        prop="type"
        :rules="[{ required: true, message: '必填项' }]"
      >
        <el-radio-group v-model="form.props.direction">
          <el-radio value="horizontal">水平</el-radio>
          <el-radio value="vertical">垂直</el-radio>
          <el-radio v-if="form.type === 'group-text'" value="normal">
            自适应
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="行名称"
        prop="value"
        :rules="[{ required: true, message: '必填项' }]"
      >
        <el-input v-model.trim="form.value" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form)">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElRadio,
  ElRadioGroup,
  ElInput,
  ElButton,
  type FormInstance,
} from "element-plus";

import { ref, reactive, toRaw } from "vue";

interface Emit {
  (
    e: "add",
    payload: {
      type: string;
      value: string;
      props: any;
    }
  ): void;
}
const $emit = defineEmits<Emit>();

const show = ref(false);

const form = reactive({
  type: "text",
  value: "",
  props: {
    direction: "horizontal",
  },
});

const formRef = ref<FormInstance>();
const onSubmit = (payload: { type: string; value: string; props: any }) => {
  formRef.value?.validate().then((validate) => {
    if (!validate) return;
    $emit("add", { ...toRaw(payload) });
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
