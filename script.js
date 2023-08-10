let apiData = getAPI() 

let scatterChart
setTimeout(()=>{
    shuffle()
    renderScatterChart()
    pointsAPI()
},250)

document.querySelector('#gen').addEventListener('click',()=>{
    showQueryPoint()
})

document.querySelector('#ans').addEventListener('click',()=>{
    hypothesis()
})

document.querySelector('#scatterChart').addEventListener('click',(event)=>{
    let yTop = scatterChart.chartArea.top
    let yBottom = scatterChart.chartArea.bottom

    let yMin = scatterChart.scales['y-axis-1'].min
    let yMax = scatterChart.scales['y-axis-1'].max
    let newY = 0

    if (event.offsetY <= yBottom && event.offsetY >= yTop) {
        newY = Math.abs((event.offsetY - yTop) / (yBottom - yTop))
        newY = (newY - 1) * -1
        newY = newY * (Math.abs(yMax - yMin)) + yMin
    }

    let xTop = scatterChart.chartArea.left
    let xBottom = scatterChart.chartArea.right
    let xMin = scatterChart.scales['x-axis-1'].min
    let xMax = scatterChart.scales['x-axis-1'].max+0.47
    let newX = 0

    if (event.offsetX <= xBottom && event.offsetX >= xTop) {
        newX = Math.abs((event.offsetX - xTop) / (xBottom - xTop))
        newX = newX * (Math.abs(xMax - xMin)) + xMin
    }

    console.log(`{x:${newX.toFixed(2)},y:${newY.toFixed(2)},rain:true}`)
})