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

function columnChart(data) {
  let chart = {
    chart: {
      type: 'column',
      backgroundColor: 'transparent',
      options3d: {
        enabled: true,
        alpha: 0,
        beta: 20,
        viewDistance: 45,
        depth: 0
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
    plotOptions: {
      column: {
        stacking: 'normal',
        depth: 25
      }
    },
    legend:{
      enabled: false
    },
    xAxis: {
      categories: data.name,
      min:0, //别忘了这里
      max:7,
      gridLineWidth: 0
    },
    yAxis: {
      min: 0,
      allowDecimals: false,
      title: {
        text: null
      }
    },
    series: data.data,
    scrollbar: {
      enabled: true
    }
  }
  return chart
}

function barChart(data) {
  let chart = {
    chart: {
      type: 'bar',
      backgroundColor: 'transparent',
      options3d: {
        enabled: true,
        alpha: 0,
        beta: -15,
        viewDistance: 100,
        depth: 0
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
    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          color: '#999999'
        }
      }
    },
    legend:{
      enabled: false
    },
    tooltip:{
      followPointer: true,
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b>{point.y}</b>'
    },
    xAxis: {
      categories: data.name,
      gridLineWidth: 0,
      opposite: true
    },
    yAxis: {
      min: 0,
      reversed: true,
      allowDecimals: false,
      gridLineWidth: 0,
      labels: {
				enabled: false
			},
      title: {
        text: null
      }
    },
    series: data.data,
  }
  return chart
}
export function getIllegalChart(option) {
  const gChart = pieChart(option)
  return gChart
}

export function getUnitChart(data) {
  const cChart = columnChart(data)
  return cChart
}

export function getAnalysisChart(data) {
  const bChart = barChart(data)
  return bChart
}