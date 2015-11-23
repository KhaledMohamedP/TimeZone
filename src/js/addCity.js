var database = require("./data.js");

// function initAutoComplete() {
var cityAutocompleteInput = document.getElementById('cityAutocomplete');
window.loadGoogleAPi = function() {
    var autocomplete = new window.google.maps.places.Autocomplete(
        (cityAutocompleteInput), {
            types: ['(cities)']
        });

    autocomplete.addListener('place_changed', findTimeZone);

    function findTimeZone() {
        var place = autocomplete.getPlace();
        var lng = place.geometry.location.lng();
        var lat = place.geometry.location.lat();
        getTimeZone(lat, lng, place.name);
    }
}



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
            database.addTimeZone(TimeZone.timeZoneId, city)
            cityAutocompleteInput.value = ''; 
            cityAutocompleteInput.focus(); 
        } else {
            console.log('something wrong with status')
                // We reached our target server, but it returned an error

        }
    };

    request.onerror = function() {
        console.log("onerror")
            // There was a connection error of some sort
    };

    request.send();
}
