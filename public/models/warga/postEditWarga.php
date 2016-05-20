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
$ktp = $request->user->ktp;
$nama = $request->user->nama;
$alamat = $request->user->alamat;
$jenis_kelamin = $request->user->jk;
$no_telp = $request->user->no_telp;
$email = $request->user->email;

$sql_query = "UPDATE user SET nama = '$nama',alamat='$alamat', jenis_kelamin = '$jenis_kelamin', no_telp = '$no_telp' , email = '$email' WHERE ktp = '$ktp'";
$result = $mysqli->query($sql_query);


