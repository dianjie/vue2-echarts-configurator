<template>
  <!-- 颜色设置 -->
  <div class="el-collapse-item">
    <div class="flex-content el-collapse-item__header">
      <span class="tool-title">颜色</span>
      <el-select
        :value="currentColor.colors"
        @change="handleChange"
        popper-class="xy-select-color"
      >
        <el-option
          v-if="currentColor.hasColor && !currentColor.isDefault"
          label="自定义配色"
          :value="currentColor.colors"
        >
          <div class="field">
            <div class="field__label">自定义配色</div>
            <div class="field__value">
              <span
                class="color_span"
                v-for="(item, index) in currentColor.colors.slice(0, 20)"
                :key="index"
                :style="{ background: item }"
              ></span>
            </div>
          </div>
        </el-option>
        <el-option
          v-for="item in colorOptions"
          :key="item.name"
          :label="item.name"
          :value="item.colors"
        >
          <div class="field">
            <div class="field__label">
              {{ item.name }}
            </div>
            <div class="field__value">
              <span
                class="color_span"
                v-for="(item, index) in item.colors.slice(0, item.length)"
                :key="index"
                :style="{ background: item }"
              ></span>
            </div>
          </div>
        </el-option>
      </el-select>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  inject: ['toolRoot'],
  props: {
    colorOptions: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  computed: {
    localOption() {
      return this.toolRoot.localOption
    },
    currentColor() {
      const { localOption, colorOptions } = this
      if (!localOption.color) return { hasColor: false }
      const strColor = JSON.stringify(localOption.color)
      const findItem = colorOptions.find((item) => {
        return JSON.stringify(item.colors) === strColor
      })
      return {
        hasColor: true,
        isDefault: findItem && findItem.colors,
        colors: findItem ? findItem.colors : localOption.color,
      }
    },
  },
  methods: {
    handleChange(val) {
      this.toolRoot.localOption.color = val
    },
  },
}
</script>
