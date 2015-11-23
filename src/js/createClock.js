function createClock(clockDom) {
    var database = require("./data.js");
    var clockDiv = clockDom.getElementsByClassName("clock")[0];


    // Paints all the hour/minute tips around the clock div
    paintTip(clockDiv);


    // Day: pm/am
    var pm = clockDiv.getElementsByClassName('pm')[0];
    var am = clockDiv.getElementsByClassName('am')[0];
    pm.onclick = function() {
        removeClass(clockDiv, "darkTheme")
        am.className = "am";
        pm.className = "pm active";
        update();
    };
    am.onclick = function() {
        am.className = "am active";
        pm.className = "pm";

        // If darkTheme is not there
        if (clockDiv.className.split(' ').indexOf("darkTheme") === -1) {
            clockDiv.className += " darkTheme"
        }
        update();
    };


    var deleteBtn = clockDiv.getElementsByClassName('close')[0];
    deleteBtn.onclick = function(e) {
        e.stopPropagation();
        var id = clockDom.getAttribute("data-index");
        database.removeTimeZone(id)
    }


    //  Hour input work 
    var hourInput = clockDiv.getElementsByClassName('hourInput')[0];
    var minuteInput = clockDiv.getElementsByClassName('minuteInput')[0];

    hourInput.onchange = function(e) {
        var degree = hourInput.value * 30;
        hourBar.style.transform = "rotate(" + degree + "deg)";
    };
    minuteInput.onchange = function(e) {
        var degree = minuteInput.value * 6;
        minuteBar.style.transform = "rotate(" + degree + "deg)";
    };


    // Clock hour/minutes bar ctrl 
    var hourBar = clockDiv.getElementsByClassName('hourBar')[0];
    var minuteBar = clockDiv.getElementsByClassName('minuteBar')[0];

    // experiment 
    hourBar.addEventListener("mousedown", function(e) {
        clockDiv.addEventListener("mousemove", hourClockMouseMove, false);
    });

    // Minutes Events 
    minuteBar.addEventListener("mousedown", function(e) {
        clockDiv.addEventListener("mousemove", minuteClockMouseMove, false);
    });



    clockDom.onmouseup = function(e) {
        e.stopPropagation();
        clockDiv.removeEventListener("mousemove", hourClockMouseMove, false);
        clockDiv.removeEventListener("mousemove", minuteClockMouseMove, false);
        
        update();
    };

    // mousemove clock function 
    function hourClockMouseMove(e) {
        // So navigating around the clock 
        //   doesn't select/highlight other elements in the page 
        e.preventDefault();

        var degrees = getDegrees(e);
        var inHours = Math.floor(degrees / 30);
        var inDegrees = inHours * 30;
        var hourDegree = inDegrees + 30;
        hourBar.style.transform = "rotate(" + hourDegree + "deg)";
        hourInput.value = hourDegree / 30;

    }

    // mousemove clock function 
    function minuteClockMouseMove(e) {
        // So navigating around the clock 
        //   doesn't select/highlight other elements in the page 
        e.preventDefault();

        var degrees = getDegrees(e);
        var inMinutes = Math.floor(degrees / 6);
        var inDegrees = inMinutes * 6;
        var minuteDegrees = inDegrees + 6;

        minuteBar.style.transform = "rotate(" + minuteDegrees + "deg)";
        minuteInput.value = minuteDegrees / 6 % 60;


        // // Adjsut base on minutes 
        //         // Adjust the hour bar 
        // console.log(degrees);
        // var digit = /\d+/;
        // var degreesInMinuteBar = degrees; 
        // var degreesInHourBar = hourBar.style.transform; 

        // var hrDegrees = digit.exec(degreesInHourBar)[0];
        // hrDegrees = Number.parseInt(hrDegrees);

        // console.log(degreesInHourBar,hrDegrees);
        // var currentHourDegree = Math.floor(hrDegrees / 30) * 30; 
        // var hourBarPrgress = (degreesInMinuteBar / 360) * 30;
        // var nextHourDegree = currentHourDegree + hourBarPrgress;  
        // if(Math.floor(currentHourDegree) === Math.floor(nextHourDegree)){
        //     currentHourDegree += 30;
        // }
        // console.log(nextHourDegree, hourBarPrgress)
        // hourBar.style.transform = "rotate(" + nextHourDegree + "deg)";

    }

    function getDegrees(e) {
        var x = e.pageX - clockDiv.offsetLeft;
        var y = e.pageY - clockDiv.offsetTop;
        var middleX = clockDiv.clientWidth / 2;
        var middleY = clockDiv.clientHeight / 2;

        var cX = x - middleX;
        var cY = middleY - y;

        var angle = Math.atan2(cX, cY) * (180 / Math.PI);

        // Convert degree from -/+ to 0-360 
        var degrees = angle + Math.ceil(-angle / 360) * 360;

        return degrees;
    }

    function update() {
        var clockId = Number.parseInt(clockDom.getAttribute("data-index"));
        database.setDefaultIndex(clockId);
        database.update();
    }

    return clockDom;
}


function paintTip(clockDiv) {
    for (var i = 0; i < 60; i++) {
        var tip = document.createElement("div");
        tip.className = "tip ";

        // If the tip is an hour
        if (i % 5 === 0) {
            tip.className += "hourTip";
            var hourSpan = document.createElement("span");

            // Every 5 tips we get an hour
            var hour = i / 5;
            // if the result is 0 return 12
            var hourText = hour === 0 ? 12 : hour;
            hourSpan.innerHTML = hourText;
            hourSpan.style.transform = "rotate(" + (-i * 6) + "deg)";
            tip.appendChild(hourSpan);

            // Else it's minute
        } else {
            tip.className += "minuteTip";
        }


        tip.style.transform = "rotate(" + (i * 6) + "deg)";
        clockDiv.appendChild(tip);
    }

    
}

function removeClass(el, className) {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
        el.className = classes.join(' ');
    }

}


module.exports = createClock;
