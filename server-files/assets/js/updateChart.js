var counter = 0;
function updateTemperatureGraph() {
    var callbackTemp = function() {
        var temp = parseFloat(fileinputval[4]).toFixed(2);
        var x = document.getElementById("temperature_graph");
        let chart = x.querySelector('canvas').chart;
        var today = new Date();
        var label_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        addData(chart, label_time, temp);
    }
    getText(callbackTemp);
}
function updateChart() {
    var callbackLoad = function() {
        var percentage = parseFloat(fileinputval[5]).toFixed(2);
        let chart = document.querySelector('canvas').chart;
        var today = new Date();
        var label_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        addData(chart, label_time, percentage);
    };
    getText(callbackLoad);
}
    
function removeAll(iter) {
    let chart = document.querySelector('canvas').chart;
    for (var i = 0; i < iter; i++) {
        removeData(chart);
    }
}
    
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        if (counter > 7) {
            dataset.data.shift();
            chart.data.labels.shift();
        }
        dataset.data.push(data);
        counter++;
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}