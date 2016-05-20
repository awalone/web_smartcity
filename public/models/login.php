<?php
/**
 * Created by PhpStorm.
 * User: Fadhli
 * Date: 11/25/2015
 * Time: 5:29 AM
 */

include "connection.php";

$db = Database::getInstance();
$mysqli = $db->getConnection();
error_reporting(0);
/*
 * get data from $http.post request
 *
 */
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$username = '0701';
$password = 'surialam';

$sql_query = "SELECT a.id_akun,a.nama,u.status FROM akun AS a, user AS u WHERE (a.username = '$username' OR a.id_akun='$username') AND a.kata_sandi = '$password' AND a.id_akun=u.ktp";
$result = $mysqli->query($sql_query);

if (mysqli_num_rows($result)>0){
    $row = mysqli_fetch_array($result);

    $response['status_login']='1';
    $response['id']=$row['id_akun'];
    $response['nama']=$row['nama'];
    $response['status_user']=$row['status'];
} else {
    $response['status_login']='0';
    $response['message']='Maaf, Username atau Password Salah!!';
}
//echo ")]}',\n";
echo json_encode($response);