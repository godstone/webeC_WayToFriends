/**
 * Created by godstone on 28.05.16.
 */

$(document).ready(function() {
    navigator.geolocation.getCurrentPosition(calculateDistance);
    $("#register").hide();

    // Register a new account Button
    $("#btnRegNew").click(function(e){
        e.preventDefault();
        showRegister();
    });

    // Register the account Button
    $("#btnReg").click(function(e){
        e.preventDefault();
        register();
    });

    //Login Button
    $("#btnLogin").click(function(e) {
        e.preventDefault();
        login();
    });

    // Logout Button
    $("#btnLogout").click(function(e) {
        e.preventDefault();
        logout();
    });

    $("#btnSearch").click(function(e){
        e.preventDefault();
        console.log('Pressed Search-Button');
    });

    $("#searchKey").keydown(function(e){
        if(e.keyCode == 13){
            document.getElementById("btnSearch").click();
        }
    });
});

function showApp(){
    $("#mainlogin").hide();

    $("#app").show();
    $("#searchform").show();
    $("#btnLogout").show();
    listContacts();
}

function showLogin(){
    $("#mainlogin").show();
    $("#app").hide();
    $("#btnLogout").hide();
}

function showRegister(){
    $("#register").show();
    $("#login").hide();
}

function showMap(){
    $("#searchResult").hide();
    $("#map").show();
}

function showResults(){
    $("#map").hide();
    $("#searchResult").show();
}

