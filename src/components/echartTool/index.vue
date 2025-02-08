<template>
  <div class="chart-tool-container">
    <div class="tool-handle-container">
      <el-row>
        <el-button
          icon="el-icon-refresh-left"
          circle
          title="重置"
          @click="handleResetOption"
        ></el-button>
        <el-popover placement="right" width="300" trigger="click">
          <div class="tool-collapse-container">
            <el-collapse>
              <!-- 画布设置 -->
              <chart-config>
                <slot name="chartConfig"></slot>
              </chart-config>
              <!-- 颜色设置 -->
              <color-config :color-options="dicOption.chartColor">
                <slot name="colorConfig"></slot>
              </color-config>
              <!-- 标题设置 -->
              <title-config v-if="hasTitleConfig">
                <slot name="titleConfig"></slot>
              </title-config>
              <!-- 图例设置 -->
              <legend-config v-if="hasLegendConfig">
                <slot name="legendConfig"></slot>
              </legend-config>
              <!-- 提示框 -->
              <tooltip-config v-if="hasTooltipConfig">
                <slot name="tooltipConfig"></slot>
              </tooltip-config>
              <!-- X轴设置 -->
              <xaxis-config v-if="hasXAxisConfig">
                <slot name="xaxisConfig"></slot>
              </xaxis-config>
              <!-- Y轴设置 -->
              <yaxis-config v-if="hasYAxisConfig">
                <slot name="yaxisConfig"></slot>
              </yaxis-config>
              <!-- 图表设置 -->
              <series-config ref="series"></series-config>
            </el-collapse>
          </div>
          <template #reference>
            <el-button icon="el-icon-s-tools" circle title="图表编辑">
            </el-button>
          </template>
        </el-popover>
      </el-row>
    </div>
    <div class="chart-container">
      <div class="chart-content" :style="contentStyle" style="padding: 5px">
        <v-chart
          ref="vChart"
          :option="localOption"
          :style="contentStyle"
          :autoresize="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import 'echarts'
import VChart from 'vue-echarts'
import { dicOption, defaultOption } from './config'
import chartConfig from './chartConfig.vue'
import colorConfig from './colorConfig.vue'
import titleConfig from './titleConfig.vue'
import legendConfig from './legendConfig.vue'
import tooltipConfig from './tooltipConfig.vue'
import xaxisConfig from './xaxisConfig.vue'
import yaxisConfig from './yaxisConfig.vue'
import seriesConfig from './seriesConfig.vue'

export default {
  name: 'EchartTool',
  provide() {
    return {
      toolRoot: this,
    }
  },
  components: {
    VChart,
    chartConfig,
    colorConfig,
    titleConfig,
    tooltipConfig,
    legendConfig,
    xaxisConfig,
    yaxisConfig,
    seriesConfig,
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      dicOption,
      initOption: {},
      localOption: {},
    }
  },
  computed: {
    contentStyle() {
      const { localOption } = this
      return {
        width: localOption.chartWidth
          ? this.parseToPxText(localOption.chartWidth)
          : '800px',
        height: localOption.chartHeight
          ? this.parseToPxText(localOption.chartHeight)
          : '500px',
      }
    },
    hasTitleConfig() {
      const { localOption } = this
      return !!localOption.title
    },
    hasLegendConfig() {
      const { localOption } = this
      return !!localOption.legend
    },
    hasTooltipConfig() {
      const { localOption } = this
      return !!localOption.tooltip
    },
    hasXAxisConfig() {
      const { localOption } = this
      return localOption.xAxis && this._.isPlainObject(localOption.xAxis)
    },
    hasYAxisConfig() {
      const { localOption } = this
      return localOption.yAxis && this._.isPlainObject(localOption.yAxis)
    },
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return
        this.localOption = this.mergeDefault(newVal)
      },
      immediate: true,
      deep: true,
    },
    localOption: {
      handler(newVal) {
        this.$emit('update:option', newVal)
      },
      deep: true,
    },
  },
  methods: {
    filterSeries(config, type) {
      if (config && config.series) {
        return config.series.filter((item) => item.type === type)
      } else {
        return []
      }
    },
    getSeriesTypeIndex(config, type) {
      if (config && config.series) {
        const arr = []
        config.series.forEach((item, index) => {
          if (item.type === type) {
            arr.push(index)
          }
        })
        return arr
      } else {
        return []
      }
    },
    deepClean(obj) {
      return this._.transform(obj, (result, value, key) => {
        // 递归处理对象或数组
        if (this._.isObject(value) && !this._.isDate(value)) {
          // 排除日期等特殊对象
          value = this.deepClean(value)
        }
        // 定义保留条件：非空且不是空对象/数组
        const isEmpty = this._.isObject(value) ? this._.isEmpty(value) : false
        if (
          !this._.isNil(value) &&
          value !== '' &&
          !isEmpty &&
          !this._.isNaN(value)
        ) {
          result[key] = value
        }
      })
    },
    parseToPxText(num) {
      let temp = ''
      if (typeof num === 'number') {
        temp = num
      }
      if (typeof num === 'string') {
        if (/^\d+(?:px)?$/.test(num)) {
          temp = parseInt(num, 10)
        } else {
          temp = num
        }
      }
      return `${temp}px`
    },
    mergeDefault(obj) {
      const cloneObj = this._.cloneDeep(obj)
      const mergedOptions = {}
      // 排除掉color配置
      const tempObj = this._.omit(cloneObj, ['color'])

      const { chartWidth, chartHeight } = defaultOption

      Object.keys(tempObj).forEach((key) => {
        if (Object.hasOwn(tempObj, key)) {
          if (
            this._.isPlainObject(defaultOption[key]) &&
            this._.isPlainObject(tempObj[key])
          ) {
            mergedOptions[key] = this._.merge(
              {},
              defaultOption[key],
              tempObj[key]
            )
          } else {
            mergedOptions[key] = tempObj[key]
          }
        }
      })
      mergedOptions.chartWidth = mergedOptions.chartWidth || chartWidth
      mergedOptions.chartHeight = mergedOptions.chartHeight || chartHeight
      // 没有配置颜色则用默认颜色
      mergedOptions.color = obj.color || defaultOption.color

      return mergedOptions
    },
    handleResetOption() {
      this.localOption = this.mergeDefault(this.initOption)
      this.$refs.series.resetConfig()
    },
    handleSetOption() {
      this.$refs.vChart.clear()
      this.$refs.vChart.setOption(this.localOption)
    },
  },
  mounted() {
    this.initOption = this._.cloneDeep(this.option)
  },
}
</script>

<style>
.chart-tool-container {
  width: 810px;
  border: 2px solid;
  margin: 0 auto;
}
.chart-tool-container .tool-handle-container {
  background-color: #f7f7f7;
}
.chart-tool-container .chart-container {
  overflow: auto;
}
.chart-tool-container .tool-handle-container .el-row {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  padding: 5px 0;
}
.tool-collapse-container {
  max-height: 500px;
  overflow: hidden auto;
}
.tool-collapse-container .el-collapse-item__content {
  padding: 5px 0 10px;
}
.tool-collapse-container .tool-title {
  color: #303133;
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  line-height: 2;
}
.tool-collapse-container .tool-group .tool-title {
  font-size: 12px;
}
.tool-collapse-container .tool-group + .flex-content {
  margin-top: 10px;
}
.tool-collapse-container .tool-group .tool-group_content {
  margin: 5px 15px 0;
}
.tool-collapse-container .flex-content {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}
.tool-collapse-container .flex-content:not(:last-child) {
  margin-bottom: 10px;
}
.tool-collapse-container .chart-content {
  margin: 0 auto;
}
.tool-collapse-container .tool-sub-title {
  flex: none;
  min-width: 45px;
  text-align: left;
}
.tool-collapse-container .font-base {
  font-size: 12px;
  color: #606266;
}

.tool-margin {
  margin: 0 8px;
  padding-bottom: 8px;
}
.tool-setting-item:not(:last-child) {
  border-bottom: 1px solid #ebeef5;
}

/* 颜色下拉显示卡 */
.xy-select-color .el-select-dropdown__item {
  height: auto;
  line-height: normal;
  padding: 5px 15px 8px;
}
.xy-select-color .color_span {
  display: inline-block;
  width: 18px;
  height: 16px;
  border-radius: 1px;
}
.xy-select-color .field {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  flex-flow: column;
}
.xy-select-color .field__label {
  flex: none;
  box-sizing: border-box;
  text-align: left;
  word-wrap: break-word;
}
.xy-select-color .field__value {
  display: flex;
  max-width: 180px;
  flex-wrap: wrap;
}
</style>
