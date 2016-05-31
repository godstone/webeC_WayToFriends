/**
 * Created by godstone on 31.05.16.
 */

$(document).ready(function(){
    $("#add_err").css('display', 'none', 'important');
    $("#login").click(function(){
        username=$("#name").val();
        password=$("#word").val();
        $.ajax({
            type: "POST",
            url: "login.php",
            data: "name="+username+"&pwd="+password,
            success: function(html){
                if(html=='true')    {
                    //$("#add_err").html("right username or password");
                    window.location="home.php";
                }
                else    {
                    $("#add_err").css('display', 'inline', 'important');
                    $("#add_err").html("<img src='/images/alert.png' />Wrong username or password");
                }
            },
            beforeSend:function()
            {
                $("#add_err").css('display', 'inline', 'important');
                $("#add_err").html("<img src='/images/ajax-loader.gif' /> Loading...")
            }
        });
        return false;
    });
});