<template>
  <!-- 柱状图设置 -->
  <div class="tool-setting-item" v-if="hasConfigData">
    <span class="tool-title">柱状图</span>
    <div class="tool-margin">
      <div class="flex-content font-base">
        <span class="tool-sub-title"> 条宽度 </span>
        <el-input-number
          v-model="config.barWidth"
          :controls="true"
          :min="10"
        ></el-input-number>
      </div>
      <div class="tool-group">
        <span class="tool-title">标签</span>
        <div class="tool-group_content">
          <div class="flex-content font-base">
            <span class="tool-sub-title">是否显示</span>
            <el-switch v-model="config.label.show"></el-switch>
          </div>
          <div class="flex-content font-base">
            <span class="tool-sub-title">位置</span>
            <el-select v-model="config.label.position" clearable>
              <el-option
                v-for="item in toolRoot.dicOption.barPositionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from './mixin'
export default {
  mixins: [mixins('bar')],
  data() {
    const init = {
      label: {
        show: false,
        position: '',
      },
      barWidth: undefined,
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
