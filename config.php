
<?php
/*
 * Config for DB-connect
 */

function connectDB()
{
    /*$db_host = "localhost";
    $db_name = "wtf";
    $db_user = "root";
    $db_pass = "";*/

    $db_host = "godstone.ch";
    $db_name = "godstone_wtf";
    $db_user = "fhnw";
    $db_pass = "FxTdWh8t?DW&zHf3f2D$";

    // Try to connect
    $connection = new mysqli($db_host, $db_user, $db_pass, $db_name);
    // Check if connection available
    if ($connection->connect_error) {
        die("Connection failed: " . $connection->connect_error);
    }
    return $connection;
}