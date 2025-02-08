<template>
  <!-- 提示框 -->
  <div class="el-collapse-item">
    <div class="flex-content el-collapse-item__header">
      <span class="tool-title">提示框</span>
      <el-switch v-model="localOption.tooltip.show"></el-switch>
    </div>
    <slot></slot>
  </div>
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
