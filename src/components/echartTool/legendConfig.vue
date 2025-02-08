<template>
  <!-- 图例设置 -->
  <el-collapse-item>
    <template #title>
      <span class="tool-title">图例</span>
      <el-switch
        v-model="localOption.legend.show"
        style="margin-left: 10px"
        @click.stop.native
      ></el-switch>
    </template>
    <div class="flex-content font-base">
      <span class="tool-sub-title">排列方向</span>
      <el-select
        v-model="localOption.legend.orient"
        :disabled="!localOption.legend.show"
        filterable
        clearable
      >
        <el-option
          v-for="item in toolRoot.dicOption.orientList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="flex-content font-base">
      <span class="tool-sub-title">类型</span>
      <el-select
        v-model="localOption.legend.type"
        :disabled="!localOption.legend.show"
        filterable
        clearable
      >
        <el-option
          v-for="item in toolRoot.dicOption.legendTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="flex-content font-base">
      <span class="tool-sub-title">位置</span>
      <el-select
        v-model="localOption.legend.position"
        :disabled="!localOption.legend.show"
        filterable
        clearable
        @change="handleLegendPositonChange"
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
    handleLegendPositonChange(val) {
      this.toolRoot.localOption = this._.merge(this.toolRoot.localOption, {
        legend: positonConfig[val || 'left-top'],
      })
    },
  },
}
</script>
