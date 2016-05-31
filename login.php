<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 31.05.16
 * Time: 15:23
 */

	session_start();
	require_once 'config.php';

	if(isset($_POST['btn-login']))
    {
        //$user_name = $_POST['user_name'];
        $user_email = trim($_POST['user_email']);
        $user_password = trim($_POST['password']);

        $password = md5($user_password);

        try
        {

            $stmt = $db_con->prepare("SELECT * FROM user WHERE user_email=:email");
            $stmt->execute(array(":email"=>$user_email));
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $count = $stmt->rowCount();

            if($row['user_password']==$password){

                echo "ok"; // log in
                $_SESSION['user_session'] = $row['id'];

            }
            else{

                echo "email or password does not exist."; // wrong details
            }

        }
        catch(PDOException $e){
            echo $e->getMessage();
        }
    }

?>