
var addClock = require("./addClock.js");

// function initAutoComplete() {
var cityAutocompleteInput = document.getElementById('cityAutocomplete');
cityAutocompleteInput.onfocus = function() {
  console.log("onfocus");
    if (typeof window.google === "undefined") {
      console.log(window.google)
      this.value = "window.google api not loaded please connect to the intrnet"
    } else {
        var autocomplete = new window.google.maps.places.Autocomplete(
            (document.getElementById('cityAutocomplete')), {
                types: ['(cities)']
            });

        autocomplete.addListener('place_changed', findTimeZone);

        function findTimeZone() {
            var place = autocomplete.getPlace();
            var lng = place.geometry.location.lng();
            var lat = place.geometry.location.lat();
            getTimeZone(lat, lng);
            console.log(autocomplete.getPlace());
        }
    };
}



function getTimeZone(lat, lng) {
    var latLng = lat + ',' + lng;
    var url = 'https://maps.googleapis.com/maps/api/timezone/json?location=' + latLng + '&timestamp=1331766000';
    //request 
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            var data = JSON.parse(request.responseText);
            addClock();

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
