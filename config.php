
<?php

/*
 * Define variables for DB-connect
 */
/*define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_DATABASE', 'wtf');
$db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
*/


$con = mysql_connect('DATABASEHOST','USERNAME','PASSWORD') or die(mysql_error());

if (!$con) {
    echo "Unable to connect to DB: " . mysql_error();
    exit;
}

if (!mysql_select_db("DATABASENAME")) {
    echo "Unable to select mydbname: " . mysql_error();
    exit;
}




?>