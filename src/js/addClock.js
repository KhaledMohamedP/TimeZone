var createClock = require("./createClock.js");
var clockView = document.getElementsByClassName("clockView")[0];


function addClockToDom(hour, minute, amPm, city, indexId){
  var clockDom = transformStringToDOM(require("../template/clock-template.html"));
  var clock = createClock(clockDom);
  // Setting 
  
    // hour
  var hourInput = clock.getElementsByClassName("hourInput")[0];
  hourInput.value = hour; 
  hourInput.onchange();

    // minute
  var minuteInput = clock.getElementsByClassName("minuteInput")[0];
  minuteInput.value = minute; 
  minuteInput.onchange();

    // am or pm 
  var am = clock.getElementsByClassName("am")[0];
  var pm = clock.getElementsByClassName("pm")[0];
  if(amPm.toLowerCase() === "pm"){
    pm.click();
  } else {
    am.click(); 
  }
    // Location text
  var location = clock.getElementsByClassName("location")[0];
  location.innerHTML = city;

  // add to the dom view 
  clockView.appendChild(clock);
  return clock;
}

function transformStringToDOM(str) {
    var elm = document.createElement("div");
    elm.innerHTML = str;
    return elm.children[0];
}

module.exports = addClockToDom; 