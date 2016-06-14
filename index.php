<?php

session_start();
/**
 * REST API - WayToFriends
 *
 */

require 'Slim/Slim.php';
require 'config.php';

\Slim\Slim::registerAutoloader();


$app = new \Slim\Slim();
$app->post('/user', 'getLogin');
$app->post('/user/add', 'addUser');
$app->post('/contact', 'addContact');
$app->get('/contact', 'getContacts');
$app->get('/user', 'getLogout');
$app->get('/user/session', 'getUserId');


// Check if user has session and is allowed to use application
function getUserId() {
    echo $_SESSION['uid'];
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
            //session_start();
            // Session variables
            $userid =  $row[1];
            $_SESSION['uid'] = $userid;
            $_GLOBAL['user_id'] = $userid;
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

function getLogout() {
    $app = \Slim\Slim::getInstance();
    session_unset();
    session_destroy();
    echo("Session destroyed");
}

// Register User to DB
function addUser() {
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

function addContact(){
    $app = \Slim\Slim::getInstance();
    $contact = json_decode($app->request()->getBody());

    $connection = connectDB();
    $stmt = $connection->prepare('INSERT INTO contact(name, firstname,street, streetno, zip, city, phone, user_id, telsearch_id) VALUES (?, ?, ?, ?, ?, ?, ? , ?, ?)');
    $stmt->bind_param('ssssissis', $contact->{'name'}, $contact->{'firstname'}, $contact->{'street'},$contact->{'streetno'}, $contact->{'zip'}, $contact->{'city'}, $contact->{'phone'}, $_SESSION['uid'], $contact->{'telsearch_id'});
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

    $connection->close();
}

function getContacts(){
    $app = \Slim\Slim::getInstance();
    $connection = connectDB();
    $stmt = $connection->prepare('SELECT * FROM contact WHERE user_id=?');
    $stmt->bind_param('i', $_SESSION['uid']);
    $stmt->execute();
    $result = $stmt->get_result();

    $contacts = [];

    while ($row = $result->fetch_array(MYSQLI_NUM)){
        $contact = new stdClass();
        $contact->id = $row[0];
        $contact->name = $row[1];
        $contact->firstname = $row[2];
        $contact->street = $row[3];
        $contact->streetno = $row[4];
        $contact->zip = $row[5];
        $contact->city = $row[6];
        $contact->phone = $row[7];

        $contacts[] = $contact;
    }

    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($contacts);

    $connection->close();
}

$app->run();
