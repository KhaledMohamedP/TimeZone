var createClock = require("./createClock.js");
var clockAPI = require("./clockAPI.js");
var clockView = document.getElementsByClassName("clockView")[0];

function transformStringToDOM(str) {
    var elm = document.createElement("div");
    elm.innerHTML = str;
    return elm.children[0];
}


function addClockToDom(hour, minute, amPm, city, indexId) {
    var clockDom = transformStringToDOM(require("../template/clock-template.html"));
    var clock = createClock(clockDom);
    // Setting 

    // Set time 
    clockAPI.setTime(clock, hour, minute);
    // Set am or pm 
    clockAPI.setAmPm(clock, amPm);
    // Location text
    clockAPI.setCity(clock, city);

    // add to the dom view 
    clockView.appendChild(clock);
    return clock;
}


module.exports = addClockToDom;
