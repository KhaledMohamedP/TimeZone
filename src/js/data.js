var addClock = require("./addClock.js");
var clockAPI = require("./clockAPI.js");

// List of object {
//                 domElment: domeElment , 
//                 timezone: momentJSObject 
var database = [],
    defaultIndex = 0;

module.exports = {
    addTimeZone: function(timeZoneId, city) {
        var time = moment(new Date()).tz(timeZoneId);
        var hour = time.format('h');
        var minute = time.format('m');
        var amPm = time.format('a');
        var clock = addClock(hour, minute, amPm, city);
        clock.setAttribute('data-index', database.length);
        clock.setAttribute('data-timezone', timeZoneId);

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
            return;
        }

        var databaseCopy = database.concat([]);
        var defaultClock = databaseCopy[defaultIndex];
        var dateObj = {
            hour: defaultClock.dom.getElementsByClassName('hourInput')[0].value,
            minute: defaultClock.dom.getElementsByClassName('minuteInput')[0].value
        };

        var amPM = defaultClock.dom.getElementsByClassName("active")[0].className;

        //if pm is selected
        dateObj.hour = Number.parseInt(dateObj.hour);
        if (amPM.indexOf("pm") > -1) {
            if (dateObj.hour !== 12) {
                dateObj.hour += 12;
                dateObj.hour = dateObj.hour === 24 ? 0 : dateObj.hour;
            }
        }else if (amPM.indexOf("am") > -1){
            if(dateObj.hour === 12){
              dateObj.hour = 0; 
            }
        }

        databaseCopy.splice(defaultIndex, 1);

        var defaultTime = moment.tz(dateObj, defaultClock.timezone);


        databaseCopy.forEach(function(elm) {
            // When a element is removed 
            if (typeof elm === "undefined") { 
              return; 
            }

            // Get timezone time 
            var time = defaultTime.clone().tz(elm.timezone);
            var hour = time.format('h');
            var minute = time.format('m');
            var amPm = time.format('a');

            clockAPI.setTime(elm.dom, hour, minute);
            clockAPI.setAmPm(elm.dom, amPm);

        });
    },
    setDefaultIndex: function(index) {
        defaultIndex = index;
    }, 
    getTimeBaseOnTimeZone: function(){

    }
};
