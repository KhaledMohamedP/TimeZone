var addClock = require("./addClock.js");

// List of object {
//                 domElment: domeElment , 
//                 timezone: momentJSObject 
var database = [],
    defaultIndex = 0;


function removeClass(el, className) {
    var classes = el.className.split(' ');
    var existingIndex = classes.indexOf(className);

    if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
        el.className = classes.join(' ');
    }

}

module.exports = {
    addTimeZone: function(timeZoneId, city) {
        var time = moment(new Date()).tz(timeZoneId);
        var hour = time.format('h');
        var minute = time.format('m');
        var amPm = time.format('a');
        var clock = addClock(hour, minute, amPm, city);
        clock.setAttribute('data-index', database.length);

        database.push({
            dom: clock,
            timezone: timeZoneId
        });
    },
    removeTimeZone: function(id) {
        database[id].dom.remove();
        database[id] = undefined;
    },
    update: function() {
        if (database <= 0 || isNaN(defaultIndex)) {
            return
        }

        var databaseCopy = database.concat([]);
        var defaultClock = databaseCopy[defaultIndex];
        var dateObj = {
            hour: defaultClock.dom.getElementsByClassName('hourInput')[0].value,
            minute: defaultClock.dom.getElementsByClassName('minuteInput')[0].value
        }

        var amPM = defaultClock.dom.getElementsByClassName("active")[0].className;

        window.dom = defaultClock;

        //if pm is selected
        dateObj.hour = Number.parseInt(dateObj.hour);
        if (amPM.indexOf("pm") > -1) {
            if (dateObj.hour !== 12) {
                dateObj.hour += 12;
                dateObj.hour = dateObj.hour === 24 ? 0 : dateObj.hour;
            }
        }else if (amPM.indexOf("am") > -1){
            if(dateObj.hour == 12){
              dateObj.hour = 0; 
              console.log("******** its noon");
            }
        }

        databaseCopy.splice(defaultIndex, 1);

        var defaultTime = moment.tz(dateObj, defaultClock.timezone);

        window.time = defaultTime;
        console.log(defaultClock.timezone, defaultTime.format("ha"));

        databaseCopy.forEach(function(elm) {
            if (typeof elm === "undefined") {
                return;
            }
            var time = defaultTime.clone().tz(elm.timezone);
            var hour = time.format('h');
            var minute = time.format('m');
            var amPM = time.format('a');

            var hourInput = elm.dom.getElementsByClassName('hourInput')[0];
            var minuteInput = elm.dom.getElementsByClassName('minuteInput')[0];
            hourInput.value = hour;
            hourInput.onchange();
            minuteInput.value = minute;
            minuteInput.onchange();

          console.log(elm.timezone, time.format("ha"));


            var clockElm = elm.dom.getElementsByClassName("clock")[0];
            var pm = elm.dom.getElementsByClassName('pm')[0];
            var am = elm.dom.getElementsByClassName('am')[0];
            if (amPM.toLowerCase() === "pm") {
                removeClass(clockElm, "darkTheme")
                pm.className = "pm active";
                am.className = "am";
            } else {
                am.className = "am active";
                pm.className = "pm";

                // If darkTheme is not there
                if (clockElm.className.split(' ').indexOf("darkTheme") === -1) {
                    clockElm.className += " darkTheme"
                }
            }

        })
    },
    setDefaultIndex: function(index) {
        defaultIndex = index;
    }
}
