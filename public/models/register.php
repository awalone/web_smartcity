<?php
include "connection.php";

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

$ktp = $request->data->ktp;
$nama = $request->data->nama;
$email = $request->data->email;
$no_telp = $request->data->no_telp;
$alamat = $request->data->alamat;
$jenis_kelamin = $request->data->jk;
$password = $request->data->pass;


$sql_query = "INSERT INTO user SET ktp = '$ktp', status= 'warga',nama='$nama', email='$email', no_telp = '$no_telp' ,jenis_kelamin = '$jenis_kelamin', alamat = '$alamat'";
$result = $mysqli->query($sql_query);

$sql_query2 = "INSERT INTO akun SET id_akun = '$ktp',username='$ktp', kata_sandi = '$password' ,nama='$nama'";
$result2 = $mysqli->query($sql_query2);
if ($result2){
    $data = array(
        'username' => $ktp,
        'password' => $password
    );
    echo json_encode($data);
}