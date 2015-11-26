var database = require("./data.js");

// Caching  
var cachedDatabase = window.localStorage.getItem("TimeZoneObjCached"); 
var parsedCachedDatabase = JSON.parse(cachedDatabase);
// First load
for (var i = 0; i < parsedCachedDatabase.length; i++) {
    database.addTimeZone(parsedCachedDatabase[i].id, parsedCachedDatabase[i].name);
}


var cityAutocompleteInput = document.getElementById('cityAutocomplete');

function getTimeZone(lat, lng, city) {
    var latLng = lat + ',' + lng;
    var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + latLng + '&timestamp=1331766000';
    //request 
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var TimeZone = JSON.parse(request.responseText);
            database.addTimeZone(TimeZone.timeZoneId, city);

            // Timezone database 
            var cachedDatabase = window.localStorage.getItem("TimeZoneObjCached"); 
            var parsedCachedDatabase = JSON.parse(cachedDatabase);
            parsedCachedDatabase.push({
                id: TimeZone.timeZoneId,
                name: city
            });

            window.localStorage.setItem("TimeZoneObjCached", JSON.stringify(parsedCachedDatabase));

            cityAutocompleteInput.blur();
            setTimeout(function() {
                cityAutocompleteInput.value = '';
                cityAutocompleteInput.focus();
            }, 50);
        } else {
            console.log('something wrong with status');
            // We reached our target server, but it returned an error
        }
    };

    request.onerror = function() {
        console.log("onerror");
        // There was a connection error of some sort
    };

    request.send();
}


window.loadGoogleAPi = function() {
    var autocomplete = new window.google.maps.places.Autocomplete(
        (cityAutocompleteInput), {
            types: ['(cities)']
        });

    function findTimeZone() {
        var place = autocomplete.getPlace();
        var lng = place.geometry.location.lng();
        var lat = place.geometry.location.lat();
        getTimeZone(lat, lng, place.name);
    }

    autocomplete.addListener('place_changed', findTimeZone);
};



function loadScript() {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyDm5N1VOb1DflM9ZDrjX_0BA3ATIRlwDaw&signed_in=true&libraries=places&callback=loadGoogleAPi';
    head.appendChild(script);
}

window.onload = loadScript;

module.exports = {
    getTimeZone: getTimeZone
};
