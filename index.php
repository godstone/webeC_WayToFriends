<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>PHP Login Form with Session</title>
    <link rel="stylesheet" href="style.css" type="text/css" />
</head>

<body>
<h1>User Login</h1>
<div class="err" id="add_err"></div>
<fieldset>
    <form action="./" method="post">
        <ul>
            <li> <label for="name">E-Mail </label>
                <input type="text" size="30"  name="name" id="name"  /></li>
            <li> <label for="word">Password</label>
                <input type="password" size="30"  name="word" id="word"  /></li>
            <li> <label></label>
                <input type="submit" id="login" name="login" value="Login" class="loginbutton" ></li>
        </ul>
    </form>
</fieldset>
</div>
</body>
</html>