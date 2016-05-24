<?php
session_start();
include("dbconnect.php"); // Verbindung zur DB

$error = ""; // Variable zum speichern der php-errors
if(isset($_POST["submit"]))
{
    if(empty($_POST["email"]) || empty($_POST["password"]))
    {
        $error = "Es werden beide Felder benötigt.";
    }else
    {
// Definiere $email und $password
        $username=$_POST['email'];
        $password=$_POST['password'];

// Schutz vor MySQL injection
        $username = stripslashes($email);
        $password = stripslashes($password);
        $username = mysqli_real_escape_string($db, $email);
        $password = mysqli_real_escape_string($db, $password);
        $password = md5($password);

// Überprüfe Email und Passwort von DB
        $sql="SELECT id FROM user WHERE email='$email' and password='$password'";
        $result=mysqli_query($db,$sql);
        $row=mysqli_fetch_array($result,MYSQLI_ASSOC);

//Falls diese existieren, eröffne Session
//Andererseits echo error.

        if(mysqli_num_rows($result) == 1)
        {
            $_SESSION['email'] = $login_user; // Initialisiere Session
            header("location: index.php"); // Redirect zu nächster Seite
        }else
        {
            $error = "Email oder Passwort inkorrekt";
        }

    }
}

?>