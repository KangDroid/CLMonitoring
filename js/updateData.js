var fileinputval;
var boolean;
var updateAuto;

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
}

/**
 * Update each data when first page load
 */
function everyFive() {
    updateAuto = setInterval(loadUpdate, 5000);
}
function loadUpdate() {
    updateOverallLoad();
    updateDetailedNode();
}

function updateOverallLoad() {
    var callbackF = function() {
        var test = fileinputval[5].split(" ");
        var overall_load = document.getElementById("cpu_overall_load");
        overall_load.innerHTML = test[0] * 100 + "%";
    };
    getText(callbackF);
}

function updateDetailedNode() {
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

    if (boolean == false) {
        // do nothing
        alert("Node Monitoring Service is not running or present.");
    } else {
        getText(callbackFunction);
    }
}

/**
 * Parse data from Node's Server, show it to HTML!
 * Parsed Data format is: ["1.2", "1.2", "1.2", "1.2", "47.236", "0.49 0.52 0.48 2/174 31638", "", ""]
 */
function getText(callBack) {
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", "http://192.168.0.20/cpu_log", true);
    txtFile.onreadystatechange = function() {
        if (txtFile.readyState === 4) {  // Makes sure the document is ready to parse.
            if (txtFile.status === 200) {  // Makes sure it's found the file.
                fileinputval = txtFile.responseText.split("\n")
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