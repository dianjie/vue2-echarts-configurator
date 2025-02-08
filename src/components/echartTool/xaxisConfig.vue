<template>
  <!-- X轴 -->
  <el-collapse-item>
    <template #title>
      <span class="tool-title">X轴</span>
      <el-switch
        v-model="localOption.xAxis.show"
        style="margin-left: 10px"
        @click.stop.native
      ></el-switch>
    </template>
    <div class="tool-group">
      <span class="tool-title">标题</span>
      <div class="tool-group_content">
        <div class="flex-content font-base">
          <span class="tool-sub-title">标题</span>
          <el-input v-model="localOption.xAxis.name"></el-input>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">距离轴线</span>
          <el-input-number
            v-model="localOption.xAxis.nameGap"
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
          <el-switch v-model="localOption.xAxis.axisLine.show"></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">颜色</span>
          <el-color-picker
            :disabled="!localOption.xAxis.axisLine.show"
            v-model="localOption.xAxis.axisLine.lineStyle.color"
            size="small"
          ></el-color-picker>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">宽度</span>
          <el-input-number
            :disabled="!localOption.xAxis.axisLine.show"
            v-model="localOption.xAxis.axisLine.lineStyle.width"
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
          <el-switch v-model="localOption.xAxis.axisTick.show"></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">是否朝内</span>
          <el-switch
            :disabled="!localOption.xAxis.axisTick.show"
            v-model="localOption.xAxis.axisTick.inside"
          ></el-switch>
        </div>
        <!-- <div class="flex-content font-base">
          <span class="tool-sub-title">颜色</span>
          <el-color-picker
            :disabled="!localOption.xAxis.axisTick.show"
            v-model="localOption.xAxis.axisTick.lineStyle.color"
            size="small"
          ></el-color-picker>
        </div> -->
        <div class="flex-content font-base">
          <span class="tool-sub-title">宽度</span>
          <el-input-number
            :disabled="!localOption.xAxis.axisTick.show"
            v-model="localOption.xAxis.axisTick.lineStyle.width"
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
          <el-switch v-model="localOption.xAxis.axisLabel.show"></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">是否朝内</span>
          <el-switch
            :disabled="!localOption.xAxis.axisLabel.show"
            v-model="localOption.xAxis.axisLabel.inside"
          ></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">旋转角度</span>
          <el-slider
            style="flex: 1; margin-left: 15px"
            v-model="localOption.xAxis.axisLabel.rotate"
            :min="-90"
            :max="90"
          ></el-slider>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">宽度</span>
          <el-input-number
            :disabled="!localOption.xAxis.axisLabel.show"
            v-model="localOption.xAxis.axisLabel.width"
            :controls="true"
            :min="1"
          ></el-input-number>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">超出宽度</span>
          <el-select v-model="localOption.xAxis.axisLabel.overflow" clearable>
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
          <el-switch v-model="localOption.xAxis.splitLine.show"></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">颜色</span>
          <el-color-picker
            :disabled="!localOption.xAxis.splitLine.show"
            v-model="localOption.xAxis.splitLine.lineStyle.color"
            size="small"
          ></el-color-picker>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">宽度</span>
          <el-input-number
            :disabled="!localOption.xAxis.splitLine.show"
            v-model="localOption.xAxis.splitLine.lineStyle.width"
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
            v-model="localOption.xAxis.minorSplitLine.show"
          ></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">颜色</span>
          <el-color-picker
            :disabled="!localOption.xAxis.minorSplitLine.show"
            v-model="localOption.xAxis.minorSplitLine.lineStyle.color"
            size="small"
          ></el-color-picker>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">宽度</span>
          <el-input-number
            :disabled="!localOption.xAxis.minorSplitLine.show"
            v-model="localOption.xAxis.minorSplitLine.lineStyle.width"
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
          <el-switch v-model="localOption.xAxis.splitArea.show"></el-switch>
        </div>
        <div class="flex-content font-base">
          <span class="tool-sub-title">反向坐标轴</span>
          <el-switch v-model="localOption.xAxis.inverse"></el-switch>
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
