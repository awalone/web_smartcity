<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/20/2015
 * Time: 9:01 PM
 */
include "../connection.php";
date_default_timezone_set('Asia/Singapore');

$db = Database::getInstance();
$mysqli = $db->getConnection();
error_reporting(0);
/*
 * get data from $http.post request
 *
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$id_keluhan = $request->id_keluhan;

$now = date('Y-m-d H:i:s');
echo $sql_query = "UPDATE keluhan SET waktu_selesai = '$now', status='tuntas' WHERE id_keluhan='$id_keluhan' ";
$result = $mysqli->query($sql_query);
