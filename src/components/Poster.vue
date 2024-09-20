<script setup lang="ts">
import Container from "./PosterContainer.vue";
import Header from "./PosterContainerHeader.vue";
import Table from "./Table.vue";
import Footer from "./PosterContainerFooter.vue";
import type { DataType, TableEmit } from "@/components/type";

import usePosterStore from "@/store/poster";

defineEmits<TableEmit<DataType>>();

const $poster = usePosterStore();
</script>

<template>
  <Container :width="$poster.currentPostInfo?.width || 1080" :height="$poster.currentPostInfo?.height || 1440">
    <Header
      class="mb-12"
      :tag="$poster.currentPostInfo?.tag || ''"
      :tips="$poster.currentPostInfo?.tips || []"
      :title="$poster.currentPostInfo?.title || ''"
      :subTitle="$poster.currentPostInfo?.subTitle || ''"
      :tagCaption="$poster.currentPostInfo?.tagCaption || ''"
      @headerClick="$emit('headerClick')"
    />
    <section class="px-6">
      <Table
        :columns="$poster.currentPostInfo?.columns ?? []"
        :rows="$poster.currentPostInfo?.rows || []"
        @open="(...arg) => $emit('open', ...arg)"
      />
    </section>
    <Footer
      :copyright="$poster.currentPostInfo?.copyright || ''"
      :icon="$poster.currentPostInfo?.platIcon.value || ''"
      :iconBgStyle="$poster.currentPostInfo?.platIcon?.style || {}"
      @click="$emit('headerClick')"
    />
  </Container>
</template>

<style></style>
