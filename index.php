<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>PHP Login Form with Session</title>
    <link rel="stylesheet" href="css/style.css" type="text/css" />
    <link href="libs/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="libs/bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
    <script type="text/javascript" src="js/jquery-1.12.4.min.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
    <script type="text/javascript" src="js/validation.min.js"></script>
</head>

<body>
<section id="loginform">
    <div class="signin-form">

        <div class="container">


            <form class="form-signin" method="post" id="login-form">

                <h2 class="form-signin-heading">Log In to WebApp.</h2><hr />

                <div id="error">
                    <!-- error will be shown here ! -->
                </div>

                <div class="form-group">
                    <input type="email" class="form-control" placeholder="Email address" name="user_email" id="user_email" />
                    <span id="check-e"></span>
                </div>

                <div class="form-group">
                    <input type="password" class="form-control" placeholder="Password" name="password" id="password" />
                </div>

                <hr />

                <div class="form-group">
                    <button type="submit" class="btn btn-default" name="btn-login" id="btn-login">
                        <span class="glyphicon glyphicon-log-in"></span> &nbsp; Sign In
                    </button>
                </div>

            </form>

        </div>

    </div>
</section>
</body>
</html>