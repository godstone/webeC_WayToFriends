
<?php

/*
 * Define variables for DB-connect
 */
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_DATABASE', 'wtf');

$con = mysqli_connect('DB_SERVER','DB_USERNAME','DB_PASSWORD','DB_DATABASE') or die(mysqli_error());

if (!$con) {
    echo "Unable to connect to DB: " . mysqli_error();
    exit;
}

if (!mysqli_select_db("DB_DATABASE")) {
    echo "Unable to select wtf: " . mysqli_error();
    exit;
}