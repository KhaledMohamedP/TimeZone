var createClock = require("./createClock.js");
var clockView = document.getElementsByClassName("clockView")[0];


function addClockToDom(hour, minute, pmAm, city){
  var clockDom = transformStringToDOM(require("../template/clock-template.html"));
  var clock = createClock(clockDom);

  // Setting 
    // hour
  var hourInput = clock.getElementsByClassName("hourInput")[0];
  hourInput.value = hour; 
  hourInput.onkeyup();
    // minute
  var minuteInput = clock.getElementsByClassName("minuteInput")[0];
  minuteInput.value = minute; 
  minuteInput.onkeyup();

    // am or pm 
  var am = clock.getElementsByClassName("am")[0];
  var pm = clock.getElementsByClassName("pm")[0];
  if(pmAm.toLowerCase() == "pm"){
    pm.click();
  } else {
    am.click(); 
  }
    // Location text
  var location = clock.getElementsByClassName("location")[0];
  location.innerHTML = city;

  // add to the dom view 
  clockView.appendChild(clock);
}

function transformStringToDOM(str) {
    var elm = document.createElement("div");
    elm.innerHTML = str;
    return elm.children[0];
}

// Add orginal clock 
var now = new Date(); 
var hours = now.getHours(); 
var Hours12Format = hours % 12;
Hours12Format = Hours12Format === 0 ? 12: Hours12Format; 
// 
var amAm = (now.hours >= 12) ? "pm" : "am";
addClockToDom(Hours12Format, now.getMinutes(), amAm, "new york");

module.exports = addClockToDom; 