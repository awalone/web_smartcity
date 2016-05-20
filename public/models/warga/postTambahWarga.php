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

$sql_cek = "SELECT ktp FROM user WHERE ktp = '$ktp' LIMIT 1";
$cek = $mysqli->query($sql_cek);
if (mysqli_num_rows($cek) == 0) {
    $sql_query = "INSERT INTO user SET ktp = '$ktp', nama='$nama', status='warga', alamat = '$alamat', jenis_kelamin = '$jenis_kelamin' , no_telp = '$no_telp' , email = '$email'";
    $result = $mysqli->query($sql_query);

    $sql_query2 = "INSERT INTO akun SET id_akun = '$ktp', kata_sandi = '$ktp' ,nama='$nama',username = '$ktp'";
    $result2 = $mysqli->query($sql_query2);
} else {
    header('HTTP/1.0 403 Forbidden');
}