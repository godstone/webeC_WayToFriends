<?php
/**
 * Created by PhpStorm.
 * User: godstone
 * Date: 31.05.16
 * Time: 16:37
 */

	session_start();
	unset($_SESSION['user_session']);

	if(session_destroy())
    {
        header("Location: index.php");
    }
?>