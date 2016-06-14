


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

    url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    origin = 'origins='+location.coords.latitude+','+location.coords.longitude;
    destination = 'destinations=solothurnerstrasse+egerkingen';
    //key = 'key=AIzaSyDMAgJ7fqGx7M2-l2NT6jR-5277UH_fqQY';

    //map_url = url+"?"+origin+"&"+destination+"&"+key;
    map_url = url+"?"+origin+"&"+destination;

    $.getJSON(map_url+"?callback=?", function(result){
        //response data are now in the result variable
        console.log(result);
    });
/*
    $.ajax({
        url: map_url,
        dataType: "jsonp",
        jsonpCallback: 'callback',/*
        success: function(response){
            console.log(JSON.parse(response));
        },
        error: function () {

        },
    });*/

}

function callback(vari){
    console.log("jujedifjidf");

}

function showRoute(place) {

    url = "//maps.google.de/maps?hl=de";
    origin = "saddr=olten"; //ToDo: Statt Olten eigene Location
    destination = "daddr="+place;

    src = url + "&" + origin + "&" + destination + "&output=embed";
   // src = url + "&" + destination + "&output=embed";

    document.getElementById("map").innerHTML= '<iframe width="' + $(document).width() + '"height="400" src=' + src + ' frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>';
    showMap();
}