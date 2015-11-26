var addClock = require("./addClock.js");
var clockAPI = require("./clockAPI.js");


// List of object {
//                 domElment: domeElment , 
//                 timezone: momentJSObject 


// Retrieve cached database or create a new one; 
var database = [],
    defaultIndex = 0;

var data =  {
    addTimeZone: function(timeZoneId, cityName) {
        var time = moment(new Date()).tz(timeZoneId);
        var hour = time.format('h');
        var minute = time.format('mm');
        var amPm = time.format('a');
        var clock = addClock(hour, minute, amPm, cityName);
        clock.setAttribute('data-index', database.length);
        clock.setAttribute('data-timezone', timeZoneId);
        
        // Model & View
        database.push({
            dom: clock,
            timezone: timeZoneId
        });


        // Render the view
        this.update();
    },
    removeTimeZone: function(id) {
        var timeZoneId = database[id].timezone;
        database[id].dom.remove();
        database[id] = undefined;

        // Remove from cached data 
        var cachedDatabase = window.localStorage.getItem("TimeZoneObjCached"); 
        cachedDatabase = JSON.parse(cachedDatabase);
        var index = cachedDatabase.indexOf(timeZoneId);
        cachedDatabase.splice(index, 1);
        window.localStorage.setItem("TimeZoneObjCached", JSON.stringify(cachedDatabase));

        // Change default
        defaultIndex = defaultIndex === id ? 0:defaultIndex;

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
            var minute = time.format('mm');
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


module.exports = data;