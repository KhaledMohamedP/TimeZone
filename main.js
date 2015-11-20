var clock = document.getElementsByClassName("clock")[0];
var clock2 = document.getElementsByClassName("clock")[1];

createClock(clock);
createClock(clock2);

function createClock(selector) {
    for (var i = 0; i < 60; i++) {
        var tip = document.createElement("div");
        tip.className = "tip ";

        // If the tip is an hour
        if (i % 5 == 0) {
            tip.className += "hourTip";
            var hourSpan = document.createElement("span");

            // Every 5 tips we get an hour
            var hour = i / 5;
            // if the result is 0 return 12
            var hourText = hour === 0 ? 12 : hour;
            hourSpan.innerHTML = hourText;
            hourSpan.style.transform = "rotate(" + (-i * 6) + "deg)"
            tip.appendChild(hourSpan);

            // Else it's minute
        } else {
            tip.className += "minuteTip";
        }


        tip.style.transform = "rotate(" + (i * 6) + "deg)";
        selector.appendChild(tip);
    };

    // Day: pm/am
    var pm = selector.getElementsByClassName('pm')[0];
    var am = selector.getElementsByClassName('am')[0];
    pm.onclick = function() {
        pm.className = "pm active";
        am.className = "am";
    };
    am.onclick = function() {
        am.className = "am active";
        pm.className = "pm";
    };


    var hourBar = selector.getElementsByClassName('hourBar')[0];
    var minuteBar = selector.getElementsByClassName('minuteBar')[0];



    //  Hour input work 
    var hourInput = selector.getElementsByClassName('hourInput')[0];
    var minuteInput = selector.getElementsByClassName('minuteInput')[0];

    hourInput.onkeyup = function(e) {
        var degree = e.target.value * 30;
        hourBar.style.transform = "rotate(" + degree + "deg)";
    };
    minuteInput.onkeyup = function(e) {
        var degree = minuteInput.value * 6;
        minuteBar.style.transform = "rotate(" + degree + "deg)";
    };


    // experiment 
    hourBar.addEventListener("mousedown", function(e) {
        selector.addEventListener("mousemove", hourClockMouseMove, false);
    });

    hourBar.addEventListener("touchstart", function(e) {
        selector.addEventListener("touchmove", hourClockMouseMove, false);
    });

    // Minutes Events 
    minuteBar.addEventListener("mousedown", function(e) {
        selector.addEventListener("mousemove", minuteClockMouseMove, false);
    });
    //MinutesBar Mobile 
    minuteBar.addEventListener("touchstart", function(e) {
        selector.addEventListener("touchmove", minuteClockMouseMove, false);
    });


    selector.onclick = function() {
        selector.removeEventListener("mousemove", hourClockMouseMove,   false);
        selector.removeEventListener("mousemove", minuteClockMouseMove, false);
        selector.removeEventListener("touchmove", hourClockMouseMove,   false);
        selector.removeEventListener("touchmove", minuteClockMouseMove, false);
    };



    // mousemove clock function 
    function hourClockMouseMove(e) {
        var degrees = getDegrees(e);
        var inHours = Math.floor(degrees / 30);
        var inDegrees = inHours * 30;
        var hourDegree = inDegrees + 30;
        hourBar.style.transform = "rotate(" + hourDegree + "deg)";
        hourInput.value = hourDegree / 30;

    }

    // mousemove clock function 
    function minuteClockMouseMove(e) {
        var degrees = getDegrees(e);
        var inMinutes = Math.floor(degrees / 6);
        var inDegrees = inMinutes * 6;
        var hourDegrees = inDegrees + 6;
        minuteBar.style.transform = "rotate(" + hourDegrees + "deg)";
        minuteInput.value = hourDegrees / 6 % 60;
    }

    function getDegrees(e) {
        var x = e.pageX - selector.offsetLeft;
        var y = e.pageY - selector.offsetTop;
        var middleX = selector.clientWidth  / 2;
        var middleY = selector.clientHeight / 2;

        console.log(selector.offsetLeft, selector.offsetTop)
        console.log(e.pageX, e.pageY)
        var cX = x - middleX;
        var cY = middleY - y;

        var angle = Math.atan2(cX, cY) * (180 / Math.PI);

        // Convert degree from -/+ to 0-360 
        var degrees = angle + Math.ceil(-angle / 360) * 360;

        return degrees;
    }
}
