<template>
  <li
    :class="[
      'move cursor-pointer hover:bg-gray-100 py-1 px-4',
      { 'bg-gray-100': currentId === item.id },
    ]"
    @click="$emit('setCurrent')"
  >
    <div
      class="border border-gray-300 text-gray-500 bg-white handle rounded-lg h-8 w-full px-2 flex items-center gap-2"
    >
      <ElIcon class="handle cursor-move"><Sort /></ElIcon>
      <div class="flex-1 min-w-0">
        <el-tooltip
          v-if="!isEditing"
          placement="right"
          :enterable="false"
          :hide-after="0"
          :offset="80"
          :content="item.posterTitle"
        >
          <span class="line-clamp-1 text-sm">{{ item.posterTitle }}</span>
        </el-tooltip>

        <el-input
          v-else
          v-model="item.posterTitle"
          size="small"
          @blur="isEditing = false"
          autofocus
        />
      </div>
      <div>
        <el-button
          :icon="Edit"
          type="primary"
          text
          link
          @click.stop="isEditing = true"
        />
        <el-button
          class="!ml-1"
          :icon="Delete"
          type="danger"
          text
          link
          @click.stop="$emit('del')"
        />
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ElButton, ElIcon, ElInput, ElTooltip } from "element-plus";
import { Edit, Sort, Delete } from "@element-plus/icons-vue";

import type { PosterItem } from "@/store/poster";

import { ref } from "vue";

interface Props {
  currentId: string;
  item: PosterItem;
}
interface Emit {
  (e: "add"): void;
  (e: "del"): void;
  (e: "setCurrent"): void;
}

defineProps<Props>();
defineEmits<Emit>();

const isEditing = ref(false);
</script>

<style scoped></style>
