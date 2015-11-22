var addClock = require("./addClock.js");

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

        database.push({
            dom: clock,
            timezone: timeZoneId
        });
    },
    removeTimeZone: function(id) {
        database[id].dom.remove();
        database.splice(id, 1);
        if (id == defaultIndex) {
            defaultIndex = 0;
        }
    },
    update: function() {
        if (database <= 0) {
            return
        }
        var databaseCopy = database.concat([]);
        var defaultClock = databaseCopy[defaultIndex];

        var dateObj = {
            hour: defaultClock.dom.getElementsByClassName('hourInput')[0].value,
            minute: defaultClock.dom.getElementsByClassName('minuteInput')[0].value
        }
        
        databaseCopy.splice(defaultIndex, 1);

        var defaultTime = moment.tz(dateObj, defaultClock.timezone);

        databaseCopy.forEach(function(elm) {
            var time = defaultTime.clone().tz(elm.timezone);
            var hour = time.format('h');
            var minute = time.format('m');

            var hourInput = elm.dom.getElementsByClassName('hourInput')[0];
            var minuteInput = elm.dom.getElementsByClassName('minuteInput')[0];
            hourInput.value = hour;
            hourInput.onkeyup();
            minuteInput.value = minute;
            minuteInput.onkeyup();


        })
    },
    setDefaultIndex: function(index) {
        defaultIndex = index;
    }
}
