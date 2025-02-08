<template>
  <!-- 折线图设置 -->
  <div class="tool-setting-item" v-if="hasConfigData">
    <span class="tool-title">折线图</span>
    <div class="tool-margin">
      <div class="tool-group">
        <span class="tool-title">线</span>
        <div class="tool-group_content">
          <div class="flex-content font-base">
            <span class="tool-sub-title">线宽</span>
            <el-input-number
              v-model="config.lineStyle.width"
              :controls="true"
              :min="1"
            ></el-input-number>
          </div>
          <div class="flex-content font-base">
            <span class="tool-sub-title">类型</span>
            <el-select v-model="config.lineStyle.type" clearable>
              <el-option
                v-for="item in toolRoot.dicOption.lineStyleList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
      <div class="tool-group">
        <span class="tool-title">标记</span>
        <div class="tool-group_content">
          <div class="flex-content font-base">
            <span class="tool-sub-title">图形</span>
            <el-select v-model="config.symbol" clearable>
              <el-option
                v-for="item in toolRoot.dicOption.lineSymbolList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="flex-content font-base">
            <span class="tool-sub-title">大小</span>
            <el-input-number
              v-model="config.symbolSize"
              :controls="true"
              :min="1"
            ></el-input-number>
          </div>
        </div>
      </div>
      <div class="flex-content font-base">
        <span class="tool-sub-title">是否平滑</span>
        <el-switch v-model="config.smooth"></el-switch>
      </div>
      <div class="flex-content font-base">
        <span class="tool-sub-title">显示标签</span>
        <el-switch v-model="config.label.show"></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from './mixin'
export default {
  mixins: [mixins('line')],
  data() {
    const init = {
      symbol: '',
      symbolSize: undefined,
      label: {
        show: false,
      },
      lineStyle: {
        width: undefined,
        type: '',
      },
      smooth: false,
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
