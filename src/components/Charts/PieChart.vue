<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
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
    name: {
      type: String
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
    this.initChart(this.name, this.data)
  },
  methods: {
    initChart(name, data) {
      this.chart = echarts.init(this.$el, null, { renderer: 'svg' })
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a}<br/>{b} : {c}'
        },
        toolbox: {
          show: true,
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        color: [
          '#569dd3',
          '#ed7d31',
          '#7030a0',
          '#ffc001',
          '#4776c8',
          '#70ad46'
        ],
        series: [
          {
            name: name,
            type: 'pie',
            selectedMode: 'single',
            radius: '60%',
            data: data,
            itemStyle: {
              normal: {
                borderColor: 'white'
              }
            },
            label: {
              normal: {
                formatter: '{b}\n{c}',
                textStyle: {
                  fontWeight: 'bold',
                  fontSize: 15
                }
              }
            }
          }
        ]
      })
    }
  }
}
</script>
