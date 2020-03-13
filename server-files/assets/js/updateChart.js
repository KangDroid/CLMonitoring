var counter = 0;

var frequencyChart;

function initFrequencyGraph() {
    Chart.defaults.global.legend.display = false;
    var chart = document.getElementById("frequency_graph");
    var ctx = chart.getContext('2d');
    // Global Options:
    var data = {
      labels: [],
      datasets: [{
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(225,0,0,0.4)",
          borderColor: "red", // The main line color
          borderCapStyle: 'square',
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "black",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "yellow",
          pointHoverBorderColor: "brown",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          // notice the gap in the data and the spanGaps: true
          data: [],
          spanGaps: true,
        }, {
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(167,105,0,0.4)",
          borderColor: "rgb(167, 105, 0)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "white",
          pointBackgroundColor: "black",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "brown",
          pointHoverBorderColor: "yellow",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          // notice the gap in the data and the spanGaps: false
          data: [],
          spanGaps: false,
        }, {
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(167,105,0,0.4)",
          borderColor: "rgb(167, 105, 0)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "white",
          pointBackgroundColor: "black",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "brown",
          pointHoverBorderColor: "yellow",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          // notice the gap in the data and the spanGaps: false
          data: [],
          spanGaps: false,
        }, {
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(167,105,0,0.4)",
          borderColor: "rgb(167, 105, 0)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "white",
          pointBackgroundColor: "black",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "brown",
          pointHoverBorderColor: "yellow",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 10,
          // notice the gap in the data and the spanGaps: false
          data: [],
          spanGaps: false,
        }
      ]
    };

    // Notice the scaleLabel at the same level as Ticks
    var options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        } 
    };

    // Chart declaration:
    frequencyChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options
    });
    frequencyChart.update();
}

function updateFrequencyGraph() {
    var callbackFM = function() {
        var arrayCPUFreq = fileinputval[cpu_frequency_array_info].split(" ");
        var today = new Date();
        var label_time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        frequencyChart.data.labels.push(label_time);
        if (counter > 21) {
            frequencyChart.data.labels.shift();
        }
        for (var i = 0; i < arrayCPUFreq.length; i++) {
            if (counter > 21) {
                frequencyChart.data.datasets[i].data.shift();
            }
            var temp_freq = parseFloat(arrayCPUFreq[i]).toFixed(1);
            frequencyChart.data.datasets[i].data.push(temp_freq);
        }
        counter++;
        frequencyChart.update();
    }
    getText(callbackFM);
}

function updateTemperatureGraph() {
    var callbackTemp = function() {
        var temp = parseFloat(fileinputval[temperature_information]).toFixed(2);
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
        var percentage = parseFloat(fileinputval[overall_load_info]).toFixed(2);
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
        if (counter > 21) {
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