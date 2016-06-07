/**
 * Created by godstone on 07.06.16.
 */
/*
 AP2 Google Map JavaScript API
 */
$(document).ready(function() {

    console.log( "ready!" );
    showLogin();


});



/*
 SHOW- & HIDE- FUNCTIONS
 */

function show(screenSection){
    var obj = document.getElementById(screenSection);

    obj.style.display = "block";
    console.log("Show: "+screenSection);
};

function hide(screenSection){
    var obj = document.getElementById(screenSection);
    if(obj.style.display == "block")
        obj.style.display = "none";
}

function showLogin() {
    loginformContent();
    hide("searchform");
    hide("map");
    hide("contactlist");
    show("loginform");
}

function showSearch() {
    hide("loginform");
    hide("map");
    hide("contactlist");
    show("searchform");
}

function showMap() {
    hide("searchform");
    hide("loginform");
    hide("contactlist");
    show("map");
}

function showContactlist() {
    hide("searchform");
    hide("map");
    hide("loginform");
    show("contactlist");
}

/*
 CONTENT OF SCREENS
 */
function loginformContent() {

    document.getElementById('loginform').innerHTML = '<fieldset>' +
        '<div class="signin-form">' +

                '<div class="container">' +


                '<form class="form-signin" method="post" id="login-form">' +

                '<h2 class="form-signin-heading">Log In to WebApp.</h2><hr />' +

            '<div id="error">' +
             '   <!-- error will be shown here ! -->' +
            '</div>' +

            '<div class="form-group">' +
                '<input type="email" class="form-control" placeholder="Email address" name="user_email" id="user_email" />' +
                '<span id="check-e"></span>' +
                '</div>' +

               ' <div class="form-group">' +
               ' <input type="password" class="form-control" placeholder="Password" name="password" id="password" />' +
               ' </div>' +

               ' <hr />' +

                '<div class="form-group">' +
                '<button type="submit" class="btn btn-default" name="btn-login" id="btn-login">' +
                '<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In' +
            '</button>' +
            '</div> </form></div></div>' +
    '</fieldset>';

}