<template>
  <!-- 饼图设置 -->
  <div class="tool-setting-item" v-if="hasConfigData">
    <span class="tool-title">饼图</span>
    <div class="tool-margin">
      <div class="flex-content font-base">
        <span class="tool-sub-title">南丁格尔图模式</span>
        <el-select v-model="config.roseType" clearable>
          <el-option
            v-for="item in toolRoot.dicOption.roseTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="flex-content font-base">
        <span class="tool-sub-title">半径</span>
        <el-input-number
          v-model="config.radius"
          :controls="true"
          :step="0.1"
          :max="1"
          :min="0.1"
        ></el-input-number>
      </div>
      <div class="flex-content font-base">
        <span class="tool-sub-title">
          内半径
          <el-tooltip
            class="item"
            effect="dark"
            content="设置该值则为环图"
            placement="top-start"
          >
            <i class="el-icon-warning"></i>
          </el-tooltip>
        </span>
        <el-input-number
          v-model="config.innerRadius"
          :controls="true"
          :step="0.1"
          :max="1"
          :min="0.1"
        ></el-input-number>
      </div>
      <div class="flex-content font-base">
        <span class="tool-sub-title">扇区间隔</span>
        <el-input-number
          v-model="config.padAngle"
          :controls="true"
          :min="0"
        ></el-input-number>
      </div>
      <div class="flex-content font-base">
        <span class="tool-sub-title">扇区圆角</span>
        <el-input-number
          v-model="config.itemStyle.borderRadius"
          :controls="true"
          :min="0"
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
                v-for="item in toolRoot.dicOption.piePositionList"
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
  mixins: [mixins('pie')],
  data() {
    const init = {
      label: {
        show: false,
        position: '',
      },
      itemStyle: {
        borderRadius: undefined,
      },
      radius: undefined,
      innerRadius: undefined,
      padAngle: undefined,
      roseType: '',
    }
    return {
      resting: false,
      initConfig: this._.cloneDeep(init),
      config: this._.cloneDeep(init),
    }
  },
  methods: {
    handleConfigChange() {
      if (!this.hasConfigData || this.resting) {
        this.resting = false
        return
      }
      const cleanConfig = this.toolRoot.deepClean(this.config)
      const { radius, innerRadius } = cleanConfig
      const lastConfig = {
        ...cleanConfig,
        ...(radius && {
          radius: innerRadius
            ? [`${innerRadius * 100}%`, `${radius * 100}%`]
            : `${radius * 100}%`,
        }),
      }

      const { currentFilterConfig, initFilterConfig, typeIndexs } = this
      for (let index = 0; index < currentFilterConfig.length; index++) {
        const item = currentFilterConfig[index]
        this.updateFilterConfig(
          item,
          initFilterConfig[index],
          lastConfig,
          typeIndexs[index]
        )
      }
      this.toolRoot.handleSetOption()
    },
  },
}
</script>
