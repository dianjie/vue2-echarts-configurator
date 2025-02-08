<template>
  <div>
    <span class="tool-title">折线图</span>
    <echart-tool :option.sync="option"> </echart-tool>
    <span class="tool-title" style="margin-top: 20px; display: block">
      正负条形图
    </span>
    <echart-tool :option.sync="option1"> </echart-tool>
    <span class="tool-title" style="margin-top: 20px; display: block">
      嵌套环形图
    </span>
    <echart-tool :option.sync="option2"> </echart-tool>
  </div>
</template>

<script>
import EchartTool from '@/components/echartTool/index.vue'

export default {
  name: 'EchartDemo',
  components: {
    EchartTool,
  },
  data() {
    return {
      option: {
        title: {
          text: 'Stacked Line',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      },
      option1: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        legend: {
          data: ['Profit', 'Expenses', 'Income'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'value',
          },
        ],
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
            },
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
        ],
        series: [
          {
            name: 'Profit',
            type: 'bar',
            label: {
              show: true,
              position: 'inside',
            },
            emphasis: {
              focus: 'series',
            },
            data: [200, 170, 240, 244, 200, 220, 210],
          },
          {
            name: 'Income',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
            },
            emphasis: {
              focus: 'series',
            },
            data: [320, 302, 341, 374, 390, 450, 420],
          },
          {
            name: 'Expenses',
            type: 'bar',
            stack: 'Total',
            label: {
              show: true,
              position: 'left',
            },
            emphasis: {
              focus: 'series',
            },
            data: [-120, -132, -101, -134, -190, -230, -210],
          },
        ],
      },
      option2: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          data: [
            'Direct',
            'Marketing',
            'Search Engine',
            'Email',
            'Union Ads',
            'Video Ads',
            'Baidu',
            'Google',
            'Bing',
            'Others',
          ],
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              position: 'inner',
              fontSize: 14,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1548, name: 'Search Engine' },
              { value: 775, name: 'Direct' },
              { value: 679, name: 'Marketing', selected: true },
            ],
          },
          {
            name: 'Access From',
            type: 'pie',
            radius: ['45%', '60%'],
            labelLine: {
              length: 30,
            },
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#F6F8FC',
              borderColor: '#8C8D8E',
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: '#6E7079',
                  lineHeight: 22,
                  align: 'center',
                },
                hr: {
                  borderColor: '#8C8D8E',
                  width: '100%',
                  borderWidth: 1,
                  height: 0,
                },
                b: {
                  color: '#4C5058',
                  fontSize: 14,
                  fontWeight: 'bold',
                  lineHeight: 33,
                },
                per: {
                  color: '#fff',
                  backgroundColor: '#4C5058',
                  padding: [3, 4],
                  borderRadius: 4,
                },
              },
            },
            data: [
              { value: 1048, name: 'Baidu' },
              { value: 335, name: 'Direct' },
              { value: 310, name: 'Email' },
              { value: 251, name: 'Google' },
              { value: 234, name: 'Union Ads' },
              { value: 147, name: 'Bing' },
              { value: 135, name: 'Video Ads' },
              { value: 102, name: 'Others' },
            ],
          },
        ],
      },
    }
  },
}
</script>

<style scoped></style>
