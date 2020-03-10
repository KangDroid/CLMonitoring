/**
 * Update General View : Close everything except for General!
 */
function showGeneral() {
    // close all Except for general information
    document.getElementById("cpu_real").style.display = "none";
    document.getElementById("cpu_real").style.visibility = "hidden";

    // Show General Information
    document.getElementById("general_review").style.display = "inline";
    document.getElementById("general_review").style.visibility = "visible";
}

/**
 * Update CPU Status View : Close everything except for CPU Status!
 */
function showCPUStatus() {
    // Close all except for CPU Information
    document.getElementById("general_review").style.display = "none";
    document.getElementById("general_review").style.visibility = "hidden";

    // Show this
    document.getElementById("cpu_real").style.display = "inline";
    document.getElementById("cpu_real").style.visibility = "visible";
}