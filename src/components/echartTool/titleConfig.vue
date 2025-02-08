<template>
  <!-- 标题设置 -->
  <el-collapse-item>
    <template #title>
      <span class="tool-title">标题</span>
      <el-switch
        v-model="localOption.title.show"
        style="margin-left: 10px"
        @click.stop.native
      ></el-switch>
    </template>
    <div class="flex-content font-base">
      <span class="tool-sub-title">标题</span>
      <el-input
        :disabled="!localOption.title.show"
        v-model="localOption.title.text"
      ></el-input>
    </div>
    <div class="flex-content font-base">
      <span class="tool-sub-title">副标题</span>
      <el-input
        :disabled="!localOption.title.show"
        v-model="localOption.title.subtext"
      ></el-input>
    </div>
    <div class="flex-content font-base">
      <span class="tool-sub-title">位置</span>
      <el-select
        :disabled="!localOption.title.show"
        v-model="localOption.title.position"
        filterable
        clearable
        @change="handleTitlePositonChange"
      >
        <el-option
          v-for="item in toolRoot.dicOption.positionList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <slot></slot>
  </el-collapse-item>
</template>

<script>
import { positonConfig } from './config'

export default {
  inject: ['toolRoot'],
  computed: {
    localOption() {
      return this.toolRoot.localOption
    },
  },
  methods: {
    handleTitlePositonChange(val) {
      this.toolRoot.localOption = this._.merge(this.toolRoot.localOption, {
        title: positonConfig[val || 'left-top'],
      })
    },
  },
}
</script>
