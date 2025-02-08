<template>
  <!-- 画布设置 -->
  <el-collapse-item>
    <template #title>
      <span class="tool-title">画布</span>
    </template>
    <div class="flex-content font-base">
      <span class="tool-sub-title">宽度</span>
      <el-input-number
        v-model="localOption.chartWidth"
        :controls="true"
        :min="1"
      ></el-input-number>
    </div>
    <div class="flex-content font-base">
      <span class="tool-sub-title">高度</span>
      <el-input-number
        v-model="localOption.chartHeight"
        :controls="true"
        :min="1"
      ></el-input-number>
    </div>
    <slot></slot>
  </el-collapse-item>
</template>

<script>
export default {
  inject: ['toolRoot'],
  computed: {
    localOption() {
      return this.toolRoot.localOption
    },
  },
}
</script>
