<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 31.05.16
 * Time: 15:23
 */

require_once 'config.php';

session_start();
$uName = $_POST['name'];
$pWord = md5($_POST['pwd']);
$qry = "SELECT user_id, email, oauth FROM user WHERE email='".$uName."' AND password='".$pWord."' AND status='active'";
$res = mysqli_query($qry);
$num_row = mysql_num_rows($res);
$row=mysqli_fetch_assoc($res);
if( $num_row == 1 ) {
    echo 'true';
    $_SESSION['uName'] = $row['username'];
    $_SESSION['oId'] = $row['orgid'];
    $_SESSION['auth'] = $row['oauth'];
}
else {
    echo 'false';
}