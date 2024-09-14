<template>
  <header class="pl-11 pt-10 pr-6 flex">
    <div class="flex-1 min-w-0">
      <div class="font-bold text-4xl flex gap-4">
        <span>Apple</span>
        <div class="relative">
          <div class="absolute left-[110px] -top-[13px]">
            <img src="@/assets/tag.png" alt="" width="100" height="36" class="max-w-[unset]"/>
            <div class="absolute top-0 right-0 w-[80px] h-full text-base text-center text-black rotate-[11deg] pt-3">{{ tag }}</div>
          </div>
          <img src="@/assets/caption.png" width="131" height="33" />
        </div>
      </div>
      <div class="text-3xl">iPhone16/16Plus/16Pro/16ProMax</div>
    </div>
    <div class="flex-shrink-0 text-xs text-right scale-75 origin-right">
      <div class="mb-5">
        <p>参数来自厂商官方已公布数据以及网友爆料综合得出</p>
        <p>如数据有误请指出</p>
        <p>如需转载请注明出处</p>
        <p>最后做图时间：2024.9.10 10:30</p>
      </div>
      <div>
        <span class="text-[#00BAAD]">水绿色</span>文字，为与前一款机型的差别标记
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  tag: string
}
defineProps<Props>()

</script>

<style scoped></style>
