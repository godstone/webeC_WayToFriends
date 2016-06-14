function showDistance(place, contactId){
    navigator.geolocation.getCurrentPosition(function(location) {
        var distanceService = new google.maps.DistanceMatrixService();
        var origin = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
        distanceService.getDistanceMatrix({
                origins: [origin],
                destinations: [place],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                durationInTraffic: true,
                avoidHighways: false,
                avoidTolls: false
            },
            function (response, status) {
                if (status !== google.maps.DistanceMatrixStatus.OK) {
                    console.log('Error:', status);
                } else {
                    var distance = response['rows'][0].elements[0].distance.text;
                    document.getElementById('distance_'+contactId).innerHTML = distance;

                }
            }
        );
    });
}

function showRoute(place){
    navigator.geolocation.getCurrentPosition(function(location) {
        url = "//maps.google.de/maps?hl=de";
        origin = "saddr="+location.coords.latitude+","+location.coords.longitude; //ToDo: Statt Olten eigene Location
        destination = "daddr="+place;

        src = url + "&" + origin + "&" + destination + "&output=embed";

        document.getElementById("map").innerHTML= '<iframe width="' + $(document).width() + '"height="400" src=' + src + ' frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';
        showMap();
    });
}