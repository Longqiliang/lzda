function pieChart(option) {
  let chart = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      plotBackgroundColor: 'transparent',
      options3d: {
        enabled: true,
        alpha: 60
      }
    },
    credits:{
      enabled: false
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      pie: {
        depth: 45,
        borderColor: '#fff',
        cursor: 'pointer',
        colors: ['#6eab46', '#4270c1', '#245c8f','#fbbd00', '#5a99d3'],
        dataLabels: {
          format: '{point.name},<br/>{y}',
          style: {
            fontSize: '12px',
            color: '#333',
          },
          backgroundColor: 'transparent',
          connectorColor: "#999"
        }
      },
    },
    series: [{
      name: option.name,
      data: option.data
    }]
  }
  return chart
}

function barChart(data) {
  let chart = {
    chart: {
      type: 'column',
      margin: 75,
      options3d: {
        enabled: true,
        alpha: 0,
        beta: 25,
        depth: 0,
        viewDistance: 0,      // 视图距离，它对于计算角度影响在柱图和散列图非常重要。此值不能用于3D的饼图
        frame: {                // Frame框架，3D图包含柱的面板，我们以X ,Y，Z的坐标系来理解，X轴与 Z轴所形成
          // 的面为bottom，Y轴与Z轴所形成的面为side，X轴与Y轴所形成的面为back，bottom、
          // side、back的属性一样，其中size为感官理解的厚度，color为面板颜色
          bottom: {
            size: 10
          },
          side: {
            size: 1,
            color: 'transparent'
          },
          back: {
            size: 1,
            color: 'transparent'
          }
        }
      },
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      column: {
        depth: 25
      }
    },
    xAxis: {
      categories: Highcharts.getOptions().lang.shortMonths
    },
    yAxis: {
      title: {
        text: null
      }
    },
    series: [{
      name: '销售',
      data: [2, 3, null, 4, 0, 5, 1, 4, 6, 3]
    }]
  }
  return chart
}
export function getIllegalChart(option) {
  const gChart = pieChart(option)
  return gChart
}

export function getUnitChart(data) {
  const bChart = barChart(data)
  return bChart
}