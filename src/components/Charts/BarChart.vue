<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
const animationDuration = 3000

export default {
  props: {
    className: {
      type: String,
      default: 'chart-box'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: {
      type: Array
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart(this.data)
  },
  methods: {
    initChart(data) {
      this.chart = echarts.init(this.$el, null, { renderer: 'svg' })
      const xAxisData = []
      const zzData = []
      const wzData = []
      const djData = []
      const sfData = []
      const zwData = []
      for (const da of data) {
        xAxisData.push(da.unit_name)
        zzData.push(da.zzcount)
        wzData.push(da.wzcount)
        djData.push(da.djcount)
        sfData.push(da.yscount)
        zwData.push(da.zwcount)
      }
      const seriesLen = data.length
      let sliderEnd = 40
      if (seriesLen < 6) {
        sliderEnd = 100
      }
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        toolbox: {
          show: true,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 0,
            end: sliderEnd,
            height: 15,
            bottom: 10
          },
          {
            type: 'inside',
            show: true,
            height: 15,
            xAxisIndex: [0],
            start: 1,
            end: 20
          }
        ],
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '组织措施情况',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            animationDuration,
            data: zzData
          },
          {
            name: '受到问责情况',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            animationDuration,
            data: wzData
          },
          {
            name: '受到党纪处分情况',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            animationDuration,
            data: djData
          },
          {
            name: '移送司法情况',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            animationDuration,
            data: sfData
          },
          {
            name: '受到政务处分情况',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            animationDuration,
            data: zwData
          }
        ]
      })
    }
  }
}
</script>
