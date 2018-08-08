<template>
  <div :class="className" :style="{height:height,width:width}" :data="data"></div>
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
    data: {}
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
      this.chart = echarts.init(this.$el)
      const legendArr = []
      if (data) {
        for (const leg of data) {
          legendArr.push(leg.name)
        }
      }
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          right: '30%',
          bottom: '10%',
          top: '10%'
        },
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false
            },
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#ff5b01'
                    },
                    {
                      offset: 1,
                      color: '#66bf04'
                    }
                  ]
                },
                width: 1
              }
            },
            axisLabel: {
              fontSize: 16,
              showMaxlabel: true,
              showMinlabel: true,
              formatter: function(value) {
                if (value.length > 10) {
                  return value.substring(0, 10) + '\n' + value.substr(10)
                } else {
                  return value
                }
              }
            },
            data: legendArr
          }
        ],
        xAxis: {
          type: 'value',
          show: false,
          inverse: true
        },
        series: [
          {
            type: 'bar',
            data: data,
            label: {
              normal: {
                show: true,
                position: 'insideLeft',
                formatter: '{c}',
                color: '#fff'
              }
            }
          }
        ],
        visualMap: {
          type: 'continuous',
          max: 10,
          min: 1,
          show: false,
          dimension: 0,
          inRange: {
            color: ['#66bf04', '#fea000', '#ff5b01']
          }
        }
      })
    }
  }
}
</script>