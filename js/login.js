/**
 * Created by godstone on 31.05.16.
 */

$('document').ready(function()
{
    /* validation */
    $("#login-form").validate({
        rules:
        {
            password: {
                required: true,
            },
            user_email: {
                required: true,
                email: true
            },
        },
        messages:
        {
            password:{
                required: "please enter your password"
            },
            user_email: "please enter your email address",
        },
        submitHandler: submitForm
    });
    /* validation */

    /* login submit */
    function submitForm()
    {
        var data = $("#login-form").serialize();

        $.ajax({

            type : 'POST',
            url  : 'login.php',
            data : data,
            success :  function(response)
            {
                if(response=="ok"){

                    $("#btn-login").html('<img src="images/ajax-loader.gif" /> &nbsp; Signing In ...');
                    setTimeout(' window.location.href = "home.php"; ',4000);
                }
                else{

                    $("#error").fadeIn(1000, function(){
                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+response+' !</div>');
                        $("#btn-login").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In');
                    });
                }
            }
        });
        return false;
    }
});