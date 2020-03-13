var fileinputval;
var boolean;
var updateAuto;
var chartupdateTime;

// File Structure Information START
var cpu_frequency_array_info = 0;
var temperature_information = 1;
var overall_load_info = 2;
var disk_usage_info = 3;
var uptime_info = 4;
// File Structure Information END

var ip_addr = "192.168.0.19";

/*
function changeUpdateRate() {
    var updateVal = document.getElementById("update_interval");
    switch(updateVal.value) {
        case "realtime":
            // Clear default interval;
            clearInterval(updateAuto);

            // Set new interval
            updateAuto = setInterval(loadUpdate, 1000);

            // hide update button
            var updateButton = document.getElementById("manual_update");
            updateButton.style.visibility = "hidden";
            updateButton.style.display = "None";
        break;
        case "five_secs":
            // Clear default interval;
            clearInterval(updateAuto);

            // Set new interval
            updateAuto = setInterval(loadUpdate, 5000);
            var updateButton = document.getElementById("manual_update");
            updateButton.style.visibility = "hidden";
            updateButton.style.display = "None";
        break;
        case "10_secs":
            // Clear default interval;
            clearInterval(updateAuto);

            // Set new interval
            updateAuto = setInterval(loadUpdate, 10000);
            var updateButton = document.getElementById("manual_update");
            updateButton.style.visibility = "hidden";
            updateButton.style.display = "None";
        break;
        case "manual":
            // Clear default interval;
            clearInterval(updateAuto);
            var updateButton = document.getElementById("manual_update");
            updateButton.style.visibility = "visible";
            updateButton.style.display = "inline";
        break;
    }
}*/

/**
 * Update each data when first page load
 */

function updateChartData() {
    updateTemperatureGraph();
    updateFrequencyGraph();
    updateChart();
}

function everyFive() {
    // First update;
    initFrequencyGraph(); // only once;
    loadUpdate();
    updateChartData();
    updateAuto = setInterval(loadUpdate, 5000);
    chartupdateTime = setInterval(updateChartData, 10000);
}
function loadUpdate() {
    updateOverallLoad();
    updateDiskUsage();
    updateUptime();
}

function updateDiskUsage() {
    var callbackDU = function() {
        var percentage_disk = parseInt(fileinputval[disk_usage_info]);
        var document_disk = document.getElementById("overall_disk_usage");
        var document_pgbar = document.getElementById("overall_disk_usage_pgbar");
        document_disk.innerHTML = percentage_disk + "%";
        document_pgbar.style.width = percentage_disk + "%";
    }
    getText(callbackDU);
}

function updateUptime() {
    var callbackUptime = function() {
        var uptime_realval = parseInt(fileinputval[uptime_info]); // This is seconds
        var uptime_day = parseInt(uptime_realval / (3600 * 24)); uptime_realval = uptime_realval % (3600 * 24);
        var uptime_hour = parseInt(uptime_realval/3600); uptime_realval = uptime_realval % 3600; 
        var uptime_min = parseInt(uptime_realval / 60); uptime_realval = uptime_realval % 60;
        var last_string = uptime_day + "D " + uptime_hour + "H " + uptime_min + "M " + uptime_realval + "S";
        var doc_uptime = document.getElementById("uptime_realval");
        doc_uptime.innerHTML = last_string;
        
        // Total Charge
        var charge_doc = document.getElementById("total_charges");
        charge_doc.innerHTML = "$" + ((parseInt(fileinputval[4]) * 0.001)).toFixed(2);
    };
    getText(callbackUptime);
}

function updateOverallLoad() {
    var callbackF = function() {
        var test = parseFloat(fileinputval[overall_load_info]).toFixed(2);
        //console.log(typedef test);
        var overall_load = document.getElementById("overall_percentage");
        var percentage_bg = document.getElementById("progressbar_overall_load");
        percentage_bg.style.width= test + "%";
        overall_load.innerHTML = test + "%";
    };
    getText(callbackF);
}

// From here, for profile.html

function setEveryFive() {
    // First update one.
    updateSimpleInfo();
    updateAuto = setInterval(updateSimpleInfo, 5000);
}

function fetchData(string_what) {
    // Should return integer.
    switch(string_what) {
        case "total_limit":
            var callbackUptime = function() {
                var uptime_realval = parseInt(fileinputval[uptime_info]); // This is seconds
                var retval = (uptime_realval * 0.001).toFixed(2);
                var limit = 1000.00;
                var percentage = parseInt((retval/limit) * 100);
                document.getElementById("simple_total_limit").innerHTML = percentage + "%";
                document.getElementById("simple_cl_pgbar").style.width = percentage + "%";
            };
            getText(callbackUptime);
        break;
        case "load_percentage":
            var callbackSimpleLoad = function() {
                var test = parseFloat(fileinputval[overall_load_info]);
                console.log(test);
                var percentage = test.toFixed(2);
                document.getElementById("simple_load_percentage").innerHTML = percentage + "%";
                document.getElementById("simple_load_pgbar").style.width = percentage + "%";
            };
            getText(callbackSimpleLoad);
        break;
        case "disk_percentage":
            var callbackSimpleDisk = function() {
                var percentage_disk = parseInt(fileinputval[disk_usage_info]);
                document.getElementById("simple_disk_percentage").innerHTML = percentage_disk + "%";
                document.getElementById("simple_disk_pgbar").style.width = percentage_disk + "%";
            };
            getText(callbackSimpleDisk);
        break;
        default:
        return -1;
    }
}

function updateSimpleInfo() {
    var limit = 1000.00;
    var current = "$100.00"; //document.getElementById("total_charges").innerHTML;
    // remove $
    current = current.slice(1);
    var percentage = parseInt(((current / limit) * 100));
    
    // Update HTML Element - Total Charges Limit
    fetchData("total_limit");
    
    // Update HTML Element - Load
    fetchData("load_percentage");

    // Update HTML Element - Disk Usage
    fetchData("disk_percentage");
}


/*function updateDetailedNode() {
    var callbackFunction = function () {
        // Get Load Data(5th in array index)
        // Format: ["0.36", "0.46", "0.46", "1/173", "32743"]
        var test = fileinputval[5].split(" ");

        // Parse CPU Information
        for (var i = 0; i < 4; i++) {
            var cpu_load = document.getElementById("cpu_load_" + i);
            cpu_load.innerHTML = test[0] * 100 + "%";

            var cpu_frequency = document.getElementById("cpu_frequency_" + i);
            cpu_frequency.innerHTML = fileinputval[i] + "Ghz";
        }
    }
    getText(callbackFunction);
}*/


/**
 * Parse data from Node's Server, show it to HTML!
 * Parsed Data format is: ["1.2", "1.2", "1.2", "1.2", "47.236", "0.49 0.52 0.48 2/174 31638", "", ""]
 */
function getText(callBack) {
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", "http://" + ip_addr +"/cpu_log", true);
    txtFile.onreadystatechange = function() {
        if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
            if (txtFile.status === 200) {  // Makes sure it's found the file.
                fileinputval = txtFile.responseText.split("\n");
                callBack();
            } else if (txtFile.status === 0) {
                // File Not found or exception, Fallback!
                if (boolean != false) {
                    alert("Node Monitoring Service is not running or present.");
                    boolean = false;
                }
            }
        }
    }
    txtFile.send(null);
}

/**
 * Read file from "file"
 */
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status == 0) {
                fileinputval = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}