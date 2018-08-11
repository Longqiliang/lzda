<template>
  <div :class="className"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock'
// import HighchartsMore from 'highcharts/highcharts-more'
// import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'
// HighchartsMore(Highcharts)
// HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    options: {
      type: Object
    },
    isStock: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = new Highcharts.Chart(this.$el, this.options)
    }
  }
}
</script>

<style>
</style>
