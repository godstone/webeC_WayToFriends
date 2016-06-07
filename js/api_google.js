


function getDistance(street, streetno, zip, city){

    url = '';
    destination = '';


    console.log("OK1");
/*
    var geocoder = new google.maps.Geocoder();
    if(google.loader.ClientLocation) {
        console.log(google.loader.ClientLocation.latitude);
        console.log(google.loader.ClientLocation.longitude);
    }*/
    navigator.geolocation.getCurrentPosition(calculateDistance);
    console.log("OK3");




}

function calculateDistance(location){
    console.log("OK2");

    url = 'http://maps.googleapis.com/maps/api/distancematrix/json';
    origin = 'origins='+location.coords.latitude+','+location.coords.longitude;
    destination = 'destinations=solothurnerstrasse+egerkingen';

    map_url = url+"?"+origin+"&"+destination;
    $.getJSON(map_url, function(json) {

        alert("jfdhfd");
        alert("JSON Data: " + json.description);
    });

}

function showRoute(street, streetno, zip, city){
    url = "//maps.google.de/maps?hl=de";
    origin = "saddr=olten";
    destination = "daddr=egerkingen";

    //$("#map").append("Hallo");

    src = url+"&"+origin+"&"+destination+"&output=embed";
    src = url+"&"+destination+"&output=embed";

    $("#map").append('<iframe width="400" height="400" src='+src+' frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>');
}

