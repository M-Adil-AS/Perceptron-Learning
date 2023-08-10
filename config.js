function getScatterChartData(){
  let scatterChartData = {
    datasets: [{
       label: "Rain prediction chart",
       pointBackgroundColor: [],
       data: [],
       pointRadius: 6,
       showLine:false,
       backgroundColor: 'aqua' 
    }]
  }
  return scatterChartData
}
    
function getScatterChartOptions(){
  let scatterChartOptions = {
    maintainAspectRatio: false,    
    legend: {
        labels:{
            fontSize:20
        }
    },
    responsive: true,
    scales: {
      xAxes: [ {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Humidity',
          fontSize: '20'
        },
        ticks: {
            fontSize: '20',
            max:10,
            min:0
        }
      } ],
      yAxes: [ {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Pressure',
          fontSize: '20'
        },
        ticks: {
            fontSize: '20',
            max:10,
            min:0
        }
      } ]
    }
  }
  return scatterChartOptions
} 

function getLineChartData(slope,constant){
  let lineChartData = { 
    labels: [0,1,2,3,4,5,6,7,8,9,10],
    datasets: [{
        label: '',
        function: function(x) { return ((slope*x)+constant) },
        borderColor: "rgba(75, 192, 192, 1)",
        data: [],
        fill: false
    }]
  }
  return lineChartData
}

function getLineChartOptions(){
  let lineChartOptions = {
    maintainAspectRatio: false,   
    legend: {
        labels:{
            fontSize:20,
            boxWidth:0
        }
    },
    elements: {
        point:{
          radius:0
        },
        line: {
            tension: 0,
        }
    },
    responsive: true,
    scales: {
      xAxes: [ {
        display: true,
        scaleLabel: {
          display: true,
          labelString: '',
          fontSize: '20'
        },
        ticks: {
            fontSize: '20',
            max:10,
            min:0
        }, 
        gridLines: {
            display: false,
        }
      } ],
      yAxes: [ {
        display: true,
        scaleLabel: {
          display: true,
          labelString: '',
          fontSize: '20'
        },
        ticks: {
            fontSize: '20',
            max:10,
            min:0
        },
        gridLines: {
            display: false,
        }
      } ]
    }
  }
  return lineChartOptions
}

function plugins(){
  Chart.pluginService.register({
      beforeInit: function(chart){
        if(chart.chart.canvas.id=='lineChart'){
            let data = chart.config.data
            for(let i = 0; i < data.datasets.length; i++) {
                for(let j = 0; j < data.labels.length; j++) {
                    let fct = data.datasets[i].function,
                    x = data.labels[j],
                    y = fct(x)
                    data.datasets[i].data.push(y)
                }
            }
        }  
      },
      beforeDatasetsDraw: function(chartInstance){
        if(chartInstance.chart.canvas.id=='lineChart'){
            let ctx = chartInstance.chart.ctx
            let chartArea = chartInstance.chartArea
            ctx.save()
            ctx.beginPath()
            ctx.rect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top)
            ctx.clip()
        }
      },
      afterDatasetsDraw: function(chartInstance){
          if(chartInstance.chart.canvas.id=='lineChart'){
              chartInstance.chart.ctx.restore()
          }    
      }
  })
}