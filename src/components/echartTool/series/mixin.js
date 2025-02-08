export default (type) => {
  return {
    inject: ['toolRoot'],
    data() {
      return {
        initConfig: {},
      }
    },
    watch: {
      config: {
        handler() {
          this.debouncedConfig()
        },
        deep: true,
      },
    },
    computed: {
      hasConfigData() {
        return this.initFilterConfig.length > 0
      },
      initFilterConfig() {
        const { toolRoot } = this
        return this._.cloneDeep(
          toolRoot.filterSeries(toolRoot.initOption, type)
        )
      },
      currentFilterConfig() {
        const { toolRoot } = this
        return toolRoot.filterSeries(toolRoot.localOption, type)
      },
      typeIndexs() {
        const { toolRoot } = this
        return toolRoot.getSeriesTypeIndex(toolRoot.localOption, type)
      },
      shallowKeys() {
        // 只考虑一层的
        const { initConfig } = this
        return Object.keys(initConfig).filter(
          (key) =>
            typeof initConfig[key] === 'object' && initConfig[key] !== null
        )
      },
    },
    methods: {
      handleConfigChange() {
        if (!this.hasConfigData || this.resting) {
          this.resting = false
          return
        }
        const cleanConfig = this.toolRoot.deepClean(this.config)

        const { currentFilterConfig, initFilterConfig, typeIndexs } = this
        for (let index = 0; index < currentFilterConfig.length; index++) {
          const item = currentFilterConfig[index]
          this.updateFilterConfig(
            item,
            initFilterConfig[index],
            cleanConfig,
            typeIndexs[index]
          )
        }
        this.toolRoot.handleSetOption()
      },
      cleanTempItem(tempItem) {
        const { initConfig } = this
        Object.keys(initConfig).forEach((key) => {
          if (typeof initConfig[key] === 'object' && initConfig[key] !== null) {
            Object.keys(initConfig[key]).forEach((subKey) => {
              // eslint-disable-next-line no-prototype-builtins
              if (tempItem[key] && tempItem[key].hasOwnProperty(subKey)) {
                delete tempItem[key][subKey]
              }
            })
          } else {
            // eslint-disable-next-line no-prototype-builtins
            if (tempItem.hasOwnProperty(key)) {
              delete tempItem[key]
            }
          }
        })
      },
      mergeConfigs(lastConfig, initItem) {
        const newConfig = {}
        Object.keys(this.initConfig).forEach((key) => {
          const value = lastConfig[key] || initItem[key]
          if (value) {
            newConfig[key] = value
          }
        })
        return newConfig
      },
      updateFilterConfig(item, initItem, lastConfig, index) {
        let tempItem = this._.cloneDeep(item)
        // 清除掉初始化的对象含有的值
        this.cleanTempItem(tempItem)

        // 重新合并值
        const newConfig = this.mergeConfigs(lastConfig, initItem)
        tempItem = { ...tempItem, ...newConfig }

        this.updateOther(tempItem, lastConfig, initItem)

        if (this.toolRoot.localOption.series) {
          this.$set(this.toolRoot.localOption.series, index, tempItem)
        }
      },
      updateOther(tempItem, lastConfig, initItem) {
        const { shallowKeys } = this
        // 只考虑一层对象的编辑
        shallowKeys.forEach((item) => {
          if (lastConfig[item]) {
            const temp = this._.cloneDeep(
              initItem[item] || tempItem[item] || {}
            )
            Object.keys(this.initConfig[item]).forEach((key) => {
              const value =
                this._.get(lastConfig, `${item}.${key}`) ||
                this._.get(initItem, `${item}.${key}`)
              if (value) {
                temp[key] = value
              }
            })
            tempItem[item] = temp
          }
        })
      },
      resetConfig() {
        if (!this.hasConfigData) return
        this.resting = true
        this.config = this._.cloneDeep(this.initConfig)
      },
    },
    created() {
      // 使用 Lodash 实现防抖
      this.debouncedConfig = this._.debounce(this.handleConfigChange, 333)
    },
    destroyed() {
      // 移除组件时，取消定时器
      this.debouncedConfig.cancel()
    },
  }
}
