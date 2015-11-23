function removeClass(el, className) {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
        el.className = classes.join(' ');
    }

}

module.exports = {
    setAmPm: function setAmPm(el, amPm) {
        var pm = el.getElementsByClassName('pm')[0];
        var am = el.getElementsByClassName('am')[0];
        var clockElm = el.getElementsByClassName("clock")[0];

        if (amPm.toLowerCase() === "pm") {
            removeClass(clockElm, "darkTheme");
            pm.className = "pm active";
            am.className = "am";
        } else {
            am.className = "am active";
            pm.className = "pm";

            // If darkTheme is not there
            if (clockElm.className.split(' ').indexOf("darkTheme") === -1) {
                clockElm.className += " darkTheme";
            }
        }
    },
    setTime: function setHourMinute(el, hour, minute) {
        var hourBar = el.getElementsByClassName('hourBar')[0];
        var minuteBar = el.getElementsByClassName('minuteBar')[0];
        var hourInput = el.getElementsByClassName('hourInput')[0];
        var minuteInput = el.getElementsByClassName('minuteInput')[0];

        // set inputs
        hourInput.value = hour;
        minuteInput.value = minute;

        // change bar UI

        var minDegree = minuteInput.value * 6;
        minuteBar.style.transform = "rotate(" + minDegree + "deg)";


        var hrDegree = hourInput.value * 30;
        var vmDegree = this.adjustClock(hrDegree, minDegree, hourInput);
        hourBar.style.transform = "rotate(" + vmDegree + "deg)";
    },
    setCity: function setCityName(el, city) {
        var location = el.getElementsByClassName("location")[0];
        location.innerHTML = city;
    },
    adjustClock: function adjustClock(hrDegrees, minDegrees, hourInput) {
        var hourBarPrgress = (minDegrees / 360) * 30;
        /*
            Change the hour when we reach 0 
            This cause whole lot of mess when the mouse is stock in 0 
        */ 
       
        // if(hourBarPrgress == 0){
        //     hrDegrees += 30; 
        //     hourInput.value = hrDegrees / 30; 
        // }
        
        var nextHourDegree = hrDegrees + hourBarPrgress;
        return nextHourDegree;
    }
};
