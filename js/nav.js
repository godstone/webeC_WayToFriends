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

/* API URL Luca: http://localhost/webec/webeC_WayToFriends */

var apiurl = 'http://localhost/webec/webeC_WayToFriends';

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
    setView = function(content1, content2, content3){
        //hide everything
        LOGIN.hide();
        REGISTER.hide();
        SEARCH.hide();
        MAP.hide();
        SEARCHRESULT.hide();

        // Show give Content
        if (content2 === undefined && content3 === undefined){
            content1.show();
        } else if (content3 === undefined){
            content1.show();
            content2.show();
        } else {
            content1.show();
            content2.show();
            content3.show();
        }

        //console.log("Hide everything and show: "+eval(content));

    };


    /*
        BUTTON-ACTION-HANDLER
     */

    // Register a new account Button
    btnRegNew.click(function(e){
        e.preventDefault();
        setView(REGISTER);
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
            url: apiurl+"/user/reg",
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: loginToJSON(userR, pwR),
            success: function(response){
                if (response.success) {
                    // true
                    console.log('Reg success');
                    alert('User registrated');
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
            url: apiurl+"/user",
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: loginToJSON(user, pw),
            success: function(response){
                if (response.success) {
                    // true
                    console.log('login success');
                    btnLogout.show();
                    setView(SEARCH);
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
            url: apiurl+'/user',
            success: function(response){
                console.log('s'+response);
                location.reload(true);
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

    btnSearch.click(function(e){
        e.preventDefault();
        console.log('Pressed Search-Button')
        setView(SEARCH, SEARCHRESULT);
    });

//end of document
});