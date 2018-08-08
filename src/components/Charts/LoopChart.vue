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
      const label = {
        show: false
      }
      const labelLine ={
        show: false
      } 
      const legendArr = []
      for (const leg of data) {
        legendArr.push(leg.name)
        if(leg.value == 0) {
          leg.label = label,
          leg.labelLine = labelLine
        }
      }
      console.log(data)
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
          type: 'scroll',
          orient: 'vertical',
          right: 80,
          calculable: true,
          top: 'center',
          padding: [40,20],
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
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
            radius: [55, 130],
            center: ['30%', '50%'],
            data: data,
            itemStyle: {
              normal: {
                borderColor: 'white',
                borderWidth: 2
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
