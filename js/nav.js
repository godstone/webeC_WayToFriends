/**
 * Created by godstone on 28.05.16.
 */


var setView;

// Sections in index.html
var LOGIN;
var REGISTER;
var DASHBOARD;             //TODO: Add Dashboard to index.html
var MAP;
var LIST;
var SEARCHRESULT;
var SEARCH;

$(document).ready(function() {

    // Contents (section)
    LOGIN = $("#login");
    REGISTER = $("#register");
    SEARCH = $("#searchform");
    MAP = $("#map");
    SEARCHRESULT = $("#searchResult");

    // Buttons
    var btnLogin = $("#btnLogin");
    var btnLogout = $("#btnLogout");
    var btnRegNew = $("#btnRegNew");
    var btnReg = $("#btnReg");
    var btnSearch = $("#btnSearch");
    var btnStar = $("#btnStar");

    btnLogout.hide();



    /*
        VIEW-HANDLER
     */
    setView = function(content){
        //hide everything
        LOGIN.hide();
        REGISTER.hide();
        SEARCH.hide();
        MAP.hide();
        SEARCHRESULT.hide();

        // Show give Content
        content.show();

        console.log("Hide everything and show: "+content);

    };


    /*
        BUTTON-ACTION-HANDLER
     */

    // Register a new account Button
    btnRegNew.click(function(e){
        e.preventDefault();
        setView(SEARCH);
    });

    // Register the account Button
    btnReg.click(function(e){
        e.preventDefault();
        //input fields login or
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
            url: "http://localhost:8081/webeC/webeC_WayToFriends/user/reg",
            contentType: 'application/json',
            dataType: "json",
            data: loginToJSON(userR, pwR),
            success: function(response){
                console.log('success!');
                alert(response.success);
                if (response.success) {
                    // true
                    console.log('Reg success');
                    setView(LOGIN);
                }
                else if (response.errmsg === 1) {
                    // false
                    console.log('Reg fail');
                    console.log('Username already in use');
                    userInputR.addClass("login-wrong");
                    pwInputR.addClass("login-wrong");
                    document.getElementById("regfail").innerHTML = "Username already exists";
                    setView(REGISTER);// this will call after PHP method execution
                }
                else if (response.errmsg === 2) {
                    // false
                    console.log('Reg fail');
                    console.log('Username wurde nicht registriert');
                    userInputR.addClass("login-wrong");
                    pwInputR.addClass("login-wrong");
                    document.getElementById("loginfail").innerHTML = "Registration failed, try again";
                    setView(REGISTER);// this will call after PHP method execution
                }
            },
            error: function (response) {
                console.log('bad');
                //console.log(response.toString());
                setView(REGISTER);
            },
        });
    });

    //Login Button
    btnLogin.click(function(e) {
        e.preventDefault();
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
            url: "http://localhost:8081/webeC/webeC_WayToFriends/user",
            contentType: 'application/json',
            dataType: "json",
            data: loginToJSON(user, pw),
            success: function(response){
                if (response.success) {
                    // true
                    console.log('login success');
                    btnLogout.show();
                    setView(DASHBOARD);
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
                // reload page
                location.reload(true);
            },
        });
    });

    // Logout Button
    btnLogout.click(function(e) {
        e.preventDefault();
        //TODO: actual logout
        $.ajax({
            type: 'GET',
            url: apiURL+'/user',
            success: function(response){
                console.log('s'+response);
            },
            error: function () {
                console.log('error logout');
            },
        });
        //reload page
        location.reload(true);
    });


    //Create JSON with login data
    function loginToJSON(user, pw) {
        return JSON.stringify({
            "user": user,
            "pw": pw
        });
    }


//end of document
});