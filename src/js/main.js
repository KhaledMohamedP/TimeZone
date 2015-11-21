var createClock = require("./createClock.js")
require("../style/style.css");

if (typeof document !== "undefined") {
    var clockView = document.getElementsByClassName("clockView")[0];
    // var clock2 = document.getElementsByClassName("clock")[0];
    // createClock(clock);
    // createClock(clock2);
    var clockDom = transformStringToDOM(require("../template/clock-template.html"));
    var clock = createClock(clockDom);
    clockView.appendChild(clock);

    var clockDom = transformStringToDOM(require("../template/clock-template.html"));
    var clock = createClock(clockDom);
    clockView.appendChild(clock);
}



function transformStringToDOM(str){
    var elm = document.createElement("div");
    elm.innerHTML = str;
    return elm.children[0]; 
}
