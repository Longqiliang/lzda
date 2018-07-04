<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import { queryDisciplinaryAction } from '@/api/article'

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
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.getAction()
  },
  methods: {
    getAction() {
      queryDisciplinaryAction().then(res => {
        const data = res.data
        if (data.success) {
          if (data.data.length) {
            console.log(data.data)
            this.initChart(data.data)
          }
        }
      })
    },
    initChart(data) {
      const legendArr = []
      for (const leg of data) {
        legendArr.push(leg.name)
      }
      this.chart = echarts.init(this.$el, null, { renderer: 'svg' })
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
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
        legend: {
          left: 'center',
          calculable: true,
          bottom: '0',
          padding: [3,3],
          tooltip: {
            show: true
          },
          textStyle: {
            fontSize: 14
          },
          data: legendArr
        },
        hoverAnimation: false,
        silent: true,
        series: [
          {
            name: '违纪行为',
            type: 'pie',
            selectedMode: 'single',
            radius: [55, 95],
            center: ['50%', '40%'],
            data: data,
            itemStyle: {
              normal: {
                borderColor: 'white'
              }
            },
            label: {
              normal: {
                position: 'inner',
                formatter: '{d}%\n\n{c}',
                textStyle: {
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 14
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            }
          }
        ]
      })
    }
  }
}
</script>
