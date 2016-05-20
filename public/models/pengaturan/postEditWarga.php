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
$ktp = $request->ktp;
$email = $request->email;
$nama = $request->nama;
$jenis_kelamin = $request->jk;
$no_telp = $request->no_telp;
$alamat = $request->alamat;
$password = $request->pass;

$sql_query = "UPDATE user SET email='$email', nama = '$nama',jenis_kelamin = '$jenis_kelamin', no_telp = '$no_telp', alamat = '$alamat' WHERE ktp = '$ktp'";
$result = $mysqli->query($sql_query);
if ($result){
    $sql_query2 = "UPDATE akun SET kata_sandi='$password' WHERE id_akun = '$ktp'";
    $result2 = $mysqli->query($sql_query2);
}

