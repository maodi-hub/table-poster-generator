<template>
  <header class="pl-11 pt-10 pr-6 flex">
    <div class="flex-1 min-w-0 can-edit" @click="$emit('headerClick')">
      <div class="font-bold text-4xl flex gap-4">
        <span>{{ title }}</span>
        <div class="relative">
          <div class="absolute left-[110px] -top-[13px]">
            <img
              src="@/assets/tag.png"
              alt=""
              width="100"
              height="36"
              class="max-w-[unset]"
            />
            <div
              class="absolute top-0 right-0 w-[80px] h-full text-base text-center text-black rotate-[11deg] pt-3"
            >
              {{ tag }}
            </div>
          </div>
          <img src="@/assets/caption.png" width="131" height="33" />
        </div>
      </div>
      <div class="text-3xl">{{ subTitle }}</div>
    </div>
    <div
      class="flex-shrink-0 can-edit text-[8px] leading-[1.5em] text-right"
      @click="$emit('headerClick')"
    >
      <div>
        <template v-for="item in tips" :key="item.value">
          <p v-if="!item.isHtml && !!item.value"  :style="item.style">{{ item.value }}</p>
          <p v-else-if="!item.value" class="h-[1.5em]" :style="item.style">{{ item.value }}</p>
          <p v-else-if="item.isHtml"  :style="item.style" v-html="item.value"></p>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ValueType } from "./type";

interface Props {
  tag: string;
  title: string;
  subTitle: string;
  tagCaption: string;
  tips: (ValueType & { isHtml?: boolean })[]
}
interface Emit {
  (e: "headerClick"): void;
}
defineProps<Props>();
defineEmits<Emit>();
</script>

<style scoped></style>
