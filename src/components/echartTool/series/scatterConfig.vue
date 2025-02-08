<template>
  <!-- 散点图设置 -->
  <div class="tool-setting-item" v-if="hasConfigData">
    <span class="tool-title">散点图</span>
    <div class="tool-margin">
      <div class="flex-content font-base">
        <span class="tool-sub-title">标记图形</span>
        <el-select v-model="config.symbol" clearable>
          <el-option
            v-for="item in toolRoot.dicOption.scatterSymbolList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from './mixin'
export default {
  mixins: [mixins('scatter')],
  data() {
    const init = {
      symbol: '',
    }
    return {
      resting: false,
      initConfig: this._.cloneDeep(init),
      config: this._.cloneDeep(init),
    }
  },
  methods: {},
}
</script>
