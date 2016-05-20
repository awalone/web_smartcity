<?php
/**
 * Created by PhpStorm.
 * User: virah
 * Date: 05-Dec-15
 * Time: 8:14 PM
 **/
include "../connection.php";

$db = Database::getInstance();
$mysqli = $db->getConnection();
error_reporting(0);

/*
 * get data from $http.post request
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id = $request->ktp;
$sql_query = "DELETE from user WHERE ktp=$id AND status='warga'";
$result = $mysqli->query($sql_query);



