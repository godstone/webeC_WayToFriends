<?php
/**
 * REST API - WayToFriends
 *
 */

require 'Slim/Slim.php';
require 'config.php';

\Slim\Slim::registerAutoloader();


$app = new \Slim\Slim();
$app->post('/user', 'getLogin');
//$app->get('/dashboard', 'getDashboard');
$app->post('/user/reg', 'regUser');
/*$app->post('/search', 'searchPerson');*/    // TODO: muss die Search hier aufgelistet sein? o0
$app->get('/user', 'getLogout');
$app->get('/user/session', 'getSession');


// Check if user has session and is allowed to use application
function getSession() {
    session_start();
    echo session_status();
    $user_id = $_SESSION['uid'];
    echo $_SESSION['uid'];
    if(isset($_SESSION['uid'])) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array('success' => true, 'id' => $_SESSION['uid'],
        ));
    }
    else {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array('success' => false,
        ));
    }
}


// Verify Login-Data with data from DB
function getLogin() {
    $app = \Slim\Slim::getInstance();
    $login = json_decode($app->request()->getBody());
    $username = $login->{'user'};
    $password = $login->{'pw'};
    $connection = connectDB();
    $stmt = $connection->prepare('SELECT user_password, id FROM user WHERE user_email=?');
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows >= "1") {
        $row = $result->fetch_row();
        $pwVerified = password_verify($password, $row[0]);
        if ($pwVerified) {
            session_start();
            // Session variables
            $userid =  $row[1];
            $_SESSION["uid"] = $userid;
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array('success' => true, 'pw' => $password, 'pwHash' => $row[0], 'pwVerified' => $pwVerified, 'userid' => $_SESSION["uid"],
            ));

        }
        else {
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array('success' => false, 'pw' => $password, 'pwHash' => $row[0], 'pwVerified' => $pwVerified,
            ));
        }
    }
    else {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array('success' => false, 'pw' => $password,
        ));
    }
    $connection->close();
}


// Logout user
function getLogout() {
    $app = \Slim\Slim::getInstance();
    session_start();
    echo $_SESSION["uid"];
    session_unset();
    session_destroy();
    echo("Session destroyed");
}

// Register User to DB
function regUser() {
    $app = \Slim\Slim::getInstance()->request();
    $login = json_decode($app->getBody());
    $username = $login->{'user'};
    $password = $login->{'pw'};

    $pwSaltedHashed = password_hash($password, PASSWORD_BCRYPT);

    $connection = connectDB();

    $logstmt = $connection->prepare('SELECT user_password FROM user WHERE user_email=?');
    $logstmt->bind_param('s', $username);
    $logstmt->execute();
    $result = $logstmt->get_result();
    if ($result->num_rows >= "1") {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array('success' => false, 'errmsg' => 1,
        ));
    }
    else {
        $stmt = $connection->prepare('INSERT INTO user(user_email, user_password) VALUES (?, ?)');
        $stmt->bind_param('ss', $username, $pwSaltedHashed);
        $connection->begin_Transaction();

        $success = $stmt->execute();
        if($success) {
            $connection->commit();
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array('success' => true,));
        }
        else {
            $connection->rollBack();
            header('Content-Type: application/json; charset=utf-8');
            echo json_encode(array('success' => false, 'errmsg' => 2,));
        }
    }
    $connection->close();
}

function searchPerson() {
        echo "<script type='text/javascript'>setView(SEARCH);</script>";


}

$app->run();