<template>
  <!-- X轴 -->
  <el-collapse-item>
    <template #title>
      <span class="tool-title">Y轴</span>
      <el-switch
        v-model="localOption.yAxis.show"
        style="margin-left: 10px"
        @click.stop.native
      ></el-switch>
    </template>
    <div class="tool-group">
      <span class="tool-title">标题</span>
      <div class="tool-group_content">
        <div class="flex-content font-base">
          <span class="tool-sub-title">标题</span>
          <el-input v-model="localOption.yAxis.name"></el-input>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">距离轴线</span>
          <el-input-number
            v-model="localOption.yAxis.nameGap"
            :controls="true"
            :min="1"
          ></el-input-number>
        </div>
      </div>
    </div>

    <div class="tool-group">
      <span class="tool-title">轴线</span>
      <div class="tool-group_content">
        <div class="flex-content font-base">
          <span class="tool-sub-title">轴线</span>
          <el-switch v-model="localOption.yAxis.axisLine.show"></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">颜色</span>
          <el-color-picker
            :disabled="!localOption.yAxis.axisLine.show"
            v-model="localOption.yAxis.axisLine.lineStyle.color"
            size="small"
          ></el-color-picker>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">宽度</span>
          <el-input-number
            :disabled="!localOption.yAxis.axisLine.show"
            v-model="localOption.yAxis.axisLine.lineStyle.width"
            :controls="true"
            :min="1"
          ></el-input-number>
        </div>
      </div>
    </div>

    <div class="tool-group">
      <span class="tool-title">刻度</span>
      <div class="tool-group_content">
        <div class="flex-content font-base">
          <span class="tool-sub-title">刻度</span>
          <el-switch v-model="localOption.yAxis.axisTick.show"></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">是否朝内</span>
          <el-switch
            :disabled="!localOption.yAxis.axisTick.show"
            v-model="localOption.yAxis.axisTick.inside"
          ></el-switch>
        </div>
        <!-- <div class="flex-content font-base">
          <span class="tool-sub-title">颜色</span>
          <el-color-picker
            :disabled="!localOption.yAxis.axisTick.show"
            v-model="localOption.yAxis.axisTick.lineStyle.color"
            size="small"
          ></el-color-picker>
        </div> -->
        <div class="flex-content font-base">
          <span class="tool-sub-title">宽度</span>
          <el-input-number
            :disabled="!localOption.yAxis.axisTick.show"
            v-model="localOption.yAxis.axisTick.lineStyle.width"
            :controls="true"
            :min="1"
          ></el-input-number>
        </div>
      </div>
    </div>

    <div class="tool-group">
      <span class="tool-title">刻度标签</span>
      <div class="tool-group_content">
        <div class="flex-content font-base">
          <span class="tool-sub-title">刻度标签</span>
          <el-switch v-model="localOption.yAxis.axisLabel.show"></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">是否朝内</span>
          <el-switch
            :disabled="!localOption.yAxis.axisLabel.show"
            v-model="localOption.yAxis.axisLabel.inside"
          ></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">旋转角度</span>
          <el-slider
            style="flex: 1; margin-left: 15px"
            v-model="localOption.yAxis.axisLabel.rotate"
            :min="-90"
            :max="90"
          ></el-slider>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">宽度</span>
          <el-input-number
            :disabled="!localOption.yAxis.axisLabel.show"
            v-model="localOption.yAxis.axisLabel.width"
            :controls="true"
            :min="1"
          ></el-input-number>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">超出宽度</span>
          <el-select v-model="localOption.yAxis.axisLabel.overflow" clearable>
            <el-option
              v-for="item in toolRoot.dicOption.overflowList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>

    <div class="tool-group">
      <span class="tool-title">分割线</span>
      <div class="tool-group_content">
        <div class="flex-content font-base">
          <span class="tool-sub-title">分割线</span>
          <el-switch v-model="localOption.yAxis.splitLine.show"></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">颜色</span>
          <el-color-picker
            :disabled="!localOption.yAxis.splitLine.show"
            v-model="localOption.yAxis.splitLine.lineStyle.color"
            size="small"
          ></el-color-picker>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">宽度</span>
          <el-input-number
            :disabled="!localOption.yAxis.splitLine.show"
            v-model="localOption.yAxis.splitLine.lineStyle.width"
            :controls="true"
            :min="1"
          ></el-input-number>
        </div>
      </div>
    </div>

    <div class="tool-group">
      <span class="tool-title">次分割线</span>
      <div class="tool-group_content">
        <div class="flex-content font-base">
          <span class="tool-sub-title">次分割线</span>
          <el-switch
            v-model="localOption.yAxis.minorSplitLine.show"
          ></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">颜色</span>
          <el-color-picker
            :disabled="!localOption.yAxis.minorSplitLine.show"
            v-model="localOption.yAxis.minorSplitLine.lineStyle.color"
            size="small"
          ></el-color-picker>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">宽度</span>
          <el-input-number
            :disabled="!localOption.yAxis.minorSplitLine.show"
            v-model="localOption.yAxis.minorSplitLine.lineStyle.width"
            :controls="true"
            :min="1"
          ></el-input-number>
        </div>
      </div>
    </div>

    <div class="tool-group">
      <span class="tool-title">其他设置</span>
      <div class="tool-group_content">
        <div class="flex-content font-base">
          <span class="tool-sub-title">分隔区域</span>
          <el-switch v-model="localOption.yAxis.splitArea.show"></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">反向坐标轴</span>
          <el-switch v-model="localOption.yAxis.inverse"></el-switch>
        </div>
      </div>
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
