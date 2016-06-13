/* API URL Luca: http://localhost/webec/webeC_WayToFriends */

var apiurl = '';

function listContacts(){
    $.ajax({
        type : 'GET',
        url  : '/contact',
        success :  function(response) {
            entries = JSON.parse(response);
            document.getElementById('contactlist').innerHTML = "";
            for (i = 0; i < entries.length; i++) {

                var route =  "'"+entries[i].street+"+"+entries[i].streetno+"+"+entries[i].zip+"+"+entries[i].city+"'";
                
                $('#contactlist').append('<fieldset onclick="showRoute('+route+')">' +
                    '<span class="contactName">' + entries[i].name + '</span> ' +
                    '<span class="contactFirstname">' + entries[i].firstname + '</span><br/>' +
                    '<span class="contactStreet">' + entries[i].street + ' ' + entries[i].streetno + '</span>, ' +
                    '<span class="contactZip">' + entries[i].zip + ' ' + entries[i].city + '</span><br/>' +
                    '<span class="contactPhone">' + entries[i].phone + '</span>'+
                    '<div class="distance">98800 km</div>'+
                '</fieldset>');
            }
            
            $("#contactlist").show();
        },
        error: function () {
            console.log('wtf!');
        },
    });
}

function logout(){
    $.ajax({
        type: 'GET',
        url: apiurl+'/user',
        success: function(response){
            console.log('s'+response);
            showLogin();
        },
        error: function () {
            console.log('error logout');
        },
    });
}

function login(){
    var userInput = $("#email");
    var pwInput = $("#password");
    var user = userInput.val();
    var pw = pwInput.val();
    if (user.length==0 || pw.length==0){
        userInput.addClass("login-wrong");
        pwInput.addClass("login-wrong");
        alert("Please, fill in both fields to login.");
        //exit function
        return;
    }
    $.ajax({
        type: 'POST',
        //TODO: Adjust URL
        //url: "http://"+document.domain+"/api/user",
        url: apiurl+"/user",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: loginToJSON(user, pw),
        success: function(response){
            if (response.success) {
                // true
                console.log('login success');
                
                showApp();
            } else {
                console.log('bad login');
                // false

                userInput.addClass("login-wrong");
                pwInput.addClass("login-wrong");
                document.getElementById("loginfail").innerHTML = "login failed";
            }
        },
        error: function () {
            console.log('error login');
        },
    });
}

function register(){
    var userInputR = $("#regEmail");
    var pwInputR = $("#regPassword");
    var userR = userInputR.val();
    var pwR = pwInputR.val();
    if (userR.length==0 || pwR.length==0){
        userInputR.addClass("login-wrong");
        pwInputR.addClass("login-wrong");
        alert("Please, fill in both fields to register.");
        //exit function
        return;
    }
    $.ajax({
        type: 'POST',
        //TODO: Adjust URL
        url: apiurl+"/user/add",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        data: loginToJSON(userR, pwR),
        success: function(response){
            if (response.success) {
                // true
                console.log('Reg success');
                alert('User registrated');
                $("#login").show();
            }
            else if (response.errmsg === 1) {
                // false
                console.log('Reg fail');
                console.log('Username already in use');
                userInputR.addClass("login-wrong");
                pwInputR.addClass("login-wrong");
                document.getElementById("regfail").innerHTML = "Username already exists";
                $("#register").show();
            }
            else if (response.errmsg === 2) {
                // false
                console.log('Reg fail');
                console.log('Username wurde nicht registriert');
                userInputR.addClass("login-wrong");
                pwInputR.addClass("login-wrong");
                document.getElementById("loginfail").innerHTML = "Registration failed, try again";
                $("#register").show();
            }
        },
        error: function (response) {
            console.log('bad');
            //console.log(response.toString());
            $("#register").show();
        },
    });
}

//Create JSON with login data
function loginToJSON(user, pw) {
    return JSON.stringify({
        "user": user,
        "pw": pw
    });
}