function shuffle(){
    for(let i=apiData.length-1; i>0; i--){
        let j = Math.floor(Math.random() * i)
        let temp = apiData[i]
        apiData[i] = apiData[j]
        apiData[j] = temp
      }
}

function pointsAPI(){
    apiData.forEach((dataPoint)=>{
        scatterChart.data.datasets[0].data.push({
            x: dataPoint.x,
            y: dataPoint.y
        })
        dataPoint.rain?scatterChart.data.datasets[0].pointBackgroundColor[scatterChart.data.datasets[0].data.length-1]='blue':scatterChart.data.datasets[0].pointBackgroundColor[scatterChart.data.datasets[0].data.length-1]='red'
        scatterChart.update()
    })
}

function showQueryPoint(){
    scatterChart.data.datasets[0].data.push({
        x: Number(document.querySelector('#x').value),
        y: Number(document.querySelector('#y').value)
    })
    
    scatterChart.data.datasets[0].pointBackgroundColor[scatterChart.data.datasets[0].data.length-1]='lightgreen'
    scatterChart.update()

    document.querySelector('#x').value = ''
    document.querySelector('#y').value = ''
    document.querySelector('#output').innerHTML = ''
}

function hypothesis(){
    let x =  scatterChart.data.datasets[0].data[scatterChart.data.datasets[0].data.length-1].x
    let y =  scatterChart.data.datasets[0].data[scatterChart.data.datasets[0].data.length-1].y
    let wx = 1
    let wy = 1
    let wo = 1
    let alpha = 0.1 // range 0-1

    for(let i=0; i<1000; i++){
        apiData.forEach((dataPoint)=>{
            let actualValue
            dataPoint.rain ? actualValue=1 : actualValue=0
            let estimateValue = activation(dataPoint.x,dataPoint.y,wx,wy,wo)
    
            wx = wx + alpha*(actualValue-estimateValue) * dataPoint.x
            wy = wy + alpha*(actualValue-estimateValue) * dataPoint.y
            wo = wo + alpha*(actualValue-estimateValue) * 1
        })
    }
    console.log(wx,wy,wo,'weights')

    let output = activation(x,y,wx,wy,wo,'output')
    console.log(output,'output')

    output==1 ? scatterChart.data.datasets[0].pointBackgroundColor[scatterChart.data.datasets[0].data.length-1]='blue' : scatterChart.data.datasets[0].pointBackgroundColor[scatterChart.data.datasets[0].data.length-1]='red'
    output==1 ? document.querySelector('#output').innerHTML = 'It will rain' : document.querySelector('#output').innerHTML = 'It will not rain'
    scatterChart.update()

    drawLine(wx,wy,wo)
    accuracy(wx,wy,wo)
}

function activation(x,y,wx,wy,wo,output){
    let dotProduct = (x*wx) + (y*wy) + (wo*1)
    
    if(output){console.log(dotProduct,'dotProduct')}
    
    if(dotProduct>=0){
        return 1
    }
    else{
        return 0
    }
}

function accuracy(wx,wy,wo){
    let samples = apiData.length
    let accurate = 0
    
    apiData.forEach((dataPoint)=>{
        let actualValue
        dataPoint.rain?actualValue=1:actualValue=0
        let estimateValue = activation(dataPoint.x,dataPoint.y,wx,wy,wo)
        if(actualValue==estimateValue){accurate++}
    })

    let accuracy = (accurate/samples)*100
    console.log(`Accuracy:${accuracy}%`) 
    console.log(`Ratio:${accurate}/${samples}`)
}

function drawLine(wx,wy,wo){
    let slope = -wx/wy    
    let constant = -wo/wy 
    console.log(slope,constant, 'slope & constant')

    plugins()
    renderLineChart(slope,constant)  
}   

function renderScatterChart(){
    scatterChart = new Chart(document.querySelector("#scatterChart"), {
        type:'scatter', 
        data: getScatterChartData(),
        options: getScatterChartOptions()  
    })
}

function renderLineChart(slope,constant){
    lineChart = new Chart(document.querySelector("#lineChart"), {
        type:'line', 
        data: getLineChartData(slope,constant),
        options: getLineChartOptions()  
    })
}