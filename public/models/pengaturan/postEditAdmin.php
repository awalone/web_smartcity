<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/21/2015
 * Time: 4:07 PM
 */

include "../connection.php";

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
$id_akun = $request->id_akun;
$username = $request->username;
$kata_sandi = $request->kata_sandi;

$sql_query = "UPDATE akun SET username='$username', kata_sandi = '$kata_sandi' WHERE id_akun = '$id_akun'";
$result = $mysqli->query($sql_query);

