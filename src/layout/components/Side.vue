<template>
  <aside class="w-64 bg-white py-4 flex-shrink-0 text-black">
    <h2 class="mb-4 flex justify-between items-center px-4">
      <span>海报列表</span>
      <el-button
        class="p-1 !rounded-lg"
        circle
        :icon="Plus"
        size="small"
        @click="$emit('add')"
      />
    </h2>
    <el-divider class="px-4" />
    <VueDraggable
      v-if="$poster.poster.length"
      v-model="$poster.poster"
      :animation="150"
      handle=".handle"
      tag="menu"
      class="flex flex-col gap-2"
      draggable=".move"
    >
      <template v-for="(item, idx) in $poster.poster" :key="item.id">
        <SideMenuItem
          :current-id="$poster.currentPosterId"
          @set-current="$poster.setCurrentPoster(item.id)"
          :item="item"
          @del="$emit('del', idx)"
          @add="$emit('add')"
        />
      </template>
    </VueDraggable>
    <template v-else>
      <el-empty description="暂无海报" />
    </template>
  </aside>
</template>

<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";
import { ElButton, ElDivider, ElEmpty } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import SideMenuItem from "./SideMenuItem.vue";

import usePosterStore from "@/store/poster";

interface Emit {
  (e: "add"): void;
  (e: "del", idx: number): void;
}
defineEmits<Emit>();

const $poster = usePosterStore();
</script>

<style scoped></style>
