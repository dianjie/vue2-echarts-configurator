<template>
  <!-- 图表设置 -->
  <el-collapse-item>
    <template #title>
      <span class="tool-title">
        图表设置
        <el-tooltip
          class="item"
          effect="dark"
          content="清空则恢复为初始设置"
          placement="top-start"
        >
          <i class="el-icon-warning"></i>
        </el-tooltip>
      </span>
    </template>
    <!-- 折线图设置 -->
    <line-config ref="line"></line-config>
    <!-- 饼图 -->
    <pie-config ref="pie"></pie-config>
    <!-- 柱状图 -->
    <bar-config ref="bar"></bar-config>
    <!-- 散点图 -->
    <scatter-config ref="scatter"></scatter-config>
    <slot></slot>
  </el-collapse-item>
</template>

<script>
import lineConfig from './series/lineConfig.vue'
import pieConfig from './series/pieConfig.vue'
import barConfig from './series/barConfig.vue'
import scatterConfig from './series/scatterConfig.vue'

export default {
  inject: ['toolRoot'],
  components: {
    lineConfig,
    pieConfig,
    barConfig,
    scatterConfig,
  },
  data() {
    return {
      seriesTypes: ['line', 'pie', 'bar', 'scatter'],
    }
  },
  computed: {
    localOption() {
      return this.toolRoot.localOption
    },
  },
  methods: {
    resetConfig() {
      this.seriesTypes.forEach((item) => {
        this.$refs[item].resetConfig()
      })
    },
  },
}
</script>
